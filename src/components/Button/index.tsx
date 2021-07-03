import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

type Props = {
  title: string;
  onPress: any;
};
export default function GreenButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerCover}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCover: {
    backgroundColor: "#070a55",
    width: "90%",
    height: 56,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 15,
    fontFamily: "ReemKufi_400Regular",
    color: "white",
  },
});
