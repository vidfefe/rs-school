import { useEffect, useState } from 'react';

const useVisitedCountries = () => {
  const [visited, setVisited] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('visitedCountries');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(
      'visitedCountries',
      JSON.stringify(Array.from(visited))
    );
  }, [visited]);

  const toggleVisited = (name: string) => {
    setVisited((prev) => {
      const newVisited = new Set(prev);
      if (newVisited.has(name)) {
        newVisited.delete(name);
      } else {
        newVisited.add(name);
      }
      return newVisited;
    });
  };

  return { visited, toggleVisited };
};

export default useVisitedCountries;
