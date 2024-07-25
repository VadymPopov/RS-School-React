import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { StarShip, StarShipDetails } from '../types';

export const starshipApi = createApi({
  reducerPath: 'starshipApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/starships/' }),
  endpoints: (builder) => ({
    getStarShips: builder.query<
      { count: number; results: StarShip[] },
      {
        searchQuery: string;
        page: string;
      }
    >({
      query: ({ searchQuery, page }) => `?search=${searchQuery}&page=${page}`,
    }),
    getStarShipDetails: builder.query<StarShipDetails, string>({
      query: (shipId) => `${shipId}`,
    }),
  }),
});
