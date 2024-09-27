import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <BootstrapPagination>
        <BootstrapPagination.First 
          onClick={() => paginate(1)} 
          disabled={currentPage === 1} 
        />
        <BootstrapPagination.Prev 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        {pageNumbers.map((number) => (
          <BootstrapPagination.Item 
            key={number} 
            active={number === currentPage} 
            onClick={() => paginate(number)}
          >
            {number}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === pageNumbers.length} 
        />
        <BootstrapPagination.Last 
          onClick={() => paginate(pageNumbers.length)} 
          disabled={currentPage === pageNumbers.length} 
        />
      </BootstrapPagination>
    </div>
  );
  
};

export default Pagination;
