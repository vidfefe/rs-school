import { useSearchQuery } from '@/hooks/useSearchQuery';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';

const Search = () => {
  const { searchValue: loaderSearchValue } = useLoaderData() as {
    searchValue: string;
  };
  const [searchValue, setSearchValue] = useSearchQuery('searchValue');
  const [inputValue, setInputValue] = useState<string>(
    loaderSearchValue || searchValue || ''
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('searchValue');
      newParams.set('page', '1');
      setSearchParams(newParams);
    } else if (!loaderSearchValue) {
      setSearchParams({ page: '1', searchValue: trimmedValue });
    }
  }, []);

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setSearchValue(trimmedValue);
      setSearchParams({ page: '1', searchValue: trimmedValue });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('searchValue');
      newParams.set('page', '1');
      setSearchParams(newParams);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        data-testid="search-input"
        className="border border-gray-300 focus:outline-rose-600 rounded p-1"
        placeholder="Enter name..."
        onChange={handleInputChange}
        value={inputValue}
      />
      <button
        type="button"
        data-testid="search-button"
        className="bg-rose-600 font-semibold rounded px-3 py-1"
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
