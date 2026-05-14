import { Alert, ScrollView, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ScreenHeader } from "@/components/ScreenHeader";
import type { User } from "@/types";
import { formatDateTime } from "@/utils/format";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

interface ProfileScreenProps {
  user: User;
  productCount: number;
  transactionCount: number;
  onReset: () => void;
}

export function ProfileScreen({
  user,
  productCount,
  transactionCount,
  onReset,
}: ProfileScreenProps) {
  const handleReset = () => {
    Alert.alert(
      "Reset all data?",
      "This will log out and clear all products and transactions. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: onReset,
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-ink-100">
      <ScreenHeader title="Profile" subtitle="Account & app info" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        <Card className="mb-4">
          <View className="flex-row items-center">
            <View className="w-14 h-14 rounded-full bg-brand-600 items-center justify-center">
              <Text className="text-white text-xl font-bold">
                {getInitials(user.fullName)}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-ink-900">
                {user.fullName}
              </Text>
              <Text className="text-sm text-ink-500 mt-0.5">{user.email}</Text>
            </View>
          </View>

          <View className="border-t border-ink-100 mt-4 pt-3">
            <Text className="text-xs text-ink-500">Registered</Text>
            <Text className="text-sm text-ink-700 mt-0.5">
              {formatDateTime(user.registeredAt)}
            </Text>
          </View>
        </Card>

        <View className="flex-row mb-4">
          <Card className="flex-1 mr-2">
            <Text className="text-xs text-ink-500">Products</Text>
            <Text className="text-2xl font-bold text-ink-900 mt-1">
              {productCount}
            </Text>
          </Card>
          <Card className="flex-1 ml-2">
            <Text className="text-xs text-ink-500">Transactions</Text>
            <Text className="text-2xl font-bold text-ink-900 mt-1">
              {transactionCount}
            </Text>
          </Card>
        </View>

        <Card className="mb-4">
          <Text className="text-base font-bold text-ink-900 mb-1">
            About StockFlow
          </Text>
          <Text className="text-sm text-ink-500">
            A lightweight inventory tracker built with Expo, React Native, and
            NativeWind. Data lives in-memory only for this assignment.
          </Text>
        </Card>

        <Button
          label="Reset all data"
          onPress={handleReset}
          variant="danger"
        />
      </ScrollView>
    </View>
  );
}
