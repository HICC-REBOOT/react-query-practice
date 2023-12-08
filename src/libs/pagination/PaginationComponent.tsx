import React from 'react';
import Pagination from 'react-js-pagination';
import './style/Pagination.css';

interface PaginationProps {
  page: number;
  size: number;
  count: number;
  pageRange: number;
  setPage: (page: number) => void;
}

function PaginationComponent({
  page,
  size,
  count,
  pageRange,
  setPage,
}: PaginationProps) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={size}
      totalItemsCount={count}
      pageRangeDisplayed={pageRange}
      prevPageText={'<'}
      nextPageText={'>'}
      linkClassFirst="first-button"
      linkClassPrev="prev-button"
      linkClassNext="next-button"
      linkClassLast="last-button"
      onChange={setPage}
    />
  );
}

export default PaginationComponent;
