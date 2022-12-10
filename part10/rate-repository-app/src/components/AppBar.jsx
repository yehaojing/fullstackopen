import { View, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: "row"

  },
  text: {
    color: theme.colors.appBarPrimary
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
          <AppBarTab to="/">Repositories</AppBarTab>
          <AppBarTab to="/login">Login</AppBarTab>
        </ScrollView>
    </View>
  );
};

export default AppBar;