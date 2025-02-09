import { useEffect, useState } from 'react';
import Search from '../components/Search';
import Results from '../components/Results';
import ErrorButton from '../components/ErrorButton';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useSearchQuery('searchValue');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (searchValue.trim()) {
      setQuery(searchValue.trim());
    }
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setQuery(value.trim());
    navigate(`/search/1`);
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-5 mx-auto my-5 max-w-4xl">
      <Search onSearch={handleSearch} initialValue={searchValue} />
      <Results searchValue={query} />
      <div className="self-end">
        <ErrorButton />
      </div>
    </div>
  );
};

export default Home;
