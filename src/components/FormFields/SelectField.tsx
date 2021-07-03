import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "./form.component.styles";
import { Entypo } from "@expo/vector-icons";

export default function SelectField({
  collection,
  name,
  value,
  handleForm,
  disabled,
  label,
}) {
  const [showOptions, changeShowOption] = React.useState(false);

  const [selectedData, changeSelectedData] = React.useState("");
  const displayOnly = disabled ? "100%" : "90%";
  const currentValue = value == "" ? label : selectedData;

  const handleDataName = dataName => {
    changeSelectedData(dataName);
  };
  // const displayOnlyMargin = disabled ? 5 : 10

  //lets select and replace state_values
  return (
    <>
      <TouchableOpacity
        onPress={() => changeShowOption(!showOptions)}
        style={[styles.container, { width: displayOnly }]}
      >
        <View style={styles.formPortion2}>
          <Text style={styles.labelSelect}>{currentValue}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            changeShowOption(!showOptions);
          }}
          style={styles.typeContSelect}
        >
          {/* <Image
                    source={email} 
                    style={styles.image}
                /> */}
          <Entypo name="triangle-down" size={16} style={styles.iconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsMenuCont}>
          {collection.map(data => (
            <TouchableOpacity
              onPress={() => {
                changeShowOption(false);
                handleForm(name, data.value);
                handleDataName(data.name);
              }}
              style={[styles.selectBox, { zIndex: 200000 }]}
            >
              <Text style={styles.selectText}>{data.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}
