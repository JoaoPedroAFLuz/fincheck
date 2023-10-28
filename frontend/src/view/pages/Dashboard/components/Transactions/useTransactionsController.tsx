import { useEffect, useState } from 'react';

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
  const [balance, setBalance] = useState(0);

  const { areValuesVisible } = useDashboard();

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    const balance = transactions.reduce((acc, transaction) => {
      const value =
        transaction.type === 'INCOME' ? transaction.value : -transaction.value;

      return acc + value;
    }, 0);

    setBalance(balance);
  }, [transactions]);

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

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  return {
    filters,
    transactions,
    transactionBeingEdited,
    balance,
    areValuesVisible,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    isEditModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleChangeFilters,
    handleApplyFilters,
  };
}

