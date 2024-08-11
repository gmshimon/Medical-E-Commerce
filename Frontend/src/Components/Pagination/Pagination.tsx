import React from 'react';
import ResponsivePaginationComponent from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const Pagination = ({totalPages,currentPage,handlePageChange}) => {
    return (
        <ResponsivePaginationComponent
      total={totalPages}
      current={currentPage}
      onPageChange={page => handlePageChange(page)}
    />
    );
};

export default Pagination;