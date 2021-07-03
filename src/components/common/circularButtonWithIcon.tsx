import React, { useState } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

type Props = {
  onPress: any;
  iconName: string;
  toIcon: string;
  height: number;
  width: number;
};
export default function CircularButtonWithIcon({
  toIcon,
  iconName,
  height,
  width,
  onPress,
}: Props) {
  const [current, changeCurrent] = useState(true);

  const currentIcon = current === true ? iconName : toIcon;
  return (
    <TouchableOpacity
      onPress={() => {
        changeCurrent(!current);
        onPress();
      }}
      style={{
        justifyContent: "center",
        zIndex: 10,
        position: "absolute",
        width: width,
        height: height,
        borderRadius: height / 2,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 12,
      }}
    >
      <Feather
        name="menu"
        style={{ color: "black", alignSelf: "center" }}
        size={height / 2}
      />
    </TouchableOpacity>
  );
}
