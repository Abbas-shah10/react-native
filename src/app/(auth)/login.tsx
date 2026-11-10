import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <View className="w-full max-w-md self-center">
        <Text className="mb-2 text-3xl font-bold text-white">Welcome back</Text>
        <Text className="mb-8  text-center text-2xl font-bold text-slate-800">
          Sign in to continue to your account.
        </Text>

        <Text className="mb-2 text-sm font-medium text-black">Email</Text>
        <TextInput
          className="mb-5 rounded-xl border border-slate-700 bg-white px-4 py-4 text-black"
          placeholder="you@example.com"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="mb-2 text-sm font-medium text-black">Password</Text>
        <TextInput
          className="rounded-xl border border-slate-700 bg-white px-4 py-4 text-black"
          placeholder="Enter your password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
        />

        {/* <Pressable className="mb-7 mt-3 self-end">
          <Text className="text-sm font-semibold text-indigo-400">
            Forgot password?
          </Text>
        </Pressable> */}

        <Pressable className="items-center rounded-xl mt-10 bg-indigo-500 py-4 active:bg-indigo-600">
          <Text className="text-base font-bold text-white">Sign in</Text>
        </Pressable>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-slate-400">Don't have an account? </Text>
          <Pressable>
            <TouchableOpacity
              className="font-semibold text-indigo-400"
              onPress={() => router.push("/register")}
            >
              Register
            </TouchableOpacity>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
