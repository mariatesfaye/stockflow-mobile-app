export interface User {
  fullName: string;
  email: string;
  registeredAt: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: number;
  updatedAt: number;
}

export type ActionType = "ADD" | "REMOVE";

export interface Transaction {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  action: ActionType;
  quantity: number;
  timestamp: number;
}

export interface FieldErrors {
  [field: string]: string | undefined;
}

export type TabKey = "products" | "history" | "profile";

/** All assignment state in one shape — updated with functional `setState` for safe async mutations. */
export interface AppData {
  user: User | null;
  products: Product[];
  transactions: Transaction[];
}

export const INITIAL_APP_DATA: AppData = {
  user: null,
  products: [],
  transactions: [],
};
