import { View, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.textPrimary,
    justifyContent: "space-between",
    flexDirection: "row"

  },
  text: {
    color: theme.colors.appBarPrimary
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/login">Login</AppBarTab>
    </View>
  );
};

export default AppBar;