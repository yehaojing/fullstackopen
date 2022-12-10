import { Image } from "react-native";

const Avatar = ({ ownerAvatarUrl }) => {
  return (
    <Image
      style={{
        width: 50,
        height: 50,
        borderRadius: 10
      }}
      source={{ uri: ownerAvatarUrl }}
    />
  );
};

export default Avatar;
