import { StyleSheet, View, Text, ShadowPropTypesIOS } from "react-native";

import RandomNumber from "./RandomNumber";
import React, { useState } from "react";

export default function Game(props: { randomNumberCount: number }) {
  const randomNumbers = Array.from({ length: props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );
  const [selectedNumbers, setSelectedNumber] = useState<number[]>([]);

  const target = randomNumbers
    .slice(0, props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  function isNumberSelected(numberIndex: number) {
    return selectedNumbers.indexOf(numberIndex) >= 0;
  }
  function selectNumber(numberIndex: number) {
    setSelectedNumber([...selectedNumbers, numberIndex]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) => (
          <RandomNumber
            key={index}
            id={index}
            randomNumber={randomNumber}
            isDisabled={isNumberSelected(index)}
            onPress={selectNumber}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  target: {
    fontSize: 40,
    backgroundColor: "#000",
    margin: 50,
    textAlign: "center",
    color: "#fff",
  },
  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
