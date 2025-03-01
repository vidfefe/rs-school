import { useRouter } from 'next/router';

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const { query, push } = router;
  const page = Number(query.page) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      push({ query: { ...query, page: newPage.toString() } });
    }
  };

  return (
    <div data-testid="pagination" className="flex justify-center space-x-4">
      <button
        type="button"
        className={`group px-3 py-1 rounded font-bold border-2 transition-all ${
          page === 1
            ? 'border-gray-300 cursor-not-allowed '
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <span className={`${page !== 1 && 'group-hover:text-rose-600'}`}>
          {'<'}
        </span>
      </button>
      <span className="px-4 py-1 text-lg">
        {page} / {totalPages}
      </span>
      <button
        className={` group  px-3 py-1 rounded font-bold border-2 transition-all ${
          page === totalPages
            ? 'border-gray-300 cursor-not-allowed'
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <span
          className={`${page !== totalPages && 'group-hover:text-rose-600'}`}
        >
          {'>'}
        </span>
      </button>
    </div>
  );
};

export default Pagination;
