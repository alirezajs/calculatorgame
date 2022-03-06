import Game from "./src/components/Game";
import React from "react";

interface AppProp {}
interface AppState {
  gameId: number;
}

export default class App extends React.Component<AppProp, AppState> {
  constructor(props: AppProp) {
    super(props);
    this.state = {
      gameId: 1,
    };
    this.resetGame = this.resetGame.bind(this);

  }

  resetGame = () => {
    this.setState((prevState: AppState) => {
      return { gameId: prevState.gameId + 1 };
    });
  };

  render(): React.ReactNode {
    return (
      <Game
        key={this.state.gameId}
        onPlayAgain={this.resetGame}
        randomNumberCount={6}
        remindingSecond={10}
      />
    );
  }
}
