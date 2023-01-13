import { SIGN_UP } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";

const useSignUp = () => {
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(SIGN_UP, {
    onCompleted: () => {
      apolloClient.resetStore();
    }
  });

  const signUp = async ({ username, password }) => {
    return mutate({ variables: { user: { username, password } } });
  };

  return [signUp, result];
};

export default useSignUp;
