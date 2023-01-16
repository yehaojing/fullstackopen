import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";

const useDeleteReview = () => {
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      apolloClient.resetStore();
    },
  });

  const deleteReview = async ({ deleteReviewId }) => {
    return mutate({ variables: { deleteReviewId } });
  };

  return [deleteReview, result];
};

export default useDeleteReview;
