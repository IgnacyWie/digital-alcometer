import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Provider from "react-native-paper";
import {
  Appbar,
  FAB,
  Portal,
  Dialog,
  Paragraph,
  Surface,
} from "react-native-paper";
import { Image } from "react-native";
import { Button } from "react-native-paper";
import SettingsBanner from "./components/SettingsBanner";
import AddDialog from "./components/AddDialog";
import { useEffect } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";

export default function App() {
  const [visible, setVisible] = useState(true);
  const [alcohol, setAlcohol] = useState(0);
  const [promiles, setPromiles] = useState(0.0);
  const [hours, setHours] = useState(0.0);
  const [history, setHistory] = useState([]);
  const [weight, setWeight] = useState(69);
  const [male, setMale] = useState(true);
  const dialogRef = useRef(null);

  useEffect(() => {
    console.log(alcohol);
    var r = 0;
    if (male) {
      r = 0.68;
    } else {
      r = 0.55;
    }

    const ebac = alcohol / (r * weight) - 0.017 * 0;
    setPromiles(ebac.toFixed(2));
  }, [alcohol]);

  const resetAll = () => {
    setAlcohol(0);
    setPromiles(0);
    setHours(0);
    setHistory([]);
  };

  const addToHistory = (event) => {
    var today = new Date();
    const date = today.getHours() + ":" + today.getMinutes();

    setHistory(
      history +
        {
          time: date,
          event: event,
        }
    );
  };

  const addAlcoholGrams = (grams) => {
    setAlcohol(alcohol + grams);
  };

  const showDialog = () => {
    dialogRef.current.displayModal();
  };

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Alcometer" />
        <Appbar.Action icon="cog" onPress={() => {}} />
      </Appbar.Header>
      {/* <SettingsBanner /> */}
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <WidgetCard
          description="Alcohol Level"
          value={promiles}
          unit="promiles"
        />
        <WidgetCard
          description="Alcohol Consumed"
          value={alcohol}
          unit="grams"
        />
        <WidgetCard
          description="Effects Remaining"
          value={hours}
          unit="hours"
        />
      </View>
      <AddDialog
        ref={dialogRef}
        addToHistory={addToHistory}
        addAlcoholGrams={addAlcoholGrams}
        resetAll={resetAll}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          showDialog();
        }}
        size="medium"
        mode="elevated"
        // color="#ffffff"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    marginRight: 36,
    marginBottom: 96,
    right: 0,
    bottom: 0,
    // backgroundColor: "#29b6f6",
  },
});

const WidgetCard = (props) => {
  return (
    <Surface
      elevation={1}
      style={{
        width: "100%",
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <Text>{props.description}</Text>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        {props.value}
      </Text>
      <Text>{props.unit}</Text>
    </Surface>
  );
};
