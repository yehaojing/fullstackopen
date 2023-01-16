import { useApolloClient } from "@apollo/client";
import { View, StyleSheet, ScrollView } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";
import useMe from "../hooks/useMe";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: "row",
  },
  text: {
    color: theme.colors.appBarPrimary,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();

  const apolloClient = useApolloClient();

  const signOut = async () => {
    console.log("foobar");
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const { me } = useMe();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {me ? (
          <>
            <AppBarTab to="/" onPress={signOut}>
              Logout
            </AppBarTab>
            <AppBarTab to="/review">Review</AppBarTab>
            <AppBarTab to="/myreviews">My Reviews</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/login">Login</AppBarTab>
            <AppBarTab to="/signup">Sign Up</AppBarTab>
          </>
        )}
      </ScrollView>
      {me ? <AppBarTab>Logged in as {me.username}</AppBarTab> : <></>}
    </View>
  );
};

export default AppBar;
