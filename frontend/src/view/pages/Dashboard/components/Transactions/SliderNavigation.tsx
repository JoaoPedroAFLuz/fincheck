import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        type="button"
        onClick={() => swiper.slidePrev()}
        className="absolute left-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 bg-gradient-to-r from-gray-100 to-transparent"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>

      <button
        type="button"
        onClick={() => swiper.slideNext()}
        className="absolute right-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 bg-gradient-to-l from-gray-100 to-transparent"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>
    </>
  );
}
