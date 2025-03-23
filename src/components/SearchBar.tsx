import React, { FC } from 'react';
interface ISearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: FC<ISearchBarProps> = React.memo(
  ({ value, onChange }) => {
    return (
      <input
        type="text"
        data-testid="search-input"
        className="border border-gray-300 focus:outline-emerald-500 text-emerald-500 rounded p-1 w-sm"
        placeholder="Enter name..."
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    );
  }
);
