import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type TasksPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function TasksPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TasksPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
      

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="
            cursor-pointer rounded-xl border border-gray-200
            bg-white p-2 text-gray-600 transition
            hover:bg-gray-100
            disabled:cursor-not-allowed disabled:opacity-40
            dark:border-gray-700 dark:bg-gray-900
            dark:text-gray-300 dark:hover:bg-gray-800
          "
        >
          <FiChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                cursor-pointer rounded-xl px-3 py-2 text-sm font-medium transition
                ${
                  currentPage === page
                    ? "bg-green-600 text-white dark:bg-green-500"
                    : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                }
              `}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="
            cursor-pointer rounded-xl border border-gray-200
            bg-white p-2 text-gray-600 transition
            hover:bg-gray-100
            disabled:cursor-not-allowed disabled:opacity-40
            dark:border-gray-700 dark:bg-gray-900
            dark:text-gray-300 dark:hover:bg-gray-800
          "
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default TasksPagination;