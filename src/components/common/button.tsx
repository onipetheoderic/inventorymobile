/* eslint-disable import/no-cycle */
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

type Props = {
  navigation: any;
};

export const BackButton = ({ navigation }: Props) => (
  <TouchableOpacity
    style={styles.parentHeader}
    testID="back-button"
    onPress={() => navigation.goBack()}
  >
    <Entypo name="chevron-left" size={32} color="green" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  parentHeader: {
    marginLeft: 15,
  },
});
