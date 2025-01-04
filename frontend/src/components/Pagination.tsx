'use client';

import React from "react";
import { Pagination as NextUIPagination, Button } from "@nextui-org/react";

interface PaginationProps {
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ total, onChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="text-small text-default-500">Page {currentPage} of {total}</p>
      <div className="flex gap-2 items-center">
        <Button
          color="primary"
          size="sm"
          variant="flat"
          onPress={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <NextUIPagination 
          showControls={false}
          color="primary" 
          page={currentPage} 
          total={total} 
          onChange={handlePageChange}
          className="mx-4"
        />
        <Button
          color="primary"
          size="sm"
          variant="flat"
          onPress={() => handlePageChange(currentPage < total ? currentPage + 1 : currentPage)}
          disabled={currentPage === total}
        >
          Next
        </Button>
      </div>
    </div>
  );
} 