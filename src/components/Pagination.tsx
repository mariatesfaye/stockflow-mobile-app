import { Pressable, Text, View } from "react-native";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <View className="flex-row items-center justify-between py-3">
      <Pressable
        onPress={onPrev}
        disabled={!canPrev}
        className={`px-4 py-2 rounded-lg border ${
          canPrev
            ? "bg-white border-ink-300 active:bg-ink-100"
            : "bg-ink-100 border-ink-100"
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            canPrev ? "text-ink-900" : "text-ink-500"
          }`}
        >
          ← Prev
        </Text>
      </Pressable>

      <Text className="text-sm text-ink-700 font-medium">
        Page {page} of {totalPages}
      </Text>

      <Pressable
        onPress={onNext}
        disabled={!canNext}
        className={`px-4 py-2 rounded-lg border ${
          canNext
            ? "bg-white border-ink-300 active:bg-ink-100"
            : "bg-ink-100 border-ink-100"
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            canNext ? "text-ink-900" : "text-ink-500"
          }`}
        >
          Next →
        </Text>
      </Pressable>
    </View>
  );
}
