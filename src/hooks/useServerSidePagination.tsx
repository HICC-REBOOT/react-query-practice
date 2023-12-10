import React, { useState } from 'react';
import { usePagination } from 'react-use-pagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import request from '@/utils/request';
import PaginationComponent from '@/libs/pagination/PaginationComponent';

interface UseServerSidePaginationProps {
  uri: string;
  size: number;
  sort?: string;
  search?: string;
}

interface ResponseServerSidePagination<T> {
  totalElements: number;
  data: T[];
}

interface Pageable {
  page: number;
  size: number;
  sort?: string;
  search?: string;
}

interface ReturnuseServerSidePagination<T> {
  isFetched: boolean;
  loading: boolean;
  curPageItem: T[];
  renderPaginationBtn: () => React.JSX.Element;
}

function useServerSidePagination<T>({
  uri,
  size,
  sort,
  search,
}: UseServerSidePaginationProps): ReturnuseServerSidePagination<T> {
  const [data, setData] = useState<T[]>([]);
  const [dataLength, setDataLength] = useState<number>(0);

  const { currentPage, setPage } = usePagination({
    totalItems: dataLength,
    initialPageSize: size,
  });

  const fetchPagiableData = async () => {
    const response = await request<
      null,
      ResponseServerSidePagination<T>,
      Pageable
    >({
      uri,
      method: 'get',
      params: {
        page: currentPage,
        size,
        sort,
        search,
      },
    });

    if (response !== undefined) {
      setData(response.data.data);
      setDataLength(response.data.totalElements);
    }

    return response?.data.data;
  };

  const { isLoading, isFetched } = useQuery({
    queryKey: ['getPagiable', { uri, size, sort, search, currentPage }],
    queryFn: fetchPagiableData,
    placeholderData: keepPreviousData,
  });

  const onSetPage = (page: number) => {
    setPage(page - 1);
  };

  const renderPaginationBtn = (): React.JSX.Element => {
    return (
      <PaginationComponent
        page={currentPage + 1}
        size={size}
        count={dataLength}
        pageRange={5}
        setPage={onSetPage}
      />
    );
  };

  return {
    isFetched,
    loading: isLoading,
    curPageItem: data,
    renderPaginationBtn,
  };
}

export default useServerSidePagination;
