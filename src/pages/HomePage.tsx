import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import fetchCountries from '../utils/fetchCountries';
import { Country } from '../types';
import { CountryCard } from '../components/CountryCard';
import { FilterDropdown } from '../components/FilterDropdown';
import { SortButton } from '../components/SortButton';
import useVisitedCountries from '../hooks/useVisitedCountries';

const HomePage: FC = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('population-desc');
  const { visited, toggleVisited } = useVisitedCountries();

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
      .filter((c) => (filter ? c.region === filter : true))
      .sort((a, b) =>
        sortBy === 'population-asc'
          ? Number(a.population) - Number(b.population)
          : Number(b.population) - Number(a.population)
      );
  }, [countries, search, filter, sortBy]);

  const handleSearch = useCallback((value: string) => setSearch(value), []);
  const handleFilter = useCallback((value: string) => setFilter(value), []);
  const handleSort = useCallback(
    () =>
      setSortBy((prev) =>
        prev === 'population-desc' ? 'population-asc' : 'population-desc'
      ),
    []
  );

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="flex gap-5">
        <SearchBar value={search} onChange={handleSearch} />
        <FilterDropdown value={filter} onChange={handleFilter} />
        <SortButton value={sortBy} onChange={handleSort} />
      </div>
      <div className="grid grid-cols-4 gap-7">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            visited={visited.has(country.name.common)}
            toggleVisited={toggleVisited}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
