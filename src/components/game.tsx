import { StyleSheet, View, Text } from "react-native";
import React from "react";
export default function Game(props: { randomNumberCount: number }) {
  const randomNumbers = Array.from({ length: props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );
  const target = randomNumbers
    .slice(0, props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) => (
          <Text style={styles.random} key={index}>
            {randomNumber}
          </Text>
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
  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
    height:100,
    textAlignVertical:'center'
  },
});
