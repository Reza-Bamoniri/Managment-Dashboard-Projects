import { useMemo, useState } from "react";

function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const validPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (validPage - 1) * itemsPerPage;

    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, validPage, itemsPerPage]);

  const changePage = (page: number) => {
    setCurrentPage(
      Math.min(
        Math.max(page, 1),
        Math.max(totalPages, 1)
      )
    );
  };

  return {
    currentPage: validPage,
    totalPages,
    paginatedItems,
    setCurrentPage: changePage,
  };
}

export default usePagination;