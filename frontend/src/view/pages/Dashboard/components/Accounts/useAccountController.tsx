import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { useWindowWidth } from '@/app/hooks/useWindowWidth';
import { bankAccountsService } from '@/app/services/bankAccountsService';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();

  const {
    areValuesVisible,
    isNewAccountModalOpen,
    toggleValueVisibility,
    openNewAccountModal,
    openEditAccountModal,
    closeNewAccountModal,
  } = useDashboard();

  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.reduce((acc, { currentBalance }) => acc + currentBalance, 0);
  }, [data]);

  return {
    accounts: data,
    currentBalance,
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: isFetching,
    isNewAccountModalOpen,
    toggleValueVisibility,
    openNewAccountModal,
    openEditAccountModal,
    closeNewAccountModal,
    setSliderState,
  };
}

