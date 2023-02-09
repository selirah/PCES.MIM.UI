import React from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search : {''}
      <input
        className="border-solid border-2 border-indigo-600 rounded-md"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
