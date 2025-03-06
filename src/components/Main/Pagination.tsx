import { useGetPokemonsQuery } from '@/api/pokemonApi';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { useRouter } from 'next/router';

const Pagination = () => {
  const router = useRouter();
  const { query, push } = router;
  const currentPage = Number(query.page) || 1;
  const [searchValue] = useSearchQuery('searchValue');

  const { data } = useGetPokemonsQuery({
    searchValue,
    currentPage,
  });

  const { totalPages } = data || { totalPages: 1 };

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
          currentPage === 1
            ? 'border-gray-300 cursor-not-allowed '
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span className={`${currentPage !== 1 && 'group-hover:text-rose-600'}`}>
          {'<'}
        </span>
      </button>
      <span className="px-4 py-1 text-lg">
        {currentPage} / {totalPages}
      </span>
      <button
        className={` group  px-3 py-1 rounded font-bold border-2 transition-all ${
          currentPage === totalPages
            ? 'border-gray-300 cursor-not-allowed'
            : 'bg-rose-600 border-rose-600 hover:bg-transparent'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span
          className={`${currentPage !== totalPages && 'group-hover:text-rose-600'}`}
        >
          {'>'}
        </span>
      </button>
    </div>
  );
};

export default Pagination;
