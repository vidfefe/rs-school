import { useNavigate } from 'react-router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      navigate(`/search/${newPage}`);
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        type="button"
        className={`px-3 py-1 rounded font-bold border-2 transition-all ${
          currentPage === 1
            ? ' border-gray-300 cursor-not-allowed'
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {'<'}
      </button>
      <span className="px-4 py-1 text-lg">
        {' '}
        {currentPage} / {totalPages}
      </span>
      <button
        className={`px-3 py-1 rounded font-bold border-2 transition-all ${
          currentPage === totalPages
            ? ' border-gray-300 cursor-not-allowed'
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
