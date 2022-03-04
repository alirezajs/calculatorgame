import { StyleSheet, View, Text, ShadowPropTypesIOS } from "react-native";

import RandomNumber from "./RandomNumber";

import React from "react";

interface gameProps {
  randomNumberCount: number;
}

interface gameInterface {
  selectedIds: number[];
}

class Game extends React.Component<gameProps, gameInterface> {
  constructor(props: { randomNumberCount: number }) {
    super(props);

    this.state = {
      selectedIds: [],
    };

    this.selectId = this.selectId.bind(this);
  }

  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  isIdSelected(numberIndex: number) {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }
  selectId(numberIndex: number) {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  }

  getStatus = (): "win" | "lost" | "playing" => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (sumSelected === this.target) return "win";
    if (sumSelected > this.target) return "lost";
    return "playing";
  };
  render() {
    const status = this.getStatus();
    return (
      <View style={styles.container}>
        <Text>{status}</Text>
        <Text style={[styles.target, styles[`status_${status}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              randomNumber={randomNumber}
              isDisabled={this.isIdSelected(index) || status !== "playing"}
              onPress={this.selectId}
            />
          ))}
        </View>
      </View>
    );
  }
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
  status_playing: {
    backgroundColor: "#000",
    color: "#fff",
  },
  status_lost: {
    backgroundColor: "#b00",
  },
  status_win: {
    backgroundColor: "#0ba700",
  },
});

export default Game;
