import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

interface AccountsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountsSliderNavigation({
  isBeginning,
  isEnd,
}: AccountsSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
        className="rounded-full p-3 transition-colors enabled:hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>

      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="rounded-full p-3 transition-colors enabled:hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

