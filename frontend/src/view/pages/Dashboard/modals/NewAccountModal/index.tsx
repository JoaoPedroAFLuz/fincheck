import { Button } from '@/view/components/Button';
import { ColorsDropdownInput } from '@/view/components/ColorsDropdownInput';
import { Input } from '@/view/components/Input';
import { InputCurrency } from '@/view/components/InputCurrency';
import { Modal } from '@/view/components/Modal';
import { Select } from '@/view/components/Select';
import { Controller } from 'react-hook-form';
import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const {
    control,
    errors,
    isNewAccountModalOpen,
    isLoading,
    register,
    handleSubmit,
    handleCloseModal,
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={handleCloseModal}
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <div>
          <span className="text-lg tracking-tight text-gray-600">
            Saldo inicial
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-tight text-gray-600">R$</span>
            <Controller
              name="initialBalance"
              defaultValue="0"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  value={value}
                  onChange={onChange}
                  error={errors.initialBalance?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder="Nome"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                placeholder="Tipo"
                options={[
                  { value: 'CHECKING', label: 'Conta Corrente' },
                  { value: 'INVESTMENT', label: 'Investimento' },
                  { value: 'CASH', label: 'Dinheiro Físico' },
                ]}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            name="color"
            defaultValue=""
            control={control}
            render={({ field: { value, onChange } }) => (
              <ColorsDropdownInput
                value={value}
                onChange={onChange}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}

