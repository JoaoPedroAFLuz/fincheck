import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from '@/app/utils/cn';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Spinner } from '@/view/components/Spinner';
import { EyeIcon } from '@/view/components/icons/EyeIcon';
import { PlusIcon } from '@radix-ui/react-icons';
import { AccountCard } from './AccountCard';
import { SliderNavigation } from './SliderNavigation';
import { useAccountController } from './useAccountController';

export function Accounts() {
  const {
    accounts,
    currentBalance,
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading,
    toggleValueVisibility,
    openNewAccountModal,
    setSliderState,
  } = useAccountController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-teal-900 px-4 py-8 text-white md:p-10">
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-10 w-10 fill-white text-teal-950/50" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-tight">Saldo Total</span>
            <div className="flex flex-row items-center gap-2">
              <strong className={cn('text-2xl', !areValuesVisible && 'blur')}>
                {formatCurrency(currentBalance)}
              </strong>

              <button
                type="button"
                onClick={toggleValueVisibility}
                className="flex h-8 w-8 items-center justify-center"
              >
                <EyeIcon open={areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-1 flex-col justify-end md:mt-0">
            {accounts.length === 0 && (
              <div className="mb-4">
                <strong className="flex flex-col text-lg font-bold tracking-tighter">
                  Minhas Contas
                </strong>

                <button
                  onClick={openNewAccountModal}
                  className="mt-4 flex h-52 w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-teal-600"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-white">
                    <PlusIcon className="h-6 w-6" />
                  </div>

                  <span className="block w-32 text-center font-medium tracking-tight">
                    Cadastre uma nova conta
                  </span>
                </button>
              </div>
            )}

            {accounts.length > 0 && (
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
                    <strong className="text-lg font-bold tracking-tighter">
                      Minhas Contas
                    </strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard account={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

