import { Controller } from 'react-hook-form';

import { Button } from '@/view/components/Button';
import { ColorsDropdownInput } from '@/view/components/ColorsDropdownInput';
import { ConfirmDeleteModal } from '@/view/components/ConfirmDeleteModal';
import { Input } from '@/view/components/Input';
import { InputCurrency } from '@/view/components/InputCurrency';
import { Modal } from '@/view/components/Modal';
import { Select } from '@/view/components/Select';
import { TrashIcon } from '@/view/components/icons/Trash';
import { useEditAccountModalController } from '../EditAccountModal/useEditAccountModalController';

export function EditAccountModal() {
  const {
    control,
    errors,
    isEditAccountModalOpen,
    isDeleteAccountModalOpen,
    isLoading,
    isLoadingDelete,
    register,
    handleSubmit,
    handleDeleteAccount,
    closeEditAccountModal,
    openDeleteAccountModal,
    closeDeleteAccountModal,
  } = useEditAccountModalController();

  if (isDeleteAccountModalOpen) {
    return (
      <ConfirmDeleteModal
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteAccount}
        onClose={closeDeleteAccountModal}
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button
          onClick={openDeleteAccountModal}
          className="flex h-12 w-12 items-center justify-center rounded-full outline-none transition-colors hover:bg-gray-50"
        >
          <TrashIcon className="h-6 w-6 text-red-900" />
        </button>
      }
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
          Salvar
        </Button>
      </form>
    </Modal>
  );
}

