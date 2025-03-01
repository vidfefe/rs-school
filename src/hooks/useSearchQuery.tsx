'use client';

import { useEffect, useState } from 'react';

export const useSearchQuery = (
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key) || '';
      setSearchValue(storedValue);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, searchValue);
    }
  }, [key, searchValue]);

  return [searchValue, setSearchValue];
};
