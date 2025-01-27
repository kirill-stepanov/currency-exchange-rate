import { TextInput, View } from "react-native";

import SearchIcon from "~/assets/icons/SearchIcon";

import { styles } from "./styles";

interface SearchBarProps {
  value: string;
  onChangeValue: (value: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { value, onChangeValue } = props;

  return (
    <View style={styles.searchSection}>
      <SearchIcon />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeValue}
        placeholder="Search..."
        placeholderTextColor="#000"
      />
    </View>
  );
};

export default SearchBar;
