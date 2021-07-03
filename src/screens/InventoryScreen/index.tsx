import React, { useState, useEffect } from "react";

import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Header, SingleItems } from "../../components/common";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function InventoryScreen(props: any) {
  const [defaultItems, setDefaultItems] = useState<any[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      try {
        let items = await AsyncStorage.getItem("@inventory");
        if (items != null) {
          const parsedItem = JSON.parse(items);
          setDefaultItems(parsedItem);
        }
      } catch (e) {}
    })();
  }, [props.navigation, isFocused]);

  return (
    <View>
      <Header navigation={props.navigation} headerText="Inventory Listing" />

      <ScrollView>
        <View style={styles.listingContainer}>
          {defaultItems.map(item => (
            <SingleItems
              key={item.id}
              navigation={props.navigation}
              name={item.name}
              unit_price={item.unit_price}
              quantity={item.quantity}
              currency={item.currency}
              category={item.category}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("CreateInventory")}
        style={styles.addButton}
      >
        <Entypo name="plus" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listingContainer: {
    width: "90%",
    minHeight: 200,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 120,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "blue",
    width: 60,
    height: 60,
    borderRadius: 30,
    top: 400,
    right: 20,
    zIndex: 400,
  },
});
