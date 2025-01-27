import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import HomeScreen from "~/screens/home";
import ConverterScreen from "~/screens/converter";
import { store } from "~/store";

// import { store } from "./src/store";

// import HomeScreen from "./src/screens/home";
// import ConverterScreen from "./src/screens/converter";

// import HomeScreen from "screens/home";
// import ConverterScreen from "screens/converter";

export type NavigationParamList = {
  Home: undefined;
  Converter: {
    currencyCode: string;
    currencyRate: number;
  };
};

export type HomeScreenProps<T extends keyof NavigationParamList> =
  NativeStackScreenProps<NavigationParamList, T>;

export type ConverterScreenProps<T extends keyof NavigationParamList> =
  NativeStackScreenProps<NavigationParamList, T>;

export type NavigationProp = NativeStackNavigationProp<NavigationParamList>;

const App = () => {
  const Stack = createNativeStackNavigator<NavigationParamList>();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="Converter" component={ConverterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
