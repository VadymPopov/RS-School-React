import { useState, useEffect } from 'react';

const getSearchQuery = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('searchQuery') || '';
  }
  return '';
};

const useLocalStorage = () => {
  const [searchQuery, setSearchQueryState] = useState('');

  useEffect(() => {
    setSearchQueryState(getSearchQuery());
  }, []);

  const setSearchQuery = (newSearchQuery: string) => {
    localStorage.setItem('searchQuery', newSearchQuery);
    setSearchQueryState(newSearchQuery);
  };

  return { searchQuery, setSearchQuery };
};

export default useLocalStorage;
