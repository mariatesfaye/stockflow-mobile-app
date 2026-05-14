import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import type { FieldErrors, Product } from "@/types";
import { hasErrors, validateProductForm } from "@/utils/validation";

interface AddProductModalProps {
  visible: boolean;
  products: Product[];
  onClose: () => void;
  onAddProduct: (input: {
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }) => Promise<Product>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const INITIAL_VALUES = {
  sku: "",
  name: "",
  price: "",
  quantity: "",
};

export function AddProductModal({
  visible,
  products,
  onClose,
  onAddProduct,
  onSuccess,
  onError,
}: AddProductModalProps) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!visible) {
      setValues(INITIAL_VALUES);
      setErrors({});
      setSubmitting(false);
    }
  }, [visible]);

  const updateField = (field: keyof typeof INITIAL_VALUES, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const validation = validateProductForm(values, products);
    setErrors(validation);

    if (hasErrors(validation)) {
      onError("Please fix the errors below");
      return;
    }

    try {
      setSubmitting(true);
      await onAddProduct({
        sku: values.sku,
        name: values.name,
        price: Number(values.price),
        quantity: Number(values.quantity),
      });
      onSuccess("Product added successfully");
      onClose();
    } catch {
      onError("Could not add product. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="bg-white rounded-t-3xl pt-3 pb-8 max-h-[92%]">
            <View className="items-center pb-2">
              <View className="w-12 h-1.5 bg-ink-300 rounded-full" />
            </View>

            <View className="flex-row items-center justify-between px-5 pt-2 pb-4 border-b border-ink-100">
              <View>
                <Text className="text-xl font-bold text-ink-900">
                  New product
                </Text>
                <Text className="text-sm text-ink-500 mt-0.5">
                  Add an item to your inventory
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                className="w-9 h-9 rounded-full bg-ink-100 items-center justify-center"
              >
                <Text className="text-ink-700 text-lg">✕</Text>
              </Pressable>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              className="px-5 pt-4"
            >
              <Input
                label="SKU"
                placeholder="e.g. SKU-001"
                value={values.sku}
                onChangeText={(v) => updateField("sku", v)}
                autoCapitalize="characters"
                editable={!submitting}
                error={errors.sku}
                hint="Unique identifier across your inventory"
              />

              <Input
                label="Product name"
                placeholder="e.g. Wireless Mouse"
                value={values.name}
                onChangeText={(v) => updateField("name", v)}
                editable={!submitting}
                error={errors.name}
              />

              <Input
                label="Price"
                placeholder="0.00"
                value={values.price}
                onChangeText={(v) => updateField("price", v)}
                keyboardType="decimal-pad"
                editable={!submitting}
                error={errors.price}
              />

              <Input
                label="Initial quantity"
                placeholder="0"
                value={values.quantity}
                onChangeText={(v) => updateField("quantity", v)}
                keyboardType="number-pad"
                editable={!submitting}
                error={errors.quantity}
              />

              <View className="mt-2 mb-4">
                <Button
                  label="Add product"
                  onPress={handleSubmit}
                  loading={submitting}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
