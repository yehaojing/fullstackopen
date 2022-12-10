import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  stat: {
    flexDirection: "column",
    alignItems: "center",
  },
  statText: {
    fontWeight: "bold",
  },
});

const Stat = ({ statName, stat }) => {
  return (
    <View style={styles.stat}>
      <Text style={styles.statText}>{stat}</Text>
      <Text>{statName}</Text>
    </View>
  );
};

export default Stat;
