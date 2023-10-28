import { cn } from '@/app/utils/cn';
import { useSwiper } from 'swiper/react';

interface SliderOptionProps {
  option: string;
  index: number;
  isActive: boolean;
}

export function SliderOption({ option, index, isActive }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slideTo(index)}
      className={cn(
        'h-12 w-full rounded-full text-sm font-medium tracking-tight text-gray-700 transition-colors hover:bg-gray-50',
        isActive && 'bg-white text-gray-800 hover:bg-white',
      )}
    >
      {option}
    </button>
  );
}

