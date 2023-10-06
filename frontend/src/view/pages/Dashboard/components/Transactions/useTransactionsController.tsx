import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    transactions: [],
    areValuesVisible,
    isInitialLoading: false,
    isLoading: true,
  };
}

