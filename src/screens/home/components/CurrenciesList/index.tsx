import { View } from "react-native";

import { CurrencyDataState } from "~/store/currencies/types";

import CurrenciesListItem from "~/screens/home/components/CurrenciesListItem";

import { styles } from "./styles";

interface CurrenciesListProps {
  currencies: CurrencyDataState[];
}

const CurrenciesList = (props: CurrenciesListProps) => {
  const { currencies } = props;

  return (
    <View style={styles.container}>
      {currencies?.map((currency) => (
        <CurrenciesListItem
          key={currency.code}
          currencyCode={currency.code}
          currencyRate={currency.rate}
        />
      ))}
    </View>
  );
};

export default CurrenciesList;
