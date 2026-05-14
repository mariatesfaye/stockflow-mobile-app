import { useEffect } from "react";
import { Text, View } from "react-native";

export type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onHide: () => void;
  durationMs?: number;
}

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: "bg-emerald-600",
  error: "bg-red-600",
  info: "bg-ink-900",
};

const VARIANT_ICON: Record<ToastVariant, string> = {
  success: "✓",
  error: "!",
  info: "i",
};

export function Toast({
  message,
  variant = "success",
  onHide,
  durationMs = 2500,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onHide, durationMs);
    return () => clearTimeout(timer);
  }, [onHide, durationMs, message, variant]);

  return (
    <View
      pointerEvents="none"
      className="absolute left-4 right-4 top-14 z-50"
    >
      <View
        className={`flex-row items-center rounded-xl px-4 py-3 ${VARIANT_CLASSES[variant]}`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center mr-3">
          <Text className="text-white text-sm font-bold">
            {VARIANT_ICON[variant]}
          </Text>
        </View>
        <Text className="text-white text-sm font-semibold flex-1">
          {message}
        </Text>
      </View>
    </View>
  );
}
