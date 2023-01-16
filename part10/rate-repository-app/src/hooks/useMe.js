import { useQuery } from '@apollo/client';
import { useState } from "react";
import { ME } from '../graphql/queries';

const useMe = (variables) => {
  const [me, setMe] = useState();

  const { error, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: (data) => {
        setMe(data.me);
    },
  });

  return { me, error, loading, refetch };
};

export default useMe;