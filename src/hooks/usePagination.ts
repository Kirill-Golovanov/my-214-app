// // src/hooks/usePagination.ts — ИДЕАЛЬНАЯ ВЕРСИЯ 2025 ГОДА
// import { useMemo, useState, useEffect } from "react";

// interface UsePaginationOptions<T> {
//   items: T[];
//   itemsPerPage?: number;
// }

// export function usePagination<T>({
//   items,
//   itemsPerPage = 20,
// }: UsePaginationOptions<T>) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

//   // Синхронный сброс — это ОК для пагинации!
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     if (currentPage > totalPages && totalPages >= 1) {
//       setCurrentPage(totalPages);
//     }
//     if (items.length === 0 && currentPage !== 1) {
//       setCurrentPage(1);
//     }
//   }, [items.length, totalPages]); // ← зависимости правильные

//   const paginatedResult = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;

//     return {
//       items: items.slice(start, end),
//       currentPage: Math.min(currentPage, totalPages),
//       totalPages,
//       totalItems: items.length,
//       hasNext: currentPage < totalPages,
//       hasPrev: currentPage > 1,
//       setPage: setCurrentPage,
//       reset: () => setCurrentPage(1),
//     };
//   }, [items, itemsPerPage, currentPage, totalPages]);

//   return paginatedResult;
// }



// hooks/usePagination.ts
import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export function usePagination<T>({
  items,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  const gotoPage = (page: number) => {
    const newPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(newPage);
  };

  const reset = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    gotoPage,
    reset,
  };
}
