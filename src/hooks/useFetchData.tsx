import { useState, useEffect } from 'react';
import getStarShips from '../services';
import { StarShip } from '../types';

interface StarWarsState {
  starShips: StarShip[];
  error: string | null;
  loading: boolean;
}

export default function useFetchData(searchQuery: string) {
  const [state, setState] = useState<StarWarsState>({
    starShips: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    setState({ starShips: [], error: null, loading: true });
    getStarShips(searchQuery)
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          starShips: data?.results,
          loading: false,
        }));
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          starShips: [],
          error: error.message,
          loading: false,
        }));
      });
  }, [searchQuery]);

  const triggerError = (): void => {
    setState((prevState) => ({
      ...prevState,
      error: 'This is a simulated error.',
    }));
  };

  return { ...state, triggerError };
}
