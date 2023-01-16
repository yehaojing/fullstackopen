import { useQuery } from '@apollo/client';
import { useState } from "react";
import { ME } from '../graphql/queries';

const useMe = (variables) => {
  const [me, setMe] = useState();

  const { error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: (data) => {
        setMe(data.me);
    },
  });

  return { me, error, loading };
};

export default useMe;