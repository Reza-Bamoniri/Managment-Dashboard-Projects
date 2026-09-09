import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

type UsersPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function UsersPagination({
  currentPage,
  totalPages,
  onPageChange,
}: UsersPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          cursor-pointer rounded-lg border
          border-gray-200 bg-white p-2
          text-gray-600 transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-gray-300
          dark:hover:bg-gray-800
        "
        aria-label="Previous page"
      >
        <FiChevronLeft size={18} />
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
            cursor-pointer rounded-lg px-3 py-2
            text-sm font-medium transition
            ${
              currentPage === page
                ? "bg-green-600 text-white dark:bg-green-500"
                : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          cursor-pointer rounded-lg border
          border-gray-200 bg-white p-2
          text-gray-600 transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-gray-300
          dark:hover:bg-gray-800
        "
        aria-label="Next page"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}

export default UsersPagination;