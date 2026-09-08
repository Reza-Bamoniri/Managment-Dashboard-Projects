type ProjectsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ProjectsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProjectsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow-2xl sm:flex-row dark:bg-gray-900 dark:shadow-black/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-green-950"
        >
          Prev
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`
              h-9
              w-9
              cursor-pointer
              rounded-xl
              text-sm
              font-medium
              transition
              ${
                currentPage === page
                  ? "bg-green-600 text-white shadow-lg dark:bg-green-700"
                  : "bg-gray-50 text-gray-600 hover:bg-green-100 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-green-950"
              }
            `}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-green-950"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProjectsPagination;