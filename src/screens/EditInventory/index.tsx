import React, { useState, useEffect, useCallback } from "react";

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
import { EditValidator } from "../../validators/inventoryValidators";
/*
Create a screen that shows a form that allows users create new items and add them to the inventory, a user should be able to enter the item's name, total stock, price, and description. All fields should be validated to meet the following.

Name is required, and must be unique.
Total stock is required and must be a number.
Price is required and must be a number.
Description is required and must have at least three words.
*/
type Props = {
  navigation: any;
};
export default function CreateInventoryScreen({ navigation }: Props) {
  const [defaultItems, setDefaultItems] = useState([]);

  const [value, changeValue] = useState({
    name: "",
    unit_price: 0,
    quantity: 0,
    category: "",
    description: "",
  });

  const [valueMain, changeValueMain] = useState({
    mainItem: "",
  });

  const [showOptions, setShowOptions] = useState(false);

  const handleForm = (name: string, text: string) => {
    console.log("the vals", value);
    changeValue({ ...value, [name]: text });
  };

  const populateCurrent = (mainItem: string, text: string) => {
    console.log("the vals", text);
    //lets filter it
    const singleItem = defaultItems.filter(a => a.name == text);
    const { name, quantity, unit_price, description } = singleItem[0];
    console.log(singleItem[0], "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
    changeValue({
      name: name,
      quantity: quantity.toString(),
      unit_price: unit_price.toString(),
      description: description,
    });
    setShowOptions(true);
    changeValueMain({ ...valueMain, [mainItem]: text });
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
    let { success, message } = EditValidator(value);
    console.log(success, message, "UUUUUUUU");
    if (success === false) {
      Toast.show({
        text: message,
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
      //lets getArray not present

      let newArr = defaultItems.filter(a => a.name != value.name);

      let concatenatedArr = newArr.concat(newObj);
      console.log(concatenatedArr, "New array");
      AsyncStorage.setItem("@inventory", JSON.stringify(concatenatedArr));
      Toast.show({
        text: "Edited successfully",
        buttonText: "Okay",
        duration: 5000,
        type: "success",
      });
      changeValue({
        name: "",
        unit_price: 0,
        quantity: 0,
        category: "",
        description: "",
      });
      navigation.navigate("InventoryScreen");
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
  /*
const increment = useCallback(() => {
  setCount(count + 1)
}, [count])
*/
  const itemNamesCollection = () => {
    let itemCollection = [];
    for (var i in itemNames) {
      let obj = {
        name: itemNames[i],
        value: itemNames[i],
      };
      itemCollection.push(obj);
    }
    return itemCollection;
  };

  return (
    <View>
      <Header navigation={navigation} headerText="Edit Inventory" />

      <KeyboardAwareScrollView>
        <View style={styles.formCont}>
          <SelectField
            name="mainItem"
            handleForm={populateCurrent}
            value={valueMain.mainItem}
            label="Select Inventory Item to Edit"
            collection={itemNamesCollection()}
          />
          <View style={styles.spacer} />

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

          <View style={styles.spacer} />
          <Button onPress={() => saveItems()} title="Finish Editing" />
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
