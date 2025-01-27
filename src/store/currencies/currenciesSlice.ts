import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_BASE_CURRENCY } from "~/constants";

import { fetchDataAsync, loadStoredDataAsync } from "./currenciesApi";

import { CurrenciesState } from "./types";

const initialState: CurrenciesState = {
  loading: false,
  base: DEFAULT_BASE_CURRENCY,
  currencies: [],
  favorites: [],
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    updateBase: (state, action) => {
      state.base = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataAsync.fulfilled, (state, action) => {
      state.loading = false;

      state.currencies = action.payload;
    });
    builder.addCase(fetchDataAsync.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(loadStoredDataAsync.fulfilled, (state, action) => {
      state.currencies = action.payload.currencies;
      state.base = action.payload.baseCurrency;
      state.favorites = action.payload.favoriteCurrencies;
    });
  },
});

export const { updateFavorites, updateBase } = currenciesSlice.actions;

export default currenciesSlice.reducer;
