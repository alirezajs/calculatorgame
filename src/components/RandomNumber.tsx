import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RandomNumber(props: {
  id: number;
  randomNumber: number;
  isDisabled: boolean;
  onPress: (id: number) => void;
}) {
  function selectNumber() {
    props.onPress(props.id);
  }
  return (
    <TouchableOpacity onPress={selectNumber}>
      <Text style={[styles.random, props.isDisabled && styles.disabled]}>
        {props.randomNumber}
      </Text>
    </TouchableOpacity>
  );
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
