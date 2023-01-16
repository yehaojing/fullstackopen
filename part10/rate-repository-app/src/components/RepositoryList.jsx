import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { Searchbar } from 'react-native-paper'
import { useDebouncedCallback } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, header, onEndReach }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onPress = (id) => {
    return () => navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={(item) => {
        return (
          <Pressable onPress={onPress(item.item.id)}>
            <RepositoryItem repository={item.item} />
          </Pressable>
        );
      }}
      ListHeaderComponent={header}
    />
  );
};

const RepositoryList = () => {
  const [useRepositoriesVariables, setUseRepositoriesVariables] = useState({ orderBy: "CREATED_AT", orderDirection: "DESC", searchKeyword: "", first: 4});

  const { repositories, fetchMore } = useRepositories(useRepositoriesVariables);
  const orderOptions = [
    { label: 'Latest repositories', value: 'latest' },
    { label: 'Highest rated repositories ', value: 'highest' },
    { label: 'Lowest rated repositories', value: 'lowest' }
  ];

  const onEndReach = () => {
    fetchMore();
  };

  const debounced = useDebouncedCallback(
    (searchKeyword) => {
      setUseRepositoriesVariables({ ...useRepositoriesVariables, searchKeyword });
    }, 1000
  );

  const handleValueChange = (value) => {
    if (value === 'highest') {
      setUseRepositoriesVariables({...useRepositoriesVariables, orderBy: "RATING_AVERAGE", orderDirection: "DESC"})
    } else if (value === "lowest") {
      setUseRepositoriesVariables({ ...useRepositoriesVariables, orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
    } else {
      setUseRepositoriesVariables({ ...useRepositoriesVariables, orderBy: "CREATED_AT", orderDirection: "DESC" });
    }
  };

  return <RepositoryListContainer repositories={repositories} header={
    <>
      <Searchbar onChange={(e) => {debounced(e.target.value)}}></Searchbar>
      <Picker onValueChange={(value) => handleValueChange(value)}>
          {orderOptions.map(order => <Picker.Item key={order.value} label={order.label} value={order.value}/>)}
      </Picker>
    </>
  }
  onEndReach={onEndReach}/>;
};

export default RepositoryList;
