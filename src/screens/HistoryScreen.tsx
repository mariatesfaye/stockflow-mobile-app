import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Pagination } from "@/components/Pagination";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TransactionListItem } from "@/components/TransactionListItem";
import { PAGE_SIZE } from "@/constants";
import type { Transaction } from "@/types";

interface HistoryScreenProps {
  transactions: Transaction[];
}

export function HistoryScreen({ transactions }: HistoryScreenProps) {
  const [page, setPage] = useState(1);
  const totalItems = transactions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleTransactions = transactions.slice(
    startIndex,
    Math.min(startIndex + PAGE_SIZE, totalItems)
  );

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <View className="flex-1 bg-ink-100">
      <ScreenHeader
        title="Transaction history"
        subtitle={
          transactions.length === 0
            ? "Stock changes will appear here"
            : `${transactions.length} total · ${PAGE_SIZE} per page`
        }
      />

      {transactions.length === 0 ? (
        <EmptyState
          icon="🧾"
          title="No transactions yet"
          description="Once you add or remove stock, every change will be logged here."
        />
      ) : (
        <FlatList
          data={visibleTransactions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
          renderItem={({ item }) => <TransactionListItem transaction={item} />}
          ListFooterComponent={
            totalPages > 1 ? (
              <View className="px-1">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPrev={prevPage}
                  onNext={nextPage}
                />
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
