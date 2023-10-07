import { DropdownMenu } from '@/view/components/DropdownMenu';
import { TransactionsIcon } from '@/view/components/icons/BankAccountTypeIcon/TransactionsIcon';
import { ExpensesIcon } from '@/view/components/icons/ExpensesIcon';
import { IncomeIcon } from '@/view/components/icons/IncomeIcon';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex h-12 items-center gap-2">
          <TransactionsIcon />

          <span className="text-sm font-medium tracking-tight text-gray-800 ">
            Transações
          </span>

          <ChevronDownIcon className="h-6 w-6 text-gray-900" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[287px]">
        <DropdownMenu.Item className="gap-2">
          <IncomeIcon />
          <span>Receitas</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2">
          <ExpensesIcon />
          <span>Despesas</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2">
          <TransactionsIcon />
          <span>Transações</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

