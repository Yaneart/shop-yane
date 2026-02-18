import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import { mockProducts } from '@shared/ui/product-card';

interface FilterState {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  sizes: string[];
}

const initialState: FilterState = {
  categories: [],
  priceMin: null,
  priceMax: null,
  sizes: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<string>) {
      const idx = state.categories.indexOf(action.payload);
      if (idx === -1) {
        state.categories.push(action.payload);
      } else {
        state.categories.splice(idx, 1);
      }
    },
    setPriceMin(state, action: PayloadAction<number | null>) {
      state.priceMin = action.payload;
    },
    setPriceMax(state, action: PayloadAction<number | null>) {
      state.priceMax = action.payload;
    },
    toggleSize(state, action: PayloadAction<string>) {
      const idx = state.sizes.indexOf(action.payload);
      if (idx === -1) {
        state.sizes.push(action.payload);
      } else {
        state.sizes.splice(idx, 1);
      }
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  toggleCategory,
  setPriceMin,
  setPriceMax,
  toggleSize,
  resetFilters,
} = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filter;

export const selectFilteredProducts = (state: RootState) => {
  const { categories, priceMin, priceMax, sizes } = state.filter;

  return mockProducts.filter((product) => {
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }

    if (priceMin !== null && product.price < priceMin) {
      return false;
    }

    if (priceMax !== null && product.price > priceMax) {
      return false;
    }

    if (
      sizes.length > 0 &&
      !sizes.some((size) => product.sizes.includes(size))
    ) {
      return false;
    }

    return true;
  });
};

export default filterSlice.reducer;
