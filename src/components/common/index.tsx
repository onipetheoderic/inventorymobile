import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { BackButton } from "./button";
import { MacBook, Acer, Hp, Toshiba } from "../../assets/images";

import CircularButtonWithIcon from "./circularButtonWithIcon";

type Props = {
  navigation: any;
  headerText: string;
};

type ItemProps = {
  name: string;
  unit_price: number;
  quantity: number;
  currency: string;
  category: string;
  navigation: any;
};

export const Header = ({ navigation, headerText }: Props) => {
  return (
    <View style={styles.parentHeader}>
      <BackButton navigation={navigation} />
      <Text style={styles.headerText}>{headerText}</Text>
      <View style={styles.rightSide}>
        <CircularButtonWithIcon
          onPress={() => navigation.openDrawer()}
          iconName="menu"
          toIcon="menu"
          height={60}
          width={60}
          left={20}
          top={30}
        />
      </View>
    </View>
  );
};

export const SingleItems = ({
  name,
  unit_price,
  quantity,
  currency,
  category,
  navigation,
}: ItemProps) => {
  const categoryImage =
    category === "Toshiba laptops"
      ? Toshiba
      : category === "Macbook laptops"
      ? MacBook
      : category === "Hp laptops"
      ? Hp
      : Acer;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditInventory", { name: name })}
      style={styles.singleBg}
    >
      <View style={styles.upperCont}>
        <Image source={categoryImage} style={styles.contentImage} />
      </View>
      <View style={styles.lowerCont}>
        <View style={styles.titleCont}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.categoryText}>{category}</Text>
          <Text style={styles.priceText}>
            {currency}
            {unit_price} ({quantity})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  categoryText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 13,
    color: "#cdcdd8",
  },
  priceText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 15,
    color: "black",
    marginTop: 5,
  },
  titleCont: {
    width: "100%",
    marginLeft: 10,
    marginTop: 5,
  },
  upperCont: {
    borderRadius: 10,
    height: 105,
    alignSelf: "center",
  },
  lowerCont: {
    borderRadius: 10,
    height: 90,
    backgroundColor: "white",
    width: "92%",
    alignSelf: "center",
  },
  singleBg: {
    backgroundColor: "#dee0e6",
    width: "47%",
    height: 200,
    marginVertical: 10,
  },
  parentHeader: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
  },
  headerText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 19,
    textAlign: "center",
    flex: 3,
  },
  nameText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 14,
  },
  rightSide: {
    flex: 1,
  },
});
