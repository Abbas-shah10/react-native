import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-sm rounded-3xl bg-sky-500 p-6">
          <Text className="text-sm font-semibold uppercase tracking-wider text-sky-100">
            React Native
          </Text>
          <Text className="mt-2 text-3xl font-bold text-white">
            Ready to build
          </Text>
          <Text className="mt-3 text-base text-sky-100">
            Edit src/app/index.tsx and start learning with NativeWind.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
