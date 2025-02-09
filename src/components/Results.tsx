import { useEffect, useState } from 'react';
import Card from './Card';
import { fetchPokemon } from '../api/api';
import NoResults from './NoResults';
import Loader from './Loader';
import Pagination from './Pagination';
import { useParams } from 'react-router';

interface Pokemon {
  name: string;
  description: string;
  image: string;
}

interface ResultsProps {
  searchValue: string;
  onCardClick: (pokemonName: string) => void;
}

const Results: React.FC<ResultsProps> = ({ searchValue, onCardClick }) => {
  const { page } = useParams<{ page: string }>();
  const currentPage = Number(page) || 1;

  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { items, totalPages } = await fetchPokemon(
          searchValue.trim(),
          currentPage
        );
        setResults(items);
        setTotalPages(totalPages);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchValue, currentPage]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (results.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="flex flex-col  gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-5">
        {results.map((pokemon, index) => (
          <Card
            key={index}
            {...pokemon}
            onClick={() => onCardClick(pokemon.name)}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default Results;
