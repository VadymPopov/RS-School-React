import { useState } from 'react';

const getSearchQuery = () => {
  return localStorage.getItem('searchQuery') || '';
};

const useLocalStorage = () => {
  const [searchQuery, setSearchQueryState] = useState(getSearchQuery);

  const setSearchQuery = (newSearchQuery: string) => {
    localStorage.setItem('searchQuery', newSearchQuery);
    setSearchQueryState(newSearchQuery);
  };

  return { searchQuery, setSearchQuery };
};

export default useLocalStorage;
