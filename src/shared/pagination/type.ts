export interface PaginationProps {
  currentPage: number;
  totalArticles: number;
  articlesPerPage: number;
  onPageChange: (page: number) => void;
}
