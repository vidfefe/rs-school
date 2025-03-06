'use client';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const Search = () => {
  const [searchValue, setSearchValue] = useSearchQuery('searchValue');
  const [inputValue, setInputValue] = useState<string>(searchValue || '');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    setSearchValue(inputValue.trim());
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', '1');
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
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
