import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CreateInventory from "../screens/CreateInventory";
import EditInventory from "../screens/EditInventory";
import InventoryScreen from "../screens/InventoryScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  function CustomDrawerContent(props: any) {
    return (
      <>
        <View style={styles.transparentLogoCont}>
          <View style={styles.logoView}></View>

          <>
            <Text style={styles.nameText}>Theoderic</Text>
            <Text style={styles.emailText}>onipetheoderic@gmail.com</Text>
          </>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("InventoryScreen")}
          style={styles.drawerItems}
        >
          <Text style={styles.textStyle}>Inventory Listing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("CreateInventory")}
          style={styles.drawerItems}
        >
          <Text style={styles.textStyle}>Create Inventory</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="InventoryScreen"
    >
      <Drawer.Screen
        name="InventoryScreen"
        component={InventoryScreen}
        options={({ route, navigation }) => {
          return {
            swipeEnabled: true,
          };
        }}
      />
      <Drawer.Screen
        name="CreateInventory"
        component={CreateInventory}
        options={({ route, navigation }) => {
          return {
            swipeEnabled: true,
          };
        }}
      />

      <Drawer.Screen
        name="EditInventory"
        component={EditInventory}
        options={({ route, navigation }) => {
          return {
            swipeEnabled: true,
          };
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  emailText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 14,
  },
  nameText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 16,
    marginTop: 10,
  },
  copyright: {
    fontSize: 8,
    marginTop: 3,
    marginLeft: 4,
  },
  socialMediaCont: {
    position: "absolute",

    flexDirection: "column",
    justifyContent: "space-between",

    height: 100,
    width: "100%",
    bottom: 0,
  },
  textStyle: {
    marginLeft: 20,
    fontFamily: "ReemKufi_400Regular",
    fontSize: 16,
  },
  drawerItems: {
    height: 45,
    width: "90%",
    alignItems: "center",
    marginLeft: "10%",
    flexDirection: "row",
  },
  parentLogos: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    height: 150,
  },
  transparentLogoCont: {
    width: "100%",
    alignSelf: "center",
    height: 200,

    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  logoImageInParent: {
    width: 265,
    height: 105,
    resizeMode: "cover",
    alignSelf: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logoImage: {
    alignSelf: "center",
    width: 212,
    height: 85,

    resizeMode: "stretch",
  },
  logoView: {
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "white",
    width: 120,
    height: 120,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  navBar: {
    flexDirection: "row",
    marginLeft: "15%",
  },
  header: {
    flexDirection: "column",
    flex: 1,
  },
  body: {
    flex: 7,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
