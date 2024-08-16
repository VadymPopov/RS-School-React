import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFormValues } from '../types';

export interface UncontrolledFormState {
  data: Array<IFormValues>;
}

const initialState: UncontrolledFormState = {
  data: [],
};

export const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<IFormValues>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addUncontrolledFormData } = uncontrolledSlice.actions;

export default uncontrolledSlice.reducer;
