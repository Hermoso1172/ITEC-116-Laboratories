function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log("current", currentPage);
  console.log("totalPages", totalPages);
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-700">
      {/* Newer Posts Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100 transition-all duration-200 disabled:opacity-40"
      >
        ← Newer Posts
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 ${
              page === currentPage
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Older Posts Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100 transition-all duration-200 disabled:opacity-40"
      >
        Older Posts →
      </button>
    </div>
  );
}

export default Pagination;
