import { Text, View } from "react-native";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = "📭",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-12 px-6">
      <View className="w-20 h-20 rounded-full bg-ink-100 items-center justify-center mb-4">
        <Text className="text-4xl">{icon}</Text>
      </View>
      <Text className="text-lg font-bold text-ink-900 text-center">
        {title}
      </Text>
      {description ? (
        <Text className="text-sm text-ink-500 text-center mt-2 max-w-xs">
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <View className="mt-5">
          <Button
            label={actionLabel}
            onPress={onAction}
            fullWidth={false}
            size="sm"
          />
        </View>
      ) : null}
    </View>
  );
}
