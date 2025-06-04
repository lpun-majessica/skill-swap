import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const sharedClass = "text-xs lg:text-sm w-20 h-8 lg:w-25 lg:h-10 rounded-4xl";
const displayOptions = `${sharedClass} shadow-sm/20 hover:shadow-xs/20 bg-ss-light-777 hover:bg-ss-light-222 dark:bg-ss-black-131 dark:hover:bg-ss-black-444 text-ss-black-131 dark:text-ss-light-555`;
const disabledOptions = `${sharedClass} pointer-events-none opacity-50 bg-ss-light-777 dark:bg-ss-black-131 text-ss-black-131/60 dark:text-ss-light-555/60`;

export function Pagination({ currentPage, setCurrentPage, lastPage }) {
  const pageNumber = (page) => String(page + 1);

  return (
    <BasePagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            className={currentPage === 0 ? disabledOptions : displayOptions}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            onClick={() => setCurrentPage((currPage) => currPage - 1)}
          >
            <ChevronLeft /> Prev
          </PaginationLink>
        </PaginationItem>

        {currentPage >= 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage >= 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => setCurrentPage(0)}>
              {pageNumber(0)}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 0 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => setCurrentPage((currPage) => currPage - 1)}
            >
              {pageNumber(currentPage - 1)}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{pageNumber(currentPage)}</PaginationLink>
        </PaginationItem>

        {currentPage < lastPage && (
          <PaginationItem>
            <PaginationLink
              onClick={() => setCurrentPage((currPage) => currPage + 1)}
            >
              {pageNumber(currentPage + 1)}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage <= lastPage - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage <= lastPage - 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => setCurrentPage(lastPage)}>
              {pageNumber(lastPage)}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            className={
              currentPage === lastPage ? disabledOptions : displayOptions
            }
            aria-disabled={currentPage >= lastPage}
            tabIndex={currentPage >= lastPage ? -1 : undefined}
            onClick={() => setCurrentPage((currPage) => currPage + 1)}
          >
            Next <ChevronRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </BasePagination>
  );
}
