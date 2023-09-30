import { useWindowWidth } from '@/app/hooks/useWindowWidth';
import { useState } from 'react';

export function useAccountController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();

  return { sliderState, windowWidth, setSliderState };
}

