import { View, StyleSheet } from "react-native";
import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { RepositoryItemContainer } from "./RepositoryItem";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import { Review } from "./ReviewForm";
import Constants from 'expo-constants';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/login" element={<SignIn />} exact />
        <Route
          path="/repository/:repositoryId"
          element={<RepositoryItemContainer/>}
        />
        <Route
          path="/review"
          element={<Review/>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Main;
