import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "./ui/pagination";
  
type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};
  
const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);
  
    return (
      <Pagination aria-label="Pagination">
        <PaginationContent>
          {/* Previous Button */}
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                aria-label="Previous page"
                onClick={() => onPageChange(page - 1)}
              >
                &laquo; Previous
              </PaginationPrevious>
            </PaginationItem>
          )}
  
          {/* Page Numbers */}
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                aria-label={`Go to page ${number}`}
                href="#"
                onClick={() => onPageChange(number)}
                isActive={page === number}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          {/* Next Button */}
          {page < pages && (
            <PaginationItem>
              <PaginationNext
                aria-label="Next page"
                onClick={() => onPageChange(page + 1)}
              >
                Next &raquo;
              </PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default PaginationSelector;
  