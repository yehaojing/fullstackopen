import { View, StyleSheet, Pressable, Linking } from "react-native";
import Text from "./Text";
import Avatar from "./Avatar";
import theme from "../theme";
import formatThousands from "../utils/formatThousands";
import Stat from "./Stat";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
  },
  container: {
    padding: 10,
    backgroundColor: theme.colors.appBarPrimary,
  },
  text: {
    color: theme.colors.appBarPrimary,
  },
  headerText: {
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 1,
    marginLeft: 10,
  },
  fullNametext: {
    fontWeight: "bold",
  },
  descriptionText: {
    color: theme.colors.textSecondary,
  },
  languageTag: {
    borderRadius: 5,
    padding: 5,
    color: theme.colors.appBarPrimary,
    backgroundColor: theme.colors.primary,
  },
  languageTagContainer: {
    display: "inline-block",
  },
  statsContainer: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  linkBox: {
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    padding: 10,
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export const RepositoryItemContainer = () => {
  let { repositoryId } = useParams();
  // console.log(repositoryId)

  const repository = useRepository(repositoryId);
  // console.log(repository)

  if (repository.loading || !repository.repository) {
    return <></>;
  } else {
    console.log(repository);
    return <RepositoryItem repository={repository.repository} showGH />;
  }
};

export const RepositoryItem = ({ repository, showGH }) => {
  const githubHandler = (url) => {
    return () => Linking.openURL(url);
  };
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.headerRow}>
        <Avatar ownerAvatarUrl={repository.ownerAvatarUrl} />
        <View style={styles.headerText}>
          <Text style={styles.fullNametext}>{repository.fullName}</Text>
          <Text style={styles.descriptionText}>{repository.description}</Text>
          <View style={styles.languageTagContainer}>
            <Text style={styles.languageTag}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Stat
          statName="stars"
          stat={formatThousands(repository.stargazersCount)}
        ></Stat>
        <Stat
          statName="forks"
          stat={formatThousands(repository.forksCount)}
        ></Stat>
        <Stat statName="Reviews" stat={repository.reviewCount}></Stat>
        <Stat statName="Rating" stat={repository.ratingAverage}></Stat>
      </View>
      {showGH && (
        <View>
          <Pressable
            style={styles.linkBox}
            onPressIn={githubHandler(repository.url)}
          >
            <Text style={{ color: theme.colors.appBarPrimary }}>
              {"Open in GitHub"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
