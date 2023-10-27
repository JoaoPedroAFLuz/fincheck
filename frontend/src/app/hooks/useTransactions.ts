import { useQuery } from '@tanstack/react-query';

import { transactionService } from '../services/transactionsService';
import { TransactionFilters } from '../services/transactionsService/getAll';

export function useTransactions(filters: TransactionFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  };
}

