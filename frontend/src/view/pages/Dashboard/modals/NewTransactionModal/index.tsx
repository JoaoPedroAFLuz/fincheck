import { Button } from '@/view/components/Button';
import { DatePickerInput } from '@/view/components/DatePickerInput';
import { Input } from '@/view/components/Input';
import { InputCurrency } from '@/view/components/InputCurrency';
import { Modal } from '@/view/components/Modal';
import { Select } from '@/view/components/Select';
import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form className="w-full">
        <div>
          <span className="text-lg tracking-tight text-gray-600">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-tight text-gray-600">R$</span>

            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="TransactionName"
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
          />

          <Select
            placeholder="Categoria"
            options={[
              { value: 'CHECKING', label: 'Conta Corrente' },
              { value: 'INVESTMENTS', label: 'Investimentos' },
              { value: 'CASH', label: 'Dinheiro Físico' },
            ]}
          />

          <Select
            placeholder={isExpense ? 'Pagar com' : 'Receber com'}
            options={[
              { value: 'CHECKING', label: 'Conta Corrente' },
              { value: 'INVESTMENTS', label: 'Investimentos' },
              { value: 'CASH', label: 'Dinheiro Físico' },
            ]}
          />

          <DatePickerInput />
        </div>

        <Button type="submit" className="mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}

