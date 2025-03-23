import React, { FC } from 'react';

interface IFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const FilterDropdown: FC<IFilterDropdownProps> = React.memo(
  ({ value, onChange }) => {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded  bg-emerald-500"
      >
        <option value="">All regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    );
  }
);
