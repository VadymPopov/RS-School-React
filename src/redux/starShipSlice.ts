import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StarShip } from '../types';

const initialState: {
  items: StarShip[];
  selectedItems: StarShip[];
} = {
  items: [],
  selectedItems: [],
};

const starshipSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    setStarships: (state, action: PayloadAction<StarShip[]>) => {
      state.items = action.payload;
    },
    addToSelected: (state, action: PayloadAction<StarShip>) => {
      state.selectedItems.push(action.payload);
    },
    deleteFromSelected: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.name !== action.payload
      );
    },
    unselectAll: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { setStarships, addToSelected, deleteFromSelected, unselectAll } =
  starshipSlice.actions;
export default starshipSlice.reducer;
