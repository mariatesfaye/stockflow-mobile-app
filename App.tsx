import "./global.css";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

import { TabBar } from "@/components/TabBar";
import { SIMULATED_DELAY_MS } from "@/constants";
import { HistoryScreen } from "@/screens/HistoryScreen";
import { ProductsScreen } from "@/screens/ProductsScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { RegisterUserScreen } from "@/screens/RegisterUserScreen";
import {
  INITIAL_APP_DATA,
  type ActionType,
  type AppData,
  type Product,
  type TabKey,
  type Transaction,
  type User,
} from "@/types";
import { delay } from "@/utils/delay";
import { generateId } from "@/utils/format";

export default function App() {
  const [data, setData] = useState<AppData>(INITIAL_APP_DATA);

  const registerUser = async (input: {
    fullName: string;
    email: string;
  }): Promise<void> => {
    await delay(SIMULATED_DELAY_MS);
    setData((prev) => ({
      ...prev,
      user: {
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        registeredAt: Date.now(),
      },
    }));
  };

  const resetUser = () => setData(INITIAL_APP_DATA);

  const addProduct = async (input: {
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }): Promise<Product> => {
    await delay(SIMULATED_DELAY_MS);

    const now = Date.now();
    const product: Product = {
      id: generateId(),
      sku: input.sku.trim(),
      name: input.name.trim(),
      price: input.price,
      quantity: input.quantity,
      createdAt: now,
      updatedAt: now,
    };

    setData((prev) => ({
      ...prev,
      products: [product, ...prev.products],
      transactions:
        input.quantity > 0
          ? [
              {
                id: generateId(),
                productId: product.id,
                productSku: product.sku,
                productName: product.name,
                action: "ADD",
                quantity: input.quantity,
                timestamp: now,
              },
              ...prev.transactions,
            ]
          : prev.transactions,
    }));

    return product;
  };

  const adjustStock = async (
    productId: string,
    action: ActionType,
    amount: number
  ): Promise<void> => {
    await delay(SIMULATED_DELAY_MS);

    setData((prev) => {
      const current = prev.products.find((p) => p.id === productId);
      if (!current) return prev;

      const delta = action === "ADD" ? amount : -amount;
      const nextQuantity = current.quantity + delta;
      if (nextQuantity < 0) return prev;

      const now = Date.now();
      const updated: Product = {
        ...current,
        quantity: nextQuantity,
        updatedAt: now,
      };

      const tx: Transaction = {
        id: generateId(),
        productId: updated.id,
        productSku: updated.sku,
        productName: updated.name,
        action,
        quantity: amount,
        timestamp: now,
      };

      return {
        ...prev,
        products: prev.products.map((p) =>
          p.id === productId ? updated : p
        ),
        transactions: [tx, ...prev.transactions],
      };
    });
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {!data.user ? (
        <SafeAreaView className="flex-1 bg-ink-100" edges={["top", "bottom"]}>
          <RegisterUserScreen onRegister={registerUser} />
        </SafeAreaView>
      ) : (
        <MainTabs
          user={data.user}
          products={data.products}
          transactions={data.transactions}
          onReset={resetUser}
          onAddProduct={addProduct}
          onAdjustStock={adjustStock}
        />
      )}
    </SafeAreaProvider>
  );
}

interface MainTabsProps {
  user: User;
  products: Product[];
  transactions: Transaction[];
  onReset: () => void;
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

function MainTabs({
  user,
  products,
  transactions,
  onReset,
  onAddProduct,
  onAdjustStock,
}: MainTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("products");

  return (
    <SafeAreaView className="flex-1 bg-ink-100" edges={["top"]}>
      <View className="flex-1">
        {activeTab === "products" ? (
          <ProductsScreen
            products={products}
            onAddProduct={onAddProduct}
            onAdjustStock={onAdjustStock}
          />
        ) : null}
        {activeTab === "history" ? (
          <HistoryScreen transactions={transactions} />
        ) : null}
        {activeTab === "profile" ? (
          <ProfileScreen
            user={user}
            productCount={products.length}
            transactionCount={transactions.length}
            onReset={onReset}
          />
        ) : null}
      </View>
      <TabBar active={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}
