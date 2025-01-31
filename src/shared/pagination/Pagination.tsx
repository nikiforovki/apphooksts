import React from 'react';
import { StyledPagination, StyledPageButton } from './Pagination.styled';
import { PaginationProps } from './type';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalArticles,
  articlesPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <StyledPagination>
      <StyledPageButton disabled={currentPage === 1} onClick={handlePrevious}>
        ← Назад
      </StyledPageButton>
      <span>
        Страница {currentPage} из {totalPages}
      </span>
      <StyledPageButton
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Вперед →
      </StyledPageButton>
    </StyledPagination>
  );
};

export default Pagination;
