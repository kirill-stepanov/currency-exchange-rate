import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";

import { useDebounce } from "~/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";

import { CurrencyDataState } from "~/store/currencies/types";
import {
  fetchDataAsync,
  loadStoredDataAsync,
} from "~/store/currencies/currenciesApi";

import SearchBar from "~/screens/home/components/SearchBar";
import CurrenciesList from "~/screens/home/components/CurrenciesList";
import Header from "~/screens/home/components/Header";

import { styles } from "./styles";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, base, favorites, currencies } = useAppSelector(
    (state) => state.currencies
  );

  useEffect(() => {
    dispatch(loadStoredDataAsync());
    dispatch(fetchDataAsync(base));
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const debounceValue = useDebounce(searchValue, 200);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const [isShowFavorite, setIsShowFavorite] = useState<boolean>(false);
  const toggleIsShowFavorite = () => {
    setIsShowFavorite(!isShowFavorite);
  };

  const [filteredCurrencies, setFilteredCurrencies] =
    useState<CurrencyDataState[]>(currencies);

  useEffect(() => {
    let updatedCurrencies = currencies;

    if (isShowFavorite) {
      updatedCurrencies = updatedCurrencies.filter((currency) =>
        favorites.includes(currency.code)
      );
    }

    if (debounceValue) {
      updatedCurrencies = updatedCurrencies.filter((currency) =>
        currency.code.toLowerCase().includes(debounceValue.toLowerCase())
      );
    }

    setFilteredCurrencies(updatedCurrencies);
  }, [isShowFavorite, favorites, debounceValue, currencies]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ScrollView>
        <SearchBar value={searchValue} onChangeValue={handleSearch} />

        <Header
          isShowFavorite={isShowFavorite}
          toggleIsShowFavorite={toggleIsShowFavorite}
        />

        <CurrenciesList currencies={filteredCurrencies} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
