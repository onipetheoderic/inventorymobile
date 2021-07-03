import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "./form.component.styles";
import { Entypo } from "@expo/vector-icons";

type Props = {
  collection: any;
  name: any;
  value: any;
  handleForm: any;
  label: any;
};
export default function SelectField({
  collection,
  name,
  value,
  handleForm,
  label,
}: Props) {
  const [showOptions, changeShowOption] = React.useState(false);

  const [selectedData, changeSelectedData] = React.useState("");
  const currentValue = value == "" ? label : selectedData;

  const handleDataName = (dataName: React.SetStateAction<string>) => {
    changeSelectedData(dataName);
  };
  // const displayOnlyMargin = disabled ? 5 : 10

  //lets select and replace state_values
  return (
    <>
      <TouchableOpacity
        onPress={() => changeShowOption(!showOptions)}
        style={[styles.container, { width: "100%" }]}
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
          <Entypo name="triangle-down" size={16} />
        </TouchableOpacity>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsMenuCont}>
          {collection.map((data: any) => (
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
