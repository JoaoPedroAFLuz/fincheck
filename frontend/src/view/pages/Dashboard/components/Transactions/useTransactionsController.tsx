import { useEffect, useMemo, useState } from 'react';

import { Transaction } from '@/app/entities/transactions';
import { useTransactions } from '@/app/hooks/useTransactions';
import { TransactionFilters } from '@/app/services/transactionsService/getAll';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<Transaction | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({
    monthIndex: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [transactionNameFilter, setTransactionNameFilter] = useState('');

  const { areValuesVisible } = useDashboard();

  const {
    transactions: transactionsData,
    isLoading,
    isInitialLoading,
    refetchTransactions,
  } = useTransactions(filters);

  const filteredTransactions: {
    transactions: Transaction[];
    balance: number;
  } = useMemo(() => {
    if (!transactionNameFilter) {
      const balance = calculateBalance(transactionsData);

      return { transactions: transactionsData, balance };
    }

    const lowerCaseFilter = transactionNameFilter.toLowerCase();

    const filteredTransactions = transactionsData.filter((transaction) =>
      transaction.name.toLowerCase().includes(lowerCaseFilter),
    );

    const balance = calculateBalance(filteredTransactions);

    return { transactions: filteredTransactions, balance };
  }, [transactionsData, transactionNameFilter]);

  function calculateBalance(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => {
      const value =
        transaction.type === 'INCOME' ? transaction.value : -transaction.value;

      return acc + value;
    }, 0);
  }

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) {
        return;
      }

      setFilters({
        ...filters,
        [filter]: value,
      });
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);

    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setTransactionBeingEdited(null);
    setIsEditModalOpen(false);
  }

  function handleTransactionNameFilter(value: string) {
    setTransactionNameFilter(value);
  }

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  return {
    filters,
    transactions: filteredTransactions.transactions,
    transactionBeingEdited,
    balance: filteredTransactions.balance,
    areValuesVisible,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    isEditModalOpen,
    handleTransactionNameFilter,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleChangeFilters,
    handleApplyFilters,
  };
}

