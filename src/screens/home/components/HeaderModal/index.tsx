import { FlatList, Text, TouchableOpacity } from "react-native";
import currencyCodes from "currency-codes";

import AppModal from "~/components/AppModal";

import { updateBase } from "~/store/currencies/currenciesSlice";
import { fetchDataAsync } from "~/store/currencies/currenciesApi";
import { CurrencyDataState } from "~/store/currencies/types";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";

import { styles } from "./styles";

interface HeaderModalProps {
  isVisible: boolean;
  toggleIsVisible: () => void;
}

const HeaderModal = (props: HeaderModalProps) => {
  const { isVisible, toggleIsVisible } = props;

  const { base, currencies, favorites } = useAppSelector(
    (state) => state.currencies
  );
  const dispatch = useAppDispatch();

  const onSelect = async (currencyCode: string) => {
    toggleIsVisible();
    dispatch(updateBase(currencyCode));
    dispatch(fetchDataAsync(currencyCode));
  };

  const FlatListItem = ({ currency }: { currency: CurrencyDataState }) => (
    <TouchableOpacity
      key={currency.code}
      style={styles.button}
      onPress={() => onSelect(currency.code)}
    >
      <Text
        style={
          currency.code === base
            ? styles.selectedCurrencyName
            : styles.currencyName
        }
      >
        {currency.code} - {currencyCodes.code(currency.code)?.currency}
      </Text>
    </TouchableOpacity>
  );

  return (
    <AppModal isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <Text style={styles.title}>Select you base currency</Text>

      <FlatList
        data={currencies}
        renderItem={({ item }) => <FlatListItem currency={item} />}
        keyExtractor={(currency) => currency.code}
      />
    </AppModal>
  );
};

export default HeaderModal;
