import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormReducer from './uncontrolledSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
  reducer: {
    uncontrolledForms: uncontrolledFormReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
