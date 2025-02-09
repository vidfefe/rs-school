import { useEffect, useState } from 'react';

export const useSearchQuery = (
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [searchValue, setSearchValue] = useState<string>(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    localStorage.setItem(key, searchValue);
  }, [key, searchValue]);

  return [searchValue, setSearchValue];
};
