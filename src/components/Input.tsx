import { Text, TextInput, View, type TextInputProps } from "react-native";
import { COLORS } from "@/constants/theme";

interface InputProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, ...rest }: InputProps) {
  const hasError = Boolean(error);

  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-ink-700 mb-1.5">
        {label}
      </Text>

      <TextInput
        className={`bg-white border rounded-xl px-4 py-3 text-base text-ink-900 ${
          hasError ? "border-danger" : "border-ink-300"
        }`}
        placeholderTextColor={COLORS.ink500}
        {...rest}
      />

      {hasError ? (
        <Text className="text-xs text-danger mt-1.5">{error}</Text>
      ) : hint ? (
        <Text className="text-xs text-ink-500 mt-1.5">{hint}</Text>
      ) : null}
    </View>
  );
}
