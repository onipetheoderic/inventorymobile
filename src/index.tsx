import React from "react";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { FasterOne_400Regular } from "@expo-google-fonts/faster-one";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import { ReemKufi_400Regular } from "@expo-google-fonts/reem-kufi";

import AppLoading from "expo-app-loading";

import DrawerNavigator from "./navigation/DrawerNavigation";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Root } from "native-base";
import { useFonts } from "expo-font";
import { defaultItems } from "./dummy/inventoryItems";

export default function App() {
  //lets populate async storage with default values
  const displayData = async () => {
    try {
      let items = await AsyncStorage.getItem("@inventory");
      if (items === null) {
        AsyncStorage.setItem("@inventory", JSON.stringify(defaultItems));
      }
    } catch (error) {
      console.log(error);
    }
  };

  displayData();

  let [fontsLoaded] = useFonts({
    FasterOne_400Regular,
    Righteous_400Regular,
    FredokaOne_400Regular,
    ReemKufi_400Regular,
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Root>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Root>
  );
}
