import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 60,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeced",
  },
  currencyContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  rateContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    textAlign: "right",
    padding: 0,
    fontSize: 16,
    color: "#000",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});
