import { Pressable, Text, View } from "react-native";
import { TABS } from "@/constants";
import type { TabKey } from "@/types";

interface TabBarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <View className="flex-row border-t border-ink-100 bg-white px-2 pt-2 pb-6">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className="flex-1 items-center py-2 rounded-xl"
          >
            <Text
              className={`text-2xl ${isActive ? "" : "opacity-40"}`}
            >
              {tab.icon}
            </Text>
            <Text
              className={`text-xs mt-1 font-semibold ${
                isActive ? "text-brand-600" : "text-ink-500"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
