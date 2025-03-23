import React, { FC } from 'react';

interface ISortButtonProps {
  value: string;
  onChange: () => void;
}

export const SortButton: FC<ISortButtonProps> = React.memo(
  ({ value, onChange }) => {
    return (
      <button onClick={onChange} className="p-2 border rounded">
        Sort by Population {value === 'population-asc' ? '▲' : '▼'}
      </button>
    );
  }
);
