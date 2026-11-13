import { ScrollView, Text, View } from "react-native";

const board = () => {
  return (
    <ScrollView className="flex-1 bg-slate-950" contentContainerClassName="px-5 pb-10 pt-14">
      <View className="mb-8 flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-medium text-slate-400">MONDAY, MAY 20</Text>
          <Text className="mt-1 text-3xl font-bold text-white">Your board</Text>
        </View>
        <View className="h-12 w-12 items-center justify-center rounded-full bg-indigo-500">
          <Text className="text-lg font-bold text-white">A</Text>
        </View>
      </View>

      <View className="mb-7 rounded-3xl bg-indigo-600 p-5">
        <Text className="text-sm font-medium text-indigo-100">WEEKLY PROGRESS</Text>
        <View className="mt-3 flex-row items-end justify-between">
          <Text className="text-3xl font-bold text-white">12<Text className="text-lg font-medium text-indigo-200"> / 18 tasks</Text></Text>
          <Text className="text-sm font-semibold text-indigo-100">67%</Text>
        </View>
        <View className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-400">
          <View className="h-full w-2/3 rounded-full bg-white" />
        </View>
      </View>

      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Today</Text>
        <Text className="text-sm font-semibold text-indigo-300">3 tasks</Text>
      </View>

      <View className="gap-3">
        <View className="flex-row items-center rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <View className="mr-4 h-6 w-6 rounded-full border-2 border-emerald-400" />
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">Review project brief</Text>
            <Text className="mt-1 text-sm text-slate-400">DESIGN · 9:00 AM</Text>
          </View>
          <View className="rounded-full bg-emerald-400/15 px-3 py-1"><Text className="text-xs font-semibold text-emerald-300">Done</Text></View>
        </View>

        <View className="flex-row items-center rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <View className="mr-4 h-6 w-6 rounded-full border-2 border-indigo-400" />
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">Prepare sprint planning</Text>
            <Text className="mt-1 text-sm text-slate-400">WORK · 11:30 AM</Text>
          </View>
          <View className="rounded-full bg-indigo-400/15 px-3 py-1"><Text className="text-xs font-semibold text-indigo-300">In progress</Text></View>
        </View>

        <View className="flex-row items-center rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <View className="mr-4 h-6 w-6 rounded-full border-2 border-slate-600" />
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">Update dashboard</Text>
            <Text className="mt-1 text-sm text-slate-400">PERSONAL · 2:00 PM</Text>
          </View>
          <View className="rounded-full bg-slate-800 px-3 py-1"><Text className="text-xs font-semibold text-slate-300">Upcoming</Text></View>
        </View>
      </View>

      <View className="mb-4 mt-9 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Projects</Text>
        <Text className="text-sm font-semibold text-indigo-300">View all</Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <View className="mb-4 h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15"><Text className="text-lg">✦</Text></View>
          <Text className="text-base font-semibold text-white">Website refresh</Text>
          <Text className="mt-1 text-sm text-slate-400">8 of 12 tasks</Text>
          <View className="mt-4 h-1.5 rounded-full bg-slate-700"><View className="h-full w-2/3 rounded-full bg-amber-400" /></View>
        </View>
        <View className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <View className="mb-4 h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15"><Text className="text-lg">◈</Text></View>
          <Text className="text-base font-semibold text-white">Mobile app</Text>
          <Text className="mt-1 text-sm text-slate-400">4 of 10 tasks</Text>
          <View className="mt-4 h-1.5 rounded-full bg-slate-700"><View className="h-full w-2/5 rounded-full bg-sky-400" /></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default board;
