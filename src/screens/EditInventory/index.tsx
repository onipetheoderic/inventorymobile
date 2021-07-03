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
import { useIsFocused } from "@react-navigation/native";
import Modal from "react-native-modal";

export default function CreateInventoryScreen(props: any) {
  const [defaultItems, setDefaultItems] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [value, changeValue] = useState({
    name: "",
    unit_price: "0",
    quantity: "0",
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

  const iconMaker = (img: string) => (
    <Entypo name="plus" size={16} color="white" />
  );
  let itemNames = defaultItems.map(a => a.name);

  const saveItems = (): void => {
    let { success, message } = EditValidator(value);
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
        unit_price: "0",
        quantity: "0",
        description: "",
      });
      props.navigation.navigate("InventoryScreen");
    }
  };

  useEffect(() => {
    (async () => {
      const incomingItem = props.route.params.name;
      try {
        let items = await AsyncStorage.getItem("@inventory");
        if (items != null) {
          const parsedItem = JSON.parse(items);
          setDefaultItems(parsedItem);
          const singleItem = defaultItems.filter(a => a.name == incomingItem);
          const { name, quantity, unit_price, description } = singleItem[0];
          changeValue({
            name: name,
            quantity: quantity.toString(),
            unit_price: unit_price.toString(),
            description: description,
          });
        }
      } catch (e) {}
    })();
  }, [props.navigation, isFocused]);

  const deleteItem = () => {
    setModalVisible(true);
  };
  const approvedDelete = () => {
    const incomingItem = props.route.params.name;
    let newArr = defaultItems.filter(a => a.name != incomingItem);
    AsyncStorage.setItem("@inventory", JSON.stringify(newArr));
    Toast.show({
      text: "Item Deleted Successfully",
      buttonText: "Okay",
      duration: 5000,
      type: "success",
    });
    changeValue({
      name: "",
      unit_price: "0",
      quantity: "0",
      description: "",
    });
    setModalVisible(false);
    props.navigation.navigate("InventoryScreen");
  };
  const noDelete = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <Header navigation={props.navigation} headerText="Edit Inventory" />

      <KeyboardAwareScrollView>
        <View style={styles.formCont}>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalCont}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this Item
              </Text>
              <TouchableOpacity
                onPress={() => approvedDelete()}
                style={styles.yesButton}
              >
                <Text style={styles.modalText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => noDelete()}
                style={styles.noButton}
              >
                <Text style={styles.modalText}>No</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
          <View style={styles.spacer} />
          <Button onPress={() => deleteItem()} title="Delete Item" />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  yesButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  noButton: {
    marginTop: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  modalText: {
    fontFamily: "ReemKufi_400Regular",
    textAlign: "center",

    fontSize: 17,
  },
  modalCont: {
    width: "93%",
    alignSelf: "center",
    height: 150,
    backgroundColor: "white",
  },
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
