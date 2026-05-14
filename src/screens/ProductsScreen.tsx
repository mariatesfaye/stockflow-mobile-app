import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Toast, type ToastVariant } from "@/components/Toast";
import type { ActionType, Product } from "@/types";
import { AddProductModal } from "./AddProductModal";
import { AdjustStockModal } from "./AdjustStockModal";

interface ProductsScreenProps {
  products: Product[];
  onAddProduct: (input: {
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }) => Promise<Product>;
  onAdjustStock: (
    productId: string,
    action: ActionType,
    amount: number
  ) => Promise<void>;
}

export function ProductsScreen({
  products,
  onAddProduct,
  onAdjustStock,
}: ProductsScreenProps) {
  const [adjustTarget, setAdjustTarget] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    variant: ToastVariant;
  } | null>(null);

  // Simulate an initial loading state to mimic data fetch
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const totalItems = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

  const showSuccess = (message: string) =>
    setToast({ message, variant: "success" });
  const showError = (message: string) =>
    setToast({ message, variant: "error" });

  return (
    <View className="flex-1 bg-ink-100">
      {toast ? (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onHide={() => setToast(null)}
        />
      ) : null}

      <ScreenHeader
        title="Inventory"
        subtitle={
          totalItems === 0
            ? "Add your first product to start"
            : `${totalItems} ${totalItems === 1 ? "product" : "products"} · ${totalStock} in stock`
        }
        right={
          <Pressable
            onPress={() => setShowAddModal(true)}
            className="bg-brand-600 active:bg-brand-700 rounded-xl px-4 py-2.5"
          >
            <Text className="text-white font-semibold text-sm">+ Add</Text>
          </Pressable>
        }
      />

      {initialLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="text-sm text-ink-500 mt-3">Loading inventory…</Text>
        </View>
      ) : totalItems === 0 ? (
        <EmptyState
          icon="📦"
          title="No products yet"
          description="Tap “Add” above to register your first product and start tracking stock levels."
          actionLabel="Add product"
          onAction={() => setShowAddModal(true)}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <ProductCard product={item} onAdjust={setAdjustTarget} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <AddProductModal
        visible={showAddModal}
        products={products}
        onClose={() => setShowAddModal(false)}
        onAddProduct={onAddProduct}
        onSuccess={showSuccess}
        onError={showError}
      />

      <AdjustStockModal
        product={adjustTarget}
        products={products}
        onClose={() => setAdjustTarget(null)}
        onAdjustStock={onAdjustStock}
        onSuccess={showSuccess}
        onError={showError}
      />
    </View>
  );
}
