import { View, type ViewProps } from "react-native";

interface CardProps extends ViewProps {
  padded?: boolean;
}

export function Card({
  children,
  padded = true,
  className = "",
  ...rest
}: CardProps) {
  return (
    <View
      className={`bg-white rounded-2xl border border-ink-100 shadow-sm ${
        padded ? "p-4" : ""
      } ${className}`}
      style={{
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
      {...rest}
    >
      {children}
    </View>
  );
}
