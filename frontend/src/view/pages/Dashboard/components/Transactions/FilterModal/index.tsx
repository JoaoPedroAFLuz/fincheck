import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { TransactionType } from '@/app/entities/transactions';
import { cn } from '@/app/utils/cn';
import { Button } from '@/view/components/Button';
import { Modal } from '@/view/components/Modal';
import { Select } from '@/view/components/Select';
import { useFiltersModalController } from './useFiltersModalController';

interface FilterModalProps {
  open: boolean;
  transactionType?: TransactionType;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    categoryId: string | undefined;
    year: number;
  }): void;
  onClose(): void;
}

export function FilterModal({
  open,
  transactionType,
  onApplyFilters,
  onClose,
}: FilterModalProps) {
  const {
    accounts,
    selectedBankAccountId,
    categories,
    selectedCategoryId,
    selectedYear,
    handleSelectBankAccount,
    handleSelectCategory,
    handleChangeYear,
  } = useFiltersModalController(transactionType);

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-lg font-bold tracking-tighter text-gray-800">
            Conta
          </h1>

          <div className="mt-2 flex flex-col space-y-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSelectBankAccount(account.id)}
                className={cn(
                  'w-full rounded-2xl p-2 text-left text-gray-800 transition-colors hover:bg-gray-50',
                  selectedBankAccountId === account.id && '!bg-gray-200',
                )}
              >
                {account.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-lg font-bold tracking-tighter text-gray-800">
            Categoria
          </h1>

          <div className="mt-2 flex flex-col space-y-2">
            <Select
              value={selectedCategoryId}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              onChange={(categoryId) => handleSelectCategory(categoryId)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-lg font-bold tracking-tighter text-gray-800">
            Ano
          </h1>

          <div className="flex h-12 w-52 items-center justify-between text-gray-800">
            <button onClick={() => handleChangeYear(-1)} className="p-3">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <span className="px-8 font-medium tracking-tight">
              {selectedYear}
            </span>

            <button onClick={() => handleChangeYear(1)} className="p-3">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <Button
          onClick={() =>
            onApplyFilters({
              bankAccountId: selectedBankAccountId,
              categoryId:
                selectedCategoryId === 'all' ? undefined : selectedCategoryId,
              year: selectedYear,
            })
          }
        >
          Aplicar Filtros
        </Button>
      </div>
    </Modal>
  );
}

