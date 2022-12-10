import { View, StyleSheet } from "react-native";
import RepositoryList from "./RepositoryList";

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList></RepositoryList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;