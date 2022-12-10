import { Text, View, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.textPrimary
  },
  text: {
    color: theme.colors.appBarPrimary
  }
});

const AppBar = () => {
  return (
    <Pressable onPress={() => console.log('You pressed the text!')}>
        <View style={styles.container}>
                <Text style={styles.text}>Repositories</Text>
        </View>
    </Pressable>
  );
};

export default AppBar;