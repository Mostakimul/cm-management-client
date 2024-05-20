import { createSlice } from '@reduxjs/toolkit';
import { TFilterData } from '../../../utils/itemManagement';
import { RootState } from '../../store';

type TfilterOptions = {
  category: TFilterData[] | null;
  interface: TFilterData[] | null;
  condition: TFilterData[] | null;
  capacity: TFilterData[] | null;
};

const initialState: TfilterOptions = {
  category: null,
  interface: null,
  condition: null,
  capacity: null,
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setInterface: (state, action) => {
      state.interface = action.payload;
    },
    setCondition: (state, action) => {
      state.condition = action.payload;
    },
    setCapacity: (state, action) => {
      state.condition = action.payload;
    },
  },
});

export const { setCategory, setInterface, setCapacity, setCondition } =
  itemSlice.actions;

export default itemSlice.reducer;

export const selectCategories = (state: RootState) => state.items.category;
export const selectInterfaces = (state: RootState) => state.items.interface;
export const selectConditions = (state: RootState) => state.items.condition;
export const selectCapacity = (state: RootState) => state.items.capacity;
