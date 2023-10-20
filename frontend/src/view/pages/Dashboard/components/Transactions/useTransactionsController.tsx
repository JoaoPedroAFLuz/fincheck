import { useState } from 'react';

import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  const { areValuesVisible } = useDashboard();

  return {
    transactions: [],
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}

