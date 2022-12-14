import { useQuery } from '@apollo/client';
import { useState } from "react";
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setRepositories(data.repositories);
    },
  });

  return { repositories, error, loading };
};

export default useRepositories;