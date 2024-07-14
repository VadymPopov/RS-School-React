import { useState, useEffect } from 'react';
import { getStarShips } from '../services';
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
    const fetchData = async () => {
      setState({ starShips: [], error: null, loading: true });

      try {
        const data = await getStarShips(searchQuery);
        setState((prevState) => ({
          ...prevState,
          starShips: data?.results,
          loading: false,
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        setState((prevState) => ({
          ...prevState,
          starShips: [],
          error: errorMessage,
          loading: false,
        }));
      }
    };

    fetchData();
  }, [searchQuery]);

  const triggerError = (): void => {
    setState((prevState) => ({
      ...prevState,
      error: 'This is a simulated error.',
    }));
  };

  return { ...state, triggerError };
}
