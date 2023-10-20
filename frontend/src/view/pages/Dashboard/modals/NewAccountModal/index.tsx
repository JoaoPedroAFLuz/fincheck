import { ColorsDropdownInput } from '@/view/components/ColorsDropdownInput';
import { Input } from '@/view/components/Input';
import { InputCurrency } from '@/view/components/InputCurrency';
import { Modal } from '@/view/components/Modal';
import { Select } from '@/view/components/Select';
import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form className="w-full">
        <div>
          <span className="text-lg tracking-tight text-gray-600">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-tight text-gray-600">R$</span>

            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input type="text" name="accountName" placeholder="Nome da Conta" />

          <Select
            options={[
              { value: 'CHECKING', label: 'Conta Corrente' },
              { value: 'INVESTMENTS', label: 'Investimentos' },
              { value: 'CASH', label: 'Dinheiro Físico' },
            ]}
            placeholder="Selecione um tipo de conta"
          />

          <ColorsDropdownInput />
        </div>
      </form>
    </Modal>
  );
}

