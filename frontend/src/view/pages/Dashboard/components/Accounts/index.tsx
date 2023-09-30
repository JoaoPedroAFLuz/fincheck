import { useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from '@/app/utils/cn';
import { EyeIcon } from '@/view/components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { useAccountController } from './useAccountController';

export function Accounts() {
  const [showBalance, setShowBalance] = useState(false);

  const { sliderState, windowWidth, setSliderState } = useAccountController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-teal-900 px-4 py-8 text-white md:p-10">
      <div>
        <span className="tracking-[-0.5px]">Saldo Total</span>
        <div className="flex flex-row items-center gap-2">
          <strong className={cn('text-2xl', showBalance && 'blur')}>
            R$ 100,00
          </strong>

          <button
            type="button"
            onClick={() => setShowBalance(!showBalance)}
            className="flex h-8 w-8 items-center justify-center"
          >
            <EyeIcon open={!showBalance} />
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-1 flex-col justify-end md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth >= 500 ? 2.15 : 1.15}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              });
            }}
          >
            <div
              slot="container-start"
              className="mb-4 flex h-12 w-full items-center justify-between"
            >
              <strong className="text-lg font-bold tracking-[-1px]">
                Minhas Contas
              </strong>

              <AccountsSliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <SwiperSlide>
              <AccountCard
                name="Nubank"
                type="CHECKING"
                balance={123.45}
                color="#7950f2"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="Neon"
                type="CHECKING"
                balance={120}
                color="blue"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="Carteira"
                type="CASH"
                balance={20}
                color="red"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

