import { Pressable, Text, View } from "react-native";
import { Card } from "./Card";
import type { Product } from "@/types";
import { formatPrice, formatRelativeTime } from "@/utils/format";

interface ProductCardProps {
  product: Product;
  onAdjust: (product: Product) => void;
}

function stockTone(quantity: number): { label: string; classes: string } {
  if (quantity === 0) {
    return { label: "Out of stock", classes: "bg-red-50 text-danger" };
  }
  if (quantity < 5) {
    return { label: "Low stock", classes: "bg-amber-50 text-warning" };
  }
  return { label: "In stock", classes: "bg-emerald-50 text-success" };
}

export function ProductCard({ product, onAdjust }: ProductCardProps) {
  const tone = stockTone(product.quantity);

  return (
    <Card className="mb-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-xs font-semibold text-brand-600 tracking-wider uppercase">
            SKU · {product.sku}
          </Text>
          <Text className="text-lg font-bold text-ink-900 mt-0.5">
            {product.name}
          </Text>
          <Text className="text-sm text-ink-500 mt-0.5">
            {formatPrice(product.price)}
          </Text>
        </View>

        <View className={`px-2.5 py-1 rounded-full ${tone.classes}`}>
          <Text className={`text-xs font-semibold ${tone.classes}`}>
            {tone.label}
          </Text>
        </View>
      </View>

      <View className="flex-row items-end justify-between mt-4">
        <View>
          <Text className="text-xs text-ink-500">Quantity</Text>
          <Text className="text-3xl font-bold text-ink-900 mt-0.5">
            {product.quantity}
          </Text>
          <Text className="text-xs text-ink-500 mt-1">
            Updated {formatRelativeTime(product.updatedAt)}
          </Text>
        </View>

        <Pressable
          onPress={() => onAdjust(product)}
          className="bg-brand-50 active:bg-brand-100 rounded-xl px-4 py-2.5"
        >
          <Text className="text-brand-600 font-semibold text-sm">
            Adjust stock
          </Text>
        </Pressable>
      </View>
    </Card>
  );
}
