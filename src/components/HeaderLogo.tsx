import { Image, View } from "react-native";
export function HeaderLogo() {
  return (
    <View className="items-center justify-center">
      <Image
        source={{ uri: "../assets" }}
        className="w-40 h-14"
        resizeMode="contain"
      />
    </View>
  );
}
