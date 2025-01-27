import { PropsWithChildren } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

import { styles } from "./styles";

type AppModalProps = PropsWithChildren<{
  isVisible: boolean;
  toggleIsVisible: () => void;
}>;

const AppModal = (props: AppModalProps) => {
  const { isVisible, toggleIsVisible, children } = props;

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleIsVisible}>
      <View style={styles.modal}>{children}</View>
    </Modal>
  );
};

export default AppModal;
