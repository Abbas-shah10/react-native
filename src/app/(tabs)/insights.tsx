import { ScrollView, Text, View } from "react-native";

const Insights = () => {
  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-5 pb-10 pt-14"
    >
      <View className="mb-7">
        <Text className="text-sm font-semibold uppercase tracking-[3px] text-indigo-600">
          Your progress
        </Text>
        <Text className="mt-2 text-3xl font-bold text-slate-200">Insights</Text>
        <Text className="mt-2 text-base text-slate-500">
          A snapshot of how you&apos;re doing this week.
        </Text>
      </View>

      <View className="mb-5 flex-row gap-3">
        <View className="flex-1 rounded-3xl bg-indigo-600 p-5">
          <Text className="text-sm font-medium text-indigo-100">
            Weekly activity
          </Text>
          <Text className="mt-3 text-3xl font-bold text-white">12.5 hrs</Text>
          <Text className="mt-2 text-sm text-indigo-100">
            ↑ 18% from last week
          </Text>
        </View>
        <View className="flex-1 rounded-3xl bg-white p-5">
          <Text className="text-sm font-medium text-slate-500">
            Current streak
          </Text>
          <Text className="mt-3 text-3xl font-bold text-slate-900">7 days</Text>
          <Text className="mt-2 text-sm text-emerald-600">
            You&apos;re on a roll
          </Text>
        </View>
      </View>

      <View className="mb-5 rounded-3xl bg-white p-5">
        <View className="mb-5 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold text-slate-900">This week</Text>
            <Text className="mt-1 text-sm text-slate-500">Activity by day</Text>
          </View>
          <Text className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            12.5 hours
          </Text>
        </View>
        <View className="h-36 flex-row items-end justify-between px-1">
          {[
            { day: "M", height: "h-14" },
            { day: "T", height: "h-20" },
            { day: "W", height: "h-12" },
            { day: "T", height: "h-28" },
            { day: "F", height: "h-24" },
            { day: "S", height: "h-16" },
            { day: "S", height: "h-10" },
          ].map((item, index) => (
            <View key={`${item.day}-${index}`} className="items-center gap-2">
              <View
                className={`w-7 rounded-full ${index === 3 ? "bg-indigo-600" : "bg-indigo-100"} ${item.height}`}
              />
              <Text className="text-xs font-medium text-slate-400">
                {item.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mb-5 rounded-3xl bg-white p-5">
        <Text className="text-lg font-bold text-slate-900">Top focus</Text>
        <Text className="mt-1 text-sm text-slate-500">
          Where your time went
        </Text>
        <View className="mt-5 gap-4">
          {[
            {
              name: "Productivity",
              time: "5h 20m",
              width: "w-[78%]",
              color: "bg-violet-500",
            },
            {
              name: "Learning",
              time: "4h 10m",
              width: "w-[61%]",
              color: "bg-sky-500",
            },
            {
              name: "Wellness",
              time: "3h 05m",
              width: "w-[44%]",
              color: "bg-emerald-500",
            },
          ].map((item) => (
            <View key={item.name}>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm font-medium text-slate-700">
                  {item.name}
                </Text>
                <Text className="text-sm text-slate-500">{item.time}</Text>
              </View>
              <View className="h-2 overflow-hidden rounded-full bg-slate-100">
                <View
                  className={`h-full rounded-full ${item.width} ${item.color}`}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
        <Text className="text-base font-bold text-indigo-950">
          A little insight
        </Text>
        <Text className="mt-2 leading-6 text-indigo-800">
          You were most active on Thursday. Keep building on that momentum with
          a small goal today.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Insights;
