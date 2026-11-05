import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex items-cente justify-center px-6">
        hello somewhere
      </View>
    </SafeAreaView>
  );
}
