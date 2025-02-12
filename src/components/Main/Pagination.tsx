import { useSearchParams } from 'react-router';

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const details = searchParams.get('details') || '';

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (details) {
          newParams.set('details', details);
        }
        newParams.set('page', newPage.toString());
        return newParams;
      });
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        type="button"
        className={`px-3 py-1 rounded font-bold border-2 transition-all ${
          page === 1
            ? 'border-gray-300 cursor-not-allowed'
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        {'<'}
      </button>
      <span className="px-4 py-1 text-lg">
        {page} / {totalPages}
      </span>
      <button
        className={`px-3 py-1 rounded font-bold border-2 transition-all ${
          page === totalPages
            ? 'border-gray-300 cursor-not-allowed'
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
