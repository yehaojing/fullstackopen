import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, header }) => {
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
  const [ordering, setOrdering] = useState({ orderBy: "CREATED_AT", orderDirection: "DESC" });
  const { repositories } = useRepositories(ordering);
  const orderOptions = [
    { label: 'Latest repositories', value: 'latest' },
    { label: 'Highest rated repositories ', value: 'highest' },
    { label: 'Lowest rated repositories', value: 'lowest' }
  ];

  const handleValueChange = (value) => {
    if (value === 'highest') {
      setOrdering({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
    } else if (value === "lowest") {
      setOrdering({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
    } else {
      setOrdering({ orderBy: "CREATED_AT", orderDirection: "DESC" });
    }
  };

  return <RepositoryListContainer repositories={repositories} header={
    <Picker onValueChange={(value) => handleValueChange(value)}>
        {orderOptions.map(order => <Picker.Item key={order.value} label={order.label} value={order.value}/>)}
    </Picker>
  }/>;
};

export default RepositoryList;
