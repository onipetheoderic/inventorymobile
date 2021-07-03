import React from "react";
import { Text, View, TextInput } from "react-native";

import styles from "./form.component.styles";

type Props = {
  icon: any;
  keyboardType: any;
  value: any;
  placeholder: any;
  handleForm: any;
  name: any;
  label: any;
};

export default function FormFields({
  icon,
  keyboardType,
  value,
  placeholder,
  handleForm,
  name,
  label,
}: Props) {
  return (
    <View style={[styles.container, { width: "100%" }]}>
      <View style={styles.typeCont}>{icon}</View>
      <View style={styles.formPortion}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => handleForm(name, text)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#000000"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}
