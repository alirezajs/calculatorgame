import {
  StyleSheet,
  View,
  Text,
  ShadowPropTypesIOS,
  Button,
} from "react-native";

import RandomNumber from "./RandomNumber";

import React from "react";

import shuffle from "lodash.shuffle";

interface GameProps {
  randomNumberCount: number;
  remindingSecond: number;
  onPlayAgain: () => void;
}

interface GameState {
  selectedIds: number[];
  remindingSecond: number;
}
interface GameInterface {
  intervalId: any;
  gameStatus: "win" | "lost" | "playing";
  target: number;
  isIdSelected: (numberIndex: number) => boolean;
  selectId: (numberIndex: number) => void;
  shuffledRandomNumbers: number[];
  CalculateGameStatus: (state: GameState) => "win" | "lost" | "playing";
}
class Game
  extends React.Component<GameProps, GameState>
  implements GameInterface
{
  constructor(props: GameProps) {
    super(props);

    this.state = {
      selectedIds: [],
      remindingSecond: this.props.remindingSecond,
    };

    this.selectId = this.selectId.bind(this);
  }

  intervalId: any;
  gameStatus: "playing" | "win" | "lost" = "playing";

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => {
          return { remindingSecond: prevState.remindingSecond - 1 };
        },
        () => {
          if (this.state.remindingSecond === 0) {
            clearInterval(this.intervalId);
          }
        }
      );
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentWillUpdate(nextProps: GameProps, nextState: GameState) {
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remindingSecond === 0
    ) {
      this.gameStatus = this.CalculateGameStatus(nextState);
      if (this.gameStatus != "playing") {
        clearInterval(this.intervalId);
      }
    }
  }

  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  shuffledRandomNumbers = shuffle(this.randomNumbers);

  isIdSelected(numberIndex: number) {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }
  selectId(numberIndex: number) {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  }

  CalculateGameStatus = (nextState: GameState): "win" | "lost" | "playing" => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if (nextState.remindingSecond === 0) return "lost";
    if (sumSelected === this.target) return "win";
    if (sumSelected > this.target) return "lost";
    return "playing";
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.gameStatus}</Text>
        <Text>{this.state.remindingSecond}</Text>
       

        <Text style={[styles.target, styles[`status_${this.gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              randomNumber={randomNumber}
              isDisabled={
                this.isIdSelected(index) || this.gameStatus !== "playing"
              }
              onPress={this.selectId}
            />
          ))}
        </View>
        {this.gameStatus != "playing" && (
          <Button title="Play Again" onPress={this.props.onPlayAgain} />
        )}
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
