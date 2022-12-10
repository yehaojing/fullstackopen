import { View, StyleSheet } from "react-native";
import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";

const Main = () => {
  return (
    <View>
      <AppBar/>
      <View style={styles.container}>
        <RepositoryList></RepositoryList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;