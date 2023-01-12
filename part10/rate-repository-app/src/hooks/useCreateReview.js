import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";

const useCreateReview = () => {
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      apolloClient.resetStore();
    }
  });

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    return mutate({ variables: { review: { ownerName, rating: parseInt(rating), repositoryName, text } } });
  };

  return [createReview, result];
};

export default useCreateReview;
