import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <View className="flex-1 bg-white justify-center px-6">
      <View className="bg-white rounded-2xl  p-8 w-full">
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          Create Account
        </Text>
        <Text className="text-base text-gray-500 mb-6">
          Get started with your new profile
        </Text>

        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}

        <View className="mb-4">
          <Text className="text-gray-700 mb-1">Email Address</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-gray-50"
            placeholder="name@example.com"
            placeholderTextColor="#64748B"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-gray-50"
            placeholder="••••••••"
            placeholderTextColor="#64748B"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-1">Confirm Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-gray-50"
            placeholder="••••••••"
            placeholderTextColor="#64748B"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className={`bg-blue-600 rounded-lg py-3 items-center mb-4 ${loading ? "opacity-60" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-2">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="pl-1"
          >
            <Text className="text-blue-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default register;
