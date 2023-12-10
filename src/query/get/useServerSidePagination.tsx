import React, { useEffect, useState } from 'react';
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

// 예상되는 페이지네이션 형태의 반환형식, 백엔드의 요구에 따라 언제든지 변할 수 있음
interface ResponseServerSidePagination<T> {
  totalElements: number;
  data: T[];
}

// pagination에 필요한 파라미터들 (현재 페이지 번호, 페이지 크기, 정렬, 검색)
interface Pageable {
  page: number;
  size: number;
  sort?: string;
  search?: string;
}

interface ReturnuseServerSidePagination<T> {
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
  const [data, setData] = useState<T[]>([]); // 페이지의 데이터
  const [dataLength, setDataLength] = useState<number>(0); // 데이터의 전체 길이

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

    return response?.data;
  };

  const { data: cachingData, isLoading } = useQuery({
    queryKey: ['getPagiable', { uri, size, sort, search, currentPage }],
    queryFn: fetchPagiableData,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (cachingData !== undefined) {
      setData(cachingData.data);
      setDataLength(cachingData.totalElements);
    }
  }, [cachingData]);

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
    loading: isLoading,
    curPageItem: data,
    renderPaginationBtn,
  };
}

export default useServerSidePagination;
