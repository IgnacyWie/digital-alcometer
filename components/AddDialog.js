import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { forwardRef, useImperativeHandle, useRef } from "react";

import {
  Appbar,
  FAB,
  Portal,
  Dialog,
  Paragraph,
  Button,
  RadioButton,
  Text,
} from "react-native-paper";

const drinkTypes = [
  {
    name: "Vodka",
    size: "50ml",
    percentage: "40%",
    weight: 20,
  },
  {
    name: "Whisky",
    size: "50ml",
    percentage: "40%",
    weight: 20,
  },
  {
    name: "Flavored Vodka",
    size: "50ml",
    percentage: "30%",
    weight: 15,
  },
  {
    name: "Wine",
    size: "200ml",
    percentage: "12%",
    weight: 24,
  },
  {
    name: "Liquor",
    size: "50ml",
    percentage: "30%",
    weight: 15,
  },
  {
    name: "Beer",
    size: "400ml",
    percentage: "5%",
    weight: 20,
  },
  {
    name: "Strong Beer",
    size: "400ml",
    percentage: "10%",
    weight: 40,
  },
];

const AddDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState("first");

  useImperativeHandle(ref, () => ({
    displayModal() {
      setVisible(true);
    },
  }));

  return (
    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
      <Dialog.Icon icon="liquor" />
      <Dialog.Title>Add Substances</Dialog.Title>
      <Dialog.Content>
        {drinkTypes.map((drink, index) => (
          <DialogItem
            key={index}
            drink={drink.name}
            index={index}
            size={drink.size}
            percentage={drink.percentage}
            setChecked={setChecked}
            checked={checked}
          />
        ))}
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          textColor="#f44336"
          onPress={() => {
            setVisible(false);
            props.resetAll();
          }}
        >
          Reset
        </Button>
        <Button
          onPress={() => {
            setVisible(false);
            props.addToHistory(drinkTypes[checked]);
            props.addAlcoholGrams(drinkTypes[checked].weight);
          }}
        >
          Done
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
});

export default AddDialog;

const DialogItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.setChecked(props.index)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <RadioButton
          value={props.drink}
          status={props.checked === props.index ? "checked" : "unchecked"}
          onPress={() => {
            props.setChecked(props.index);
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "85%",
          }}
        >
          <Text style={{ fontSize: 16 }}>{props.drink}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, color: "#757575" }}>
              {props.size}
              {" - "}
            </Text>
            <Text style={{ fontSize: 12, color: "#757575" }}>
              {props.percentage}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
