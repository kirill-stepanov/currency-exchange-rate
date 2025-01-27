import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 40,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: "#000",
    justifyContent: "space-between",
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  searchIcon: {},
  input: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
  },
});
