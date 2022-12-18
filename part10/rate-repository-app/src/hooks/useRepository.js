import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  const [repository, setRepository] = useState();

  const { error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId },
    onCompleted: (data) => {
      setRepository(data.repository);
    },
  });

  return { repository, error, loading };
};

export default useRepository;
