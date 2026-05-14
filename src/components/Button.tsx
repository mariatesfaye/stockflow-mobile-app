import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: string;
}

const VARIANT_STYLES: Record<Variant, { bg: string; text: string; border?: string }> = {
  primary: { bg: "bg-brand-600 active:bg-brand-700", text: "text-white" },
  secondary: {
    bg: "bg-white active:bg-ink-100",
    text: "text-ink-900",
    border: "border border-ink-300",
  },
  danger: { bg: "bg-danger active:opacity-90", text: "text-white" },
  ghost: { bg: "bg-transparent active:bg-ink-100", text: "text-brand-600" },
};

const SIZE_STYLES: Record<Size, { padding: string; text: string }> = {
  sm: { padding: "px-3 py-2", text: "text-sm" },
  md: { padding: "px-4 py-3", text: "text-base" },
  lg: { padding: "px-5 py-4", text: "text-base" },
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = true,
  iconLeft,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={[
        "rounded-xl flex-row items-center justify-center",
        variantStyle.bg,
        variantStyle.border ?? "",
        sizeStyle.padding,
        fullWidth ? "w-full" : "self-start",
        isDisabled ? "opacity-50" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "secondary" || variant === "ghost" ? "#4F46E5" : "#FFFFFF"}
        />
      ) : (
        <View className="flex-row items-center">
          {iconLeft ? (
            <Text className={`mr-2 ${variantStyle.text} ${sizeStyle.text}`}>
              {iconLeft}
            </Text>
          ) : null}
          <Text
            className={`font-semibold ${variantStyle.text} ${sizeStyle.text}`}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
