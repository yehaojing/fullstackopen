import { Pressable, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
    linkText: {
      color: theme.colors.appBarPrimary
    },
    linkBox: {
        borderRadius: 2,
        backgroundColor: theme.colors.textSecondary,
        padding: 5
    }
})

const AppBarTab = ({to, children}) => {
    return (
      <Pressable style={styles.linkBox}>
        <Link to={to}>
          <Text style={styles.linkText}>{children}</Text>
        </Link>
      </Pressable>
    );
}

export default AppBarTab