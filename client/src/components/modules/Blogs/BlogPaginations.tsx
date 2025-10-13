// BlogPagination.tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  type: string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  type,
}: Props) {
  const router = useRouter();

  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    router.push(`/blogs?type=${type}&page=${page}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Previous"
            size="icon"
            onClick={(e) => handlePageChange(e, currentPage - 1)}
            className={currentPage <= 1 ? "opacity-50 pointer-events-none" : ""}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i + 1}
              onClick={(e) => handlePageChange(e, i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Next"
            size="icon"
            onClick={(e) => handlePageChange(e, currentPage + 1)}
            className={
              currentPage >= totalPages ? "opacity-50 pointer-events-none" : ""
            }
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}