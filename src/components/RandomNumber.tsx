import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { Component }from "react";

interface IRandomNumber {
  id: number;
  randomNumber: number;
  isDisabled: boolean;
  onPress: (id: number) => void;
}

export default class RandomNumber extends Component<IRandomNumber> {
  constructor(props: IRandomNumber) {
    super(props);
    
    this.selectNumber = this.selectNumber.bind(this);
  }

  selectNumber() {
    if (!this.props.isDisabled) {
      this.props.onPress(this.props.id);
    }
  }

 

  render(): ReactNode {
    return (
      <TouchableOpacity
        onPress={this.selectNumber}
        disabled={this.props.isDisabled}
      >
        <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
          {this.props.randomNumber}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
    height: 50,
    textAlignVertical: "center",
  },
  disabled: {
    opacity: 0.3,
  },
});

