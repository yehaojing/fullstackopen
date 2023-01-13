import { View, StyleSheet, Button, Text } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(1).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  passwordConfirmation: yup.string().required("Password confirmation is required").min(5).max(50).oneOf([yup.ref('password'), null])
});

const styles = StyleSheet.create({
  signInContainer: {
    padding: 5,
    backgroundColor: theme.colors.appBarPrimary,
  },
  textInputs: {
    marginVertical: 7,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: theme.colors.textSecondary,
  },
  loginButton: {
    marginVertical: 7,
    paddingVertical: 7,
    borderRadius: 5,
    color: theme.colors.appBarPrimary,
    backgroundColor: theme.colors.primary,
    alignSelf: "center",
    flex: "auto",
  },
  inputTitle: {
    paddingTop: 10,
    fontWeight: "bold"
  }
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInContainer}>
      <Text style={styles.inputTitle}>Username</Text>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.textInputs}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Text style={styles.inputTitle}>Password</Text>
      <FormikTextInput
        name="password"
        placeholder="Password"
        style={styles.textInputs}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
    <Text style={styles.inputTitle}>Password Confirmation</Text>
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password Confirmation"
        style={styles.textInputs}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Button style={styles.loginButton} onPress={onSubmit} title="Sign Up" />
    </View>
  );
};

const SignUpFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "", passwordConfirmation: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirmation } = values;

    try {
      const { signUpData } = await signUp({ username, password });
      const { signInData } = await signIn({ username, password });
    //   const repoId = data.createReview.repositoryId;
    navigate(`/`)
    //   navigate(`/repository/${repoId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpFormContainer onSubmit={onSubmit} />;
};