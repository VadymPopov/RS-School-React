import { configureStore } from '@reduxjs/toolkit';
import { starshipApi } from './swapi';
import starshipReducer from './starShipSlice';

export const store = configureStore({
  reducer: {
    starships: starshipReducer,
    [starshipApi.reducerPath]: starshipApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starshipApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
