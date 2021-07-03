import React, { useState, useEffect } from "react";

import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Toast } from "native-base";
import { Header, SingleItems } from "../../components/common";
import FormField from "../../components/FormFields/FormField";
import SelectField from "../../components/FormFields/SelectField";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import randomNumber from "../../utils/randomNumber";
import { CreateValidator } from "../../validators/inventoryValidators";

export default function CreateInventoryScreen(props: any) {
  const [defaultItems, setDefaultItems] = useState<any[]>([]);

  const [value, changeValue] = useState({
    name: "",
    unit_price: "0",
    quantity: "0",
    category: "",
    description: "",
  });

  const handleForm = (name: string, text: string) => {
    console.log("the vals", value);
    changeValue({ ...value, [name]: text });
  };

  const iconMaker = (img: string) => (
    <Entypo name="plus" size={16} color="white" />
  );
  let itemNames = defaultItems.map(a => a.name);

  const categoryCollection = [
    { name: "Asus laptops", value: "Asus laptops" },
    { name: "Apple laptops", value: "Apple laptops" },
    { name: "Toshiba laptops", value: "Toshiba laptops" },
    { name: "Hp laptops", value: "Hp laptops" },
    { name: "Macbook laptops", value: "Macbook laptops" },
  ];

  const saveItems = (): void => {
    let { success, message } = CreateValidator(value, itemNames);
    const msg = "" + message;
    if (success === false) {
      Toast.show({
        text: msg,
        buttonText: "Okay",
        duration: 5000,
        type: "danger",
      });
    } else {
      //lets add it to the inventory db,
      //we get everything
      //we concat it to defaultItems
      let newObj = {
        ...value,
        id: randomNumber(),
        currency: "₦",
      };
      let newArr = defaultItems.concat(newObj);
      AsyncStorage.setItem("@inventory", JSON.stringify(newArr));
      Toast.show({
        text: "Added successfully",
        buttonText: "Okay",
        duration: 5000,
        type: "success",
      });
      changeValue({
        name: "",
        unit_price: "0",
        quantity: "0",
        category: "",
        description: "",
      });
      props.navigation.navigate("InventoryScreen");
    }
  };

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
  }, []);

  return (
    <View>
      <Header navigation={props.navigation} headerText="Create Inventory" />

      <View style={styles.addIcon}>
        <Entypo name="plus" size={52} color="white" />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.formCont}>
          <FormField
            icon={iconMaker("add")}
            handleForm={handleForm}
            name="name"
            placeholder="Enter name"
            label="Name of Inventory Item"
            keyboardType="default"
            value={value.name}
          />
          <View style={styles.spacer} />
          <FormField
            icon={iconMaker("add")}
            handleForm={handleForm}
            name="unit_price"
            placeholder="Enter Unit Price"
            label="Unit Price for single item"
            keyboardType="numeric"
            value={value.unit_price}
          />
          <View style={styles.spacer} />
          <FormField
            icon={iconMaker("add")}
            handleForm={handleForm}
            name="quantity"
            placeholder="Enter quantity of items"
            label="Quantity"
            keyboardType="numeric"
            value={value.quantity}
          />
          <View style={styles.spacer} />
          <FormField
            icon={iconMaker("add")}
            handleForm={handleForm}
            name="description"
            placeholder="Enter description"
            label="Brief Description"
            keyboardType="default"
            value={value.description}
          />
          <View style={styles.spacer} />
          <SelectField
            name="category"
            handleForm={handleForm}
            value={value.category}
            label="Select Category"
            collection={categoryCollection}
          />
          <View style={styles.spacer} />
          <Button onPress={() => saveItems()} title="Add Inventory" />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  formCont: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    marginBottom: 170,
  },
  addIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#070a55",
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageIcon: {
    width: 15.26,
    height: 13.99,
    resizeMode: "contain",
  },
  imageIcon2: {
    width: 12.5,
    height: 14.99,
    resizeMode: "contain",
  },
  spacer: {
    marginVertical: 5,
  },
});
