import { useEffect, useState } from 'react';

const getSearchQuery = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('searchQuery') || '';
  }
  return '';
};

const useLocalStorage = () => {
  const [searchQuery, setSearchQueryState] = useState(getSearchQuery);

  useEffect(() => {
    window.localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  const setSearchQuery = (newSearchQuery: string) => {
    setSearchQueryState(newSearchQuery);
  };

  return { searchQuery, setSearchQuery };
};

export default useLocalStorage;
