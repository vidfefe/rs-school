import React, { ChangeEvent, useState } from 'react';

interface SearchProps {
  onSearch: (searchValue: string) => void;
  initialValue?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialValue = '' }) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        data-testid="search-input"
        className="border border-gray-300 focus:outline-rose-600 rounded p-1"
        placeholder="Enter name..."
        onChange={handleInputChange}
        value={searchValue}
      />
      <button
        type="button"
        data-testid="search-button"
        className="bg-rose-600 font-semibold rounded px-3 py-1"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
