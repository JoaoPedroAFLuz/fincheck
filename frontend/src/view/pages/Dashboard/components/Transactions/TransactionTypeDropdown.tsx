import { ChevronDownIcon } from '@radix-ui/react-icons';

import { TransactionType } from '@/app/entities/transactions';
import { DropdownMenu } from '@/view/components/DropdownMenu';
import { TransactionsIcon } from '@/view/components/icons/BankAccountTypeIcon/TransactionsIcon';
import { ExpensesIcon } from '@/view/components/icons/ExpensesIcon';
import { IncomeIcon } from '@/view/components/icons/IncomeIcon';

interface TransactionTypeDropdownProps {
  selectedType: TransactionType | undefined;
  onSelect(type: TransactionType | undefined): void;
}

export function TransactionTypeDropdown({
  selectedType,
  onSelect,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex h-12 items-center gap-2 rounded-2xl px-2 transition-colors hover:bg-gray-50">
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm font-medium tracking-tight text-gray-800 ">
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === undefined && 'Transações'}
          </span>

          <ChevronDownIcon className="h-6 w-6 text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[287px]">
        <DropdownMenu.Item
          onSelect={() => onSelect('INCOME')}
          className="gap-2"
        >
          <IncomeIcon />
          <span>Receitas</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onSelect={() => onSelect('EXPENSE')}
          className="gap-2"
        >
          <ExpensesIcon />
          <span>Despesas</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onSelect={() => onSelect(undefined)}
          className="gap-2"
        >
          <TransactionsIcon />
          <span>Transações</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

