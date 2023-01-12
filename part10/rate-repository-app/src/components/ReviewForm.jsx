import { View, StyleSheet, Button, Text } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number("Rating must be a number.")
    .integer("Rating must be an integer.")
    .min(0, "Rating must be at least 0.")
    .max(100, "Rating cannot exceed 100.")
    .required("Rating is required"),
  text: yup.string().required("Review is required"),
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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInContainer}>
      <Text style={styles.inputTitle}>Username</Text>
      <FormikTextInput
        name="ownerName"
        placeholder="Username"
        style={styles.textInputs}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Text style={styles.inputTitle}>Repository Name</Text>
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository Name"
        style={styles.textInputs}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Text style={styles.inputTitle}>Rating</Text>
      <FormikTextInput
        name="rating"
        placeholder="Rating"
        style={styles.textInputs}
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="numeric"
      />
      <Text style={styles.inputTitle}>Review</Text>
      <FormikTextInput
        name="text"
        placeholder="Review"
        style={styles.textInputs}
        placeholderTextColor={theme.colors.textSecondary}
        numberOfLines={5}
        multiline
      />
      <Button style={styles.loginButton} onPress={onSubmit} title="Create Review" />
    </View>
  );
};

const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ ownerName: "", rating: "", repositoryName: "", text: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export const Review = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;

    try {
      const { data } = await createReview({ ownerName, rating, repositoryName, text });
      const repoId = data.createReview.repositoryId;
      navigate(`/repository/${repoId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormContainer onSubmit={onSubmit} />;
};