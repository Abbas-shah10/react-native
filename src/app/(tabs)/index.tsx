import { useAuthStore } from "@/store/useAuthStore";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Simple vector icons replacement for copy-paste convenience.
// Replace these placeholders with Lucide-react-native, Ionicons, or FontAwesome in production.
const IconPlaceholder = ({ name }: { name: string }) => (
  <View className="w-10 h-10 bg-blue-100 dark:bg-slate-800 rounded-full items-center justify-center">
    <Text className="text-blue-600 dark:text-blue-400 font-bold">★</Text>
  </View>
);

export default function DashboardScreen() {
  const user = useAuthStore(
    (state) =>
      (state as { user?: { email?: string | null } }).user,
  );
  const quickActions = [
    { id: "1", title: "Send Money", icon: "send" },
    { id: "2", title: "Analytics", icon: "pie-chart" },
    { id: "3", title: "Cards", icon: "card" },
    { id: "4", title: "Vouchers", icon: "gift" },
  ];

  const email = user?.email ?? "";

  console.log(email);

  const recentTransactions = [
    {
      id: "1",
      name: "Netflix Subscription",
      category: "Entertainment",
      amount: "-$15.99",
      date: "Today",
    },
    {
      id: "2",
      name: "Salary Deposit",
      category: "Income",
      amount: "+$4,250.00",
      date: "Yesterday",
    },
    {
      id: "3",
      name: "Starbucks Coffee",
      category: "Food & Drink",
      amount: "-$6.45",
      date: "Nov 8",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 px-4 py-4"
    >
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-black  text-sm font-medium">Welcome back,</Text>
          <Text className="text-black text-2xl font-bold">
            {email.slice(0, 5)}
          </Text>
        </View>
        <TouchableOpacity className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full items-center justify-center border border-slate-300 dark:border-slate-700">
          <Text className="text-slate-700 dark:text-slate-300 font-bold">
            {email.slice(0, 1).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View className="bg-blue-600 p-6 rounded-3xl shadow-xl shadow-blue-500/20 mb-6">
        <Text className="text-blue-100 text-sm font-medium tracking-wide">
          TOTAL BALANCE
        </Text>
        <Text className="text-white text-3xl font-extrabold mt-1">
          $12,480.00
        </Text>

        <View className="flex-row justify-between items-center mt-6 pt-4 border-t border-blue-500/30">
          <View>
            <Text className="text-blue-200 text-xs">Monthly Income</Text>
            <Text className="text-white text-sm font-semibold mt-0.5">
              +$4,850
            </Text>
          </View>
          <View>
            <Text className="text-blue-200 text-xs">Monthly Expenses</Text>
            <Text className="text-white text-sm font-semibold mt-0.5">
              -$1,240
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions (Horizontal Scroll) */}
      <View className="mb-6">
        <Text className="text-slate-900 dark:text-white text-lg font-bold mb-3">
          Quick Actions
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-2xl items-center justify-center w-24 mr-3 border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <IconPlaceholder name={action.icon} />
              <Text
                className="text-slate-700 dark:text-slate-300 text-xs font-medium text-center mt-2"
                numberOfLines={1}
              >
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Transactions List */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-slate-900 dark:text-white text-lg font-bold">
            Recent Activity
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
          {recentTransactions.map((item, index) => (
            <View
              key={item.id}
              className={`flex-row justify-between items-center py-3.5 ${
                index !== recentTransactions.length - 1
                  ? "border-b border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl items-center justify-center">
                  <Text className="text-lg">💸</Text>
                </View>
                <View>
                  <Text
                    className="text-slate-950 dark:text-white font-semibold text-sm"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                    {item.category} • {item.date}
                  </Text>
                </View>
              </div>
              <Text
                className={`font-bold text-sm ${
                  item.amount.startsWith("+")
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
