import type { FieldErrors, Product } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isRequired = (value: string): boolean => value.trim().length > 0;

export const isValidEmail = (value: string): boolean =>
  EMAIL_REGEX.test(value.trim());

export interface UserFormValues {
  fullName: string;
  email: string;
}

export const validateUserForm = (values: UserFormValues): FieldErrors => {
  const errors: FieldErrors = {};

  if (!isRequired(values.fullName)) {
    errors.fullName = "Full name is required";
  }

  if (!isRequired(values.email)) {
    errors.email = "Email is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

export interface ProductFormValues {
  sku: string;
  name: string;
  price: string;
  quantity: string;
}

export const validateProductForm = (
  values: ProductFormValues,
  existingProducts: Product[]
): FieldErrors => {
  const errors: FieldErrors = {};

  if (!isRequired(values.sku)) {
    errors.sku = "SKU is required";
  } else if (
    existingProducts.some(
      (p) => p.sku.trim().toLowerCase() === values.sku.trim().toLowerCase()
    )
  ) {
    errors.sku = "SKU must be unique";
  }

  if (!isRequired(values.name)) {
    errors.name = "Product name is required";
  }

  const price = Number(values.price);
  if (!isRequired(values.price)) {
    errors.price = "Price is required";
  } else if (Number.isNaN(price)) {
    errors.price = "Price must be a number";
  } else if (price <= 0) {
    errors.price = "Price must be positive";
  }

  const quantity = Number(values.quantity);
  if (!isRequired(values.quantity)) {
    errors.quantity = "Quantity is required";
  } else if (!Number.isInteger(quantity)) {
    errors.quantity = "Quantity must be a whole number";
  } else if (quantity < 0) {
    errors.quantity = "Quantity cannot be negative";
  }

  return errors;
};

export const validateStockAdjustment = (
  amountInput: string,
  currentQuantity: number,
  action: "ADD" | "REMOVE"
): string | undefined => {
  if (!isRequired(amountInput)) return "Enter an amount";

  const amount = Number(amountInput);
  if (!Number.isInteger(amount)) return "Amount must be a whole number";
  if (amount <= 0) return "Amount must be greater than zero";

  if (action === "REMOVE" && amount > currentQuantity) {
    return `Cannot remove more than current stock (${currentQuantity})`;
  }

  return undefined;
};

export const hasErrors = (errors: FieldErrors): boolean =>
  Object.values(errors).some((error) => Boolean(error));
