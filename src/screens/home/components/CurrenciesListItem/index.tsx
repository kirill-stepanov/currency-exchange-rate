import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import currencyCodes from "currency-codes";

import { NavigationProp } from "App";

import AppButton from "~/components/AppButton";

import FavoriteIcon from "~/assets/icons/FavoriteIcon";
import UnfavoriteIcon from "~/assets/icons/UnfavoriteIcon";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";

import { updateFavoritesAsync } from "~/store/currencies/currenciesApi";

import { styles } from "./styles";

interface CurrenciesListItemProps {
  currencyCode: string;
  currencyRate: number;
}

const CurrenciesListItem = (props: CurrenciesListItemProps) => {
  const { currencyCode, currencyRate } = props;

  const navigation = useNavigation<NavigationProp>();
  const { base, favorites } = useAppSelector((state) => state.currencies);
  const dispatch = useAppDispatch();

  const currencyInfo = currencyCodes.code(currencyCode);

  const openConverter = () => {
    const params = {
      currencyCode,
      currencyRate,
    };

    navigation.navigate("Converter", params);
  };

  const handleFavorite = () => dispatch(updateFavoritesAsync(currencyCode));

  const isFavorite = favorites.includes(currencyCode);

  return (
    <AppButton onPress={openConverter} customStyles={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handleFavorite}>
          {isFavorite ? <FavoriteIcon /> : <UnfavoriteIcon />}
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{currencyCode}</Text>
          <Text style={styles.subtitle}>{currencyInfo?.currency}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        1 {base} = {currencyRate.toFixed(2)} {currencyCode}
      </Text>
    </AppButton>
  );
};

export default CurrenciesListItem;
