import { PropsWithChildren } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { styles } from "./styles";

type AppButtonProps = PropsWithChildren<{
  onPress?: (event: GestureResponderEvent) => void;
  customStyles?: ViewStyle;
}>;

const AppButton = (props: AppButtonProps) => {
  const { onPress, customStyles, children } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.container, customStyles]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default AppButton;
