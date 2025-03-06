import { useSearchQuery } from '@/hooks/useSearchQuery';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';

const Search = () => {
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useSearchQuery('searchValue');
  const [inputValue, setInputValue] = useState<string>(searchValue || '');
  console.log(searchValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchValue(inputValue.trim());
    push({ query: { page: '1' } });
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
