import { useState } from 'react';

import { useWindowWidth } from '@/app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { areValuesVisible, toggleValueVisibility } = useDashboard();

  const windowWidth = useWindowWidth();

  return {
    accounts: [],
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: false,
    toggleValueVisibility,
    setSliderState,
  };
}

