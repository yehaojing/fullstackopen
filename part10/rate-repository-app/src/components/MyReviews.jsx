import { View, Button, StyleSheet, Linking } from "react-native";
import theme from "../theme";
import { ItemSeparator } from "./RepositoryList";
import { ReviewItem } from "./RepositoryItem";
import useMe from "../hooks/useMe";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  deleteButton: {
    marginVertical: 7,
    paddingVertical: 7,
    borderRadius: 5,
    // color: theme.colors.appBarPrimary,
    backgroundColor: theme.colors.error,
    alignSelf: "center",
    flex: "auto",
  },
  viewRepoButton: {
    marginVertical: 7,
    paddingVertical: 7,
    borderRadius: 5,
    // color: theme.colors.appBarPrimary,
    backgroundColor: theme.colors.primary,
    alignSelf: "center",
    flex: "auto",
  },
  container: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export const MyReviews = () => {
  const { me } = useMe({ includeReviews: true });

  return (
    <>
      {me?.reviews.edges.map((review) => {
        return (
          <View key={review.node.id}>
            <ItemSeparator />
            <ReviewItem review={review.node} isMyReview/>
          </View>
        );
      })}
    </>
  );
};
