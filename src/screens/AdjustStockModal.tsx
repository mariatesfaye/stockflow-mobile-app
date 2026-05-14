import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import type { ActionType, Product } from "@/types";
import { validateStockAdjustment } from "@/utils/validation";

interface AdjustStockModalProps {
  product: Product | null;
  products: Product[];
  onClose: () => void;
  onAdjustStock: (
    productId: string,
    action: ActionType,
    amount: number
  ) => Promise<void>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function AdjustStockModal({
  product,
  products,
  onClose,
  onAdjustStock,
  onSuccess,
  onError,
}: AdjustStockModalProps) {
  const [action, setAction] = useState<ActionType>("ADD");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setAction("ADD");
      setAmount("");
      setError(undefined);
      setSubmitting(false);
    }
  }, [product?.id]);

  if (!product) return null;

  // Always read the latest snapshot so quantity reflects recent changes.
  const liveProduct = products.find((p) => p.id === product.id) ?? product;

  const handleSubmit = async () => {
    const validationError = validateStockAdjustment(
      amount,
      liveProduct.quantity,
      action
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      await onAdjustStock(liveProduct.id, action, Number(amount));
      onSuccess(
        action === "ADD"
          ? `Added ${amount} to ${liveProduct.name}`
          : `Removed ${amount} from ${liveProduct.name}`
      );
      onClose();
    } catch {
      onError("Could not update stock");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={Boolean(product)}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="bg-white rounded-t-3xl pt-3 pb-8">
            <View className="items-center pb-2">
              <View className="w-12 h-1.5 bg-ink-300 rounded-full" />
            </View>

            <View className="flex-row items-center justify-between px-5 pt-2 pb-4 border-b border-ink-100">
              <View className="flex-1 pr-3">
                <Text className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                  SKU · {liveProduct.sku}
                </Text>
                <Text className="text-xl font-bold text-ink-900 mt-0.5">
                  {liveProduct.name}
                </Text>
                <Text className="text-sm text-ink-500 mt-0.5">
                  Current stock: {liveProduct.quantity}
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                className="w-9 h-9 rounded-full bg-ink-100 items-center justify-center"
              >
                <Text className="text-ink-700 text-lg">✕</Text>
              </Pressable>
            </View>

            <View className="px-5 pt-4">
              <Text className="text-sm font-semibold text-ink-700 mb-2">
                Action
              </Text>

              <View className="flex-row bg-ink-100 rounded-xl p-1 mb-4">
                <Pressable
                  onPress={() => setAction("ADD")}
                  className={`flex-1 py-2.5 rounded-lg items-center ${
                    action === "ADD" ? "bg-white" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      action === "ADD" ? "text-success" : "text-ink-500"
                    }`}
                  >
                    + Add stock
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setAction("REMOVE")}
                  className={`flex-1 py-2.5 rounded-lg items-center ${
                    action === "REMOVE" ? "bg-white" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      action === "REMOVE" ? "text-danger" : "text-ink-500"
                    }`}
                  >
                    − Remove stock
                  </Text>
                </Pressable>
              </View>

              <Input
                label="Amount"
                placeholder="0"
                value={amount}
                onChangeText={(v) => {
                  setAmount(v);
                  if (error) setError(undefined);
                }}
                keyboardType="number-pad"
                editable={!submitting}
                error={error}
              />

              <View className="bg-ink-100 rounded-xl p-3 mb-4">
                <Text className="text-xs text-ink-500">After this change</Text>
                <Text className="text-lg font-bold text-ink-900 mt-0.5">
                  {amount && !Number.isNaN(Number(amount))
                    ? action === "ADD"
                      ? liveProduct.quantity + Number(amount)
                      : Math.max(0, liveProduct.quantity - Number(amount))
                    : liveProduct.quantity}
                </Text>
              </View>

              <Button
                label={action === "ADD" ? "Add stock" : "Remove stock"}
                onPress={handleSubmit}
                loading={submitting}
                variant={action === "ADD" ? "primary" : "danger"}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
