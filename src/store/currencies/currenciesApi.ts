import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrenciesState, CurrencyDataState } from "./types";

import { useApiFetch } from "~/hooks/useApiFetch";
import { useAsyncStorage } from "~/hooks/useAsyncStorage";

import {
  apiRoutes,
  asyncStorageKeys,
  DEFAULT_BASE_CURRENCY,
} from "~/constants";

import { updateFavorites } from "./currenciesSlice";

export const fetchDataAsync = createAsyncThunk<CurrencyDataState[], string>(
  "currencies/fetchDataAsync",
  async (baseCurrency) => {
    const { getRequest } = useApiFetch();
    const { storeData, getData } = useAsyncStorage();

    const requestParams = {
      base_currency: baseCurrency,
    };

    const response = await getRequest(apiRoutes.LATEST, requestParams);

    if (response?.data) {
      const formattedData = Object.entries(response.data.data).map(
        ([code, rate]) => ({ code, rate })
      );

      await storeData(asyncStorageKeys.BASE_CURRENCY, baseCurrency);
      await storeData(asyncStorageKeys.CURRENCIES_DATA, formattedData);

      return formattedData;
    } else {
      const storedData = await getData(asyncStorageKeys.CURRENCIES_DATA);

      return storedData;
    }
  }
);

export const updateFavoritesAsync = createAsyncThunk<void, string>(
  "currencies/updateFavoritesAsync",
  async (currencyCode, { getState, dispatch }) => {
    const { favorites } = (getState() as { currencies: CurrenciesState })
      .currencies;

    const updatedFavorites = favorites.includes(currencyCode)
      ? favorites.filter((fav) => fav !== currencyCode)
      : [...favorites, currencyCode];

    const { storeData } = useAsyncStorage();
    await storeData(asyncStorageKeys.FAVORITE_CURRENCIES, updatedFavorites);

    dispatch(updateFavorites(updatedFavorites)); // Dispatch the synchronous action
  }
);

export const loadStoredDataAsync = createAsyncThunk(
  "currencies/loadStoredDataAsync",
  async () => {
    const { getData } = useAsyncStorage();

    const currencies = (await getData(asyncStorageKeys.CURRENCIES_DATA)) ?? [];
    const baseCurrency =
      (await getData(asyncStorageKeys.BASE_CURRENCY)) ?? DEFAULT_BASE_CURRENCY;
    const favoriteCurrencies =
      (await getData(asyncStorageKeys.FAVORITE_CURRENCIES)) ?? [];

    return { currencies, baseCurrency, favoriteCurrencies };
  }
);
