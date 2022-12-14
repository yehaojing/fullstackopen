import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE, {
    onCompleted: (data) => {
      authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore();
    }
  });

  const signIn = async ({ username, password }) => {
    return mutate({ variables: { credentials: { username, password } } });
  };

  return [signIn, result];
};

export default useSignIn;
