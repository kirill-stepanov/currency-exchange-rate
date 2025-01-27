import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, TextInput, View } from "react-native";
import getSymbolFromCurrency from "currency-symbol-map";

import { ConverterScreenProps } from "App";

import { useAppSelector } from "~/hooks/useRedux";

import { styles } from "./styles";

const ConverterScreen = (props: ConverterScreenProps<"Converter">) => {
  const { route } = props;
  const { currencyCode, currencyRate } = route.params;

  const { base } = useAppSelector((state) => state.currencies);

  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<string>("100");
  const [convertedCurrencyAmount, setConvertedCurrencyAmount] =
    useState<string>("");

  useEffect(() => {
    if (baseCurrencyAmount) {
      const newConvertedCurrencyAmount =
        Number(baseCurrencyAmount) * currencyRate;

      setConvertedCurrencyAmount(newConvertedCurrencyAmount.toFixed(2));
    } else {
      setConvertedCurrencyAmount("");
    }
  }, [baseCurrencyAmount]);

  const handleBaseCurrencyChange = (text: string) => {
    if (/^\d*\.?\d*$/.test(text)) {
      setBaseCurrencyAmount(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <View>
        <View style={styles.currencyContainer}>
          <Text style={styles.text}>{base}</Text>

          <TextInput
            autoFocus
            style={styles.input}
            value={baseCurrencyAmount}
            onChangeText={handleBaseCurrencyChange}
            keyboardType="numeric"
            maxLength={20}
          />
        </View>

        <View style={styles.rateContainer}>
          <Text style={styles.text}>
            {`1${getSymbolFromCurrency(base)} = ${currencyRate.toFixed(
              2
            )} ${getSymbolFromCurrency(currencyCode)}`}
          </Text>
        </View>

        <View style={styles.currencyContainer}>
          <Text style={styles.text}>{currencyCode}</Text>
          <Text style={styles.text}>{convertedCurrencyAmount}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConverterScreen;
