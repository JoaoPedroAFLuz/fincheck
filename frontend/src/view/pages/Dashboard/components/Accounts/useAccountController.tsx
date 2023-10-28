import { useMemo, useState } from 'react';

import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useWindowWidth } from '@/app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const windowWidth = useWindowWidth();

  const isMobile = windowWidth < 768;

  const {
    areValuesVisible,
    isNewAccountModalOpen,
    toggleValueVisibility,
    openNewAccountModal,
    openEditAccountModal,
    closeNewAccountModal,
  } = useDashboard();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (acc, { currentBalance }) => acc + currentBalance,
      0,
    );
  }, [accounts]);

  return {
    accounts,
    currentBalance,
    sliderState,
    isMobile,
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

