import { Button, View, StyleSheet, Pressable, Linking } from "react-native";
import Text from "./Text";
import Avatar from "./Avatar";
import theme from "../theme";
import formatThousands from "../utils/formatThousands";
import Stat from "./Stat";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { ItemSeparator } from "./RepositoryList";
import { format, parse } from "date-fns";
import useDeleteReview from "../hooks/useDeleteReview";

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
  reviewContainer: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-around"
    
  },
  reviewContainerWithButtons: {
    backgroundColor: theme.colors.appBarPrimary,
  },
  reviewContainerText: {
    paddingLeft: 20,
    flexDirection: "column",
    flexShrink: 1,
    justifyContent: "space-around",
  },
  reviewRatingCircle: {
    borderRadius: 20,
    borderWidth: 2,
    width: 40,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.primary,
  },
  reviewRating: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  reviewUsername: {
    fontWeight: "bold",
  },
  reviewDate: {
    fontWeight: 1,
    color: theme.colors.textSecondary,
  },
  deleteButton: {
    padding: 12,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.error,
  },
  viewRepoButton: {
    padding: 12,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  reviewButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonTextColor: {
    color: theme.colors.appBarPrimary
  }
});

export const RepositoryItemContainer = () => {
  let { repositoryId } = useParams();

  const repository = useRepository(repositoryId);

  if (repository.loading || !repository.repository) {
    return <></>;
  } else {
    return (
      <View>
        <RepositoryItem repository={repository.repository} showGH />
        {repository.repository.reviews.edges.map((review) => {
          return (
            <View key={review.node.id}>
              <ItemSeparator />
              <ReviewItem review={review.node} />
            </View>
          );
        })}
      </View>
    );
  }
};

export const ReviewItem = ({ review, isMyReview }) => {
  const [deleteReview] = useDeleteReview();
  const githubHandler = (url) => {
    return () => Linking.openURL(url);
  };

  const handleDeleteReview = (deleteReviewId) => {
    return () => {
      deleteReview({ deleteReviewId });
    };
  };

  return (
    <View style={styles.reviewContainerWithButtons}>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewRatingCircle}>
          <Text style={styles.reviewRating}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContainerText}>
          <Text style={styles.reviewUsername}>{review.user.username}</Text>
          <Text style={styles.reviewDate}>
            {format(
              parse(
                review.createdAt,
                "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                new Date()
              ),
              "yyyy-MM-dd"
            )}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {isMyReview ? (
        <View style={styles.reviewButtonContainer}>
          <Pressable
            style={styles.viewRepoButton}
            onPress={githubHandler(review.repository.url)}
          >
            <Text style={styles.buttonTextColor}>View Repository</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={handleDeleteReview(review.id)}
            title="Delete Review"
          >
            <Text style={styles.buttonTextColor}>Delete Review</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
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
