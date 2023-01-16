import { View } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import { ReviewItem } from "./RepositoryItem";
import useMe from "../hooks/useMe";

export const MyReviews = () => {
  const { me } = useMe({ includeReviews: true });
  console.log(me);

  return (
    <>
      {me?.reviews.edges.map((review) => {
        return (
          <View key={review.node.id}>
            <ItemSeparator />
            <ReviewItem review={review.node} />
          </View>
        );
      })}
    </>
  );
};
