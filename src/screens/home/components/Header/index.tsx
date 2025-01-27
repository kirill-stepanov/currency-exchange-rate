import { useState } from "react";
import { GestureResponderEvent, Text, View } from "react-native";

import AppButton from "~/components/AppButton";
import HeaderModal from "~/screens/home/components/HeaderModal";

import { useAppSelector } from "~/hooks/useRedux";

import { styles } from "./styles";

interface HeaderProps {
  isShowFavorite: boolean;
  toggleIsShowFavorite: (event: GestureResponderEvent) => void;
}

const Header = (props: HeaderProps) => {
  const { isShowFavorite, toggleIsShowFavorite } = props;

  const { base } = useAppSelector((state) => state.currencies);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleIsModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <AppButton onPress={toggleIsModalVisible}>
        <Text style={styles.text}>{base}</Text>
      </AppButton>

      <HeaderModal
        isVisible={isModalVisible}
        toggleIsVisible={toggleIsModalVisible}
      />

      <AppButton onPress={toggleIsShowFavorite}>
        <Text style={styles.text}>
          {isShowFavorite ? "Show All" : "Show Favorite Only"}
        </Text>
      </AppButton>
    </View>
  );
};

export default Header;
