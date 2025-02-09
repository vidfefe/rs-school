import { useEffect, useState } from 'react';
import Card from './Card';
import { fetchPokemon } from '../api/api';
import NoResults from './NoResults';
import Loader from './Loader';

interface Pokemon {
  name: string;
  description: string;
  image: string;
}

interface ResultsProps {
  searchValue: string;
}

const Results: React.FC<ResultsProps> = ({ searchValue }) => {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchPokemon(searchValue.trim());
        setResults(results);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchValue]);

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {results.map((pokemon, index) => (
        <Card key={index} {...pokemon} />
      ))}
    </div>
  );
};

export default Results;
