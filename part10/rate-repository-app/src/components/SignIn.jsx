import { View, StyleSheet, Button } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from 'formik';
import theme from "../theme";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
  .string()
  .required('Username is required'),
  password: yup
  .string()
  .required('Password is required'),
});

const styles = StyleSheet.create({
  signInContainer: {
    padding: 5,
    backgroundColor: theme.colors.appBarPrimary
  },
  textInputs: {
    marginVertical: 7,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: theme.colors.textSecondary
  },
  loginButton: {
    marginVertical: 7,
    paddingVertical: 7,
    borderRadius: 5,
    color: theme.colors.appBarPrimary,
    backgroundColor: theme.colors.primary,
    alignSelf: "center",
    flex: "auto"
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInContainer}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.textInputs}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        style={styles.textInputs}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Button style={styles.loginButton} onPress={onSubmit} title="Login"/>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={{username: '', password: ''}} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

export default SignIn;
