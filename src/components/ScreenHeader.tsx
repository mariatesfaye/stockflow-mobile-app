import type { ReactNode } from "react";
import { Text, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
      <View className="flex-1 pr-3">
        <Text className="text-2xl font-bold text-ink-900">{title}</Text>
        {subtitle ? (
          <Text className="text-sm text-ink-500 mt-1">{subtitle}</Text>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}
