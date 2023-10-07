import { Swiper, SwiperSlide } from 'swiper/react';

import { MONTHS } from '@/app/config/constants';
import { cn } from '@/app/utils/cn';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Spinner } from '@/view/components/Spinner';
import { FilterIcon } from '@/view/components/icons/FilterIcon';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { useTransactionsController } from './useTransactionsController';

import emptyState from '@/assets/empty-state.svg';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';

export function Transactions() {
  const { transactions, areValuesVisible, isInitialLoading, isLoading } =
    useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-2xl bg-gray-100 p-10">
      {isInitialLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-10 w-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper centeredSlides slidesPerView={3} spaceBetween={16}>
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        option={month}
                        index={index}
                        isActive={isActive}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <main className="mt-4 flex-1 space-y-2 overflow-y-auto text-clip">
            {isLoading && (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <Spinner className="h-10 w-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <img
                  src={emptyState}
                  alt="Mulher com uma lupa"
                  className="h-40 w-40"
                />

                <span className="text-gray-700">
                  Não encontramos nenhuma transação
                </span>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="expense" category="food" />

                    <div>
                      <strong className="font-bold tracking-tight text-gray-800">
                        Almoço
                      </strong>
                      <small className="block text-xs text-gray-600">
                        04/06/2023
                      </small>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'font-medium tracking-tight text-red-800',
                      !areValuesVisible && 'blur',
                    )}
                  >
                    {formatCurrency(-32.5)}
                  </span>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-bold tracking-tight text-gray-800">
                        Salário
                      </strong>
                      <small className="block text-xs text-gray-600">
                        01/06/2023
                      </small>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'font-medium tracking-tight text-green-800',
                      !areValuesVisible && 'blur',
                    )}
                  >
                    {formatCurrency(10000)}
                  </span>
                </div>
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}

