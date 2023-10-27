import { Controller } from 'react-hook-form';

import { Transaction } from '@/app/entities/transactions';
import { Button } from '@/view/components/Button';
import { DatePickerInput } from '@/view/components/DatePickerInput';
import { Input } from '@/view/components/Input';
import { InputCurrency } from '@/view/components/InputCurrency';
import { Modal } from '@/view/components/Modal';
import { Select } from '@/view/components/Select';
import { useEditTransactionModalController } from './useEditTransactionModalController';

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose(): void;
}

export function EditTransactionModal({
  transaction,
  open,
  onClose,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    accounts,
    categories,
    isLoading,
    register,
    handleSubmit,
  } = useEditTransactionModalController({
    transaction,
    onClose,
  });

  const isExpense = transaction?.type === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <div>
          <span className="text-lg tracking-tight text-gray-600">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-tight text-gray-600">R$</span>

            <Controller
              name="value"
              defaultValue="0"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  value={value}
                  error={errors.value?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                placeholder="Categoria"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                error={errors.categoryId?.message}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="bankAccountId"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
                error={errors.bankAccountId?.message}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                error={errors.date?.message}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-6">
          Salvar
        </Button>
      </form>
    </Modal>
  );
}

