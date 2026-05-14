import { Text, View } from "react-native";
import { Card } from "./Card";
import type { Transaction } from "@/types";
import { formatDateTime } from "@/utils/format";

interface TransactionListItemProps {
  transaction: Transaction;
}

export function TransactionListItem({ transaction }: TransactionListItemProps) {
  const isAdd = transaction.action === "ADD";

  return (
    <Card className="mb-3">
      <View className="flex-row items-center">
        <View
          className={`w-11 h-11 rounded-full items-center justify-center ${
            isAdd ? "bg-emerald-50" : "bg-red-50"
          }`}
        >
          <Text
            className={`text-lg font-bold ${
              isAdd ? "text-success" : "text-danger"
            }`}
          >
            {isAdd ? "+" : "−"}
          </Text>
        </View>

        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-ink-900">
            {transaction.productName}
          </Text>
          <Text className="text-xs text-ink-500 mt-0.5">
            SKU · {transaction.productSku}
          </Text>
        </View>

        <View className="items-end">
          <Text
            className={`text-base font-bold ${
              isAdd ? "text-success" : "text-danger"
            }`}
          >
            {isAdd ? "+" : "−"}
            {transaction.quantity}
          </Text>
          <Text className="text-xs text-ink-500 mt-0.5">
            {transaction.action}
          </Text>
        </View>
      </View>

      <View className="border-t border-ink-100 mt-3 pt-2">
        <Text className="text-xs text-ink-500">
          {formatDateTime(transaction.timestamp)}
        </Text>
      </View>
    </Card>
  );
}
