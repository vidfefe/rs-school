import React, { FC } from 'react';
import { Country } from '../types';
interface ICountryCardProps {
  country: Country;
  visited: boolean;
  toggleVisited: (name: string) => void;
}

export const CountryCard: FC<ICountryCardProps> = React.memo(
  ({ country, visited, toggleVisited }) => {
    return (
      <div
        className={`border transition-all rounded-md p-5 flex flex-col gap-0.5 ${visited ? 'border-emerald-500' : 'border-white/87'}`}
      >
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-32 object-contain"
        />
        <h2 className="text-2xl font-bold">{country.name.common}</h2>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <div className="flex gap-2 items-center">
          <span>Mark as Visited</span>
          <input
            type="checkbox"
            checked={visited}
            onChange={() => toggleVisited(country.name.common)}
            className="w-4 h-4 appearance-none border border-gray-400 rounded checked:bg-emerald-500 checked:border-emerald-500 flex items-center justify-center relative 
                    before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100"
          />
        </div>
      </div>
    );
  }
);
