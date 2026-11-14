import { useTaskStore } from "@/store/useTaskStore";
import { ScrollView, Text, View } from "react-native";

const Insights = () => {
  const { tasks } = useTaskStore();

  const completedCount = tasks.filter(
    (task) => task.completed === true || task.status === "done",
  ).length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const weekStart = new Date();
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));

  const weeklyActivity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);

    return {
      day: date.toLocaleDateString("en", { weekday: "short" }).slice(0, 1),
      count: 0,
    };
  });

  tasks.forEach((task) => {
    const taskData = task as unknown as Record<string, unknown>;
    const dateValue =
      taskData.createdAt ??
      taskData.created_at ??
      taskData.completedAt ??
      taskData.date;

    if (dateValue == null) return;

    const taskDate = new Date(String(dateValue));
    if (Number.isNaN(taskDate.getTime())) return;

    taskDate.setHours(0, 0, 0, 0);
    const dayIndex = Math.round(
      (taskDate.getTime() - weekStart.getTime()) / 86400000,
    );

    if (dayIndex >= 0 && dayIndex < weeklyActivity.length) {
      weeklyActivity[dayIndex].count += 1;
    }
  });

  const maxDailyTasks = Math.max(
    1,
    ...weeklyActivity.map(({ count }) => count),
  );
  const thisWeekTaskCount = weeklyActivity.reduce(
    (total, { count }) => total + count,
    0,
  );
  const busiestDay = weeklyActivity.reduce(
    (busiest, day) => (day.count > busiest.count ? day : busiest),
    weeklyActivity[0],
  );

  const busiestDayLabel =
    busiestDay.day === "M"
      ? "Monday"
      : busiestDay.day === "T"
        ? "Tuesday"
        : busiestDay.day === "W"
          ? "Wednesday"
          : busiestDay.day === "T"
            ? "Thursday"
            : busiestDay.day === "F"
              ? "Friday"
              : busiestDay.day === "S"
                ? "Saturday"
                : "Sunday";

  return (
    <ScrollView
      className="flex-1 bg-slate-900"
      contentContainerClassName="px-4 pb-10 pt-12"
    >
      <Text className="text-2xl font-bold text-slate-200">Insights</Text>
      <Text className="mt-1 text-sm text-slate-500">
        Your weekly progress at a glance.
      </Text>

      <View className="mt-6 flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-slate-200 bg-white p-4">
          <Text className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
            Done
          </Text>
          <Text className="mt-2 text-3xl font-bold text-slate-900">
            {completedCount}
          </Text>
          <Text className="mt-1 text-xs text-slate-500">
            of {tasks.length} tasks
          </Text>
        </View>

        <View className="flex-1 rounded-2xl bg-slate-900 p-4">
          <Text className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-300">
            Rate
          </Text>
          <Text className="mt-2 text-3xl font-bold text-white">
            {completionRate}%
          </Text>
          <Text className="mt-1 text-xs text-slate-300">Completed</Text>
        </View>
      </View>

      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-slate-900">
            This week
          </Text>
          <Text className="text-xs text-slate-500">
            {thisWeekTaskCount} tasks
          </Text>
        </View>

        <View className="h-28 flex-row items-end justify-between">
          {weeklyActivity.map((item, index) => (
            <View key={`${item.day}-${index}`} className="items-center">
              <View className="h-20 w-8 items-center justify-end">
                <View
                  className={`w-7 rounded-full ${
                    item.count > 0 ? "bg-slate-900" : "bg-slate-200"
                  }`}
                  style={{
                    height: Math.max(10, (item.count / maxDailyTasks) * 72),
                  }}
                />
              </View>
              <Text className="mt-2 text-[10px] font-medium text-slate-500">
                {item.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <Text className="text-base font-semibold text-slate-900">Summary</Text>

        {thisWeekTaskCount === 0 ? (
          <Text className="mt-3 text-sm leading-6 text-slate-600">
            No tasks this week yet. Add one to start tracking your progress.
          </Text>
        ) : (
          <Text className="mt-3 text-sm leading-6 text-slate-600">
            You created {thisWeekTaskCount} tasks this week and were busiest on{" "}
            {busiestDayLabel}. You completed {completedCount} of {tasks.length}{" "}
            tasks overall.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Insights;
