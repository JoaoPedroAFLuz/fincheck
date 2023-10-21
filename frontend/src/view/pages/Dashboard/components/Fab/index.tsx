import { PlusIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from '@/view/components/DropdownMenu';
import { BankIcon } from '@/view/components/icons/BankIcon';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import { useDashboard } from '../DashboardContext/useDashboard';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed bottom-4 right-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white">
            <PlusIcon className="h-6 w-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mb-2 mr-2">
          <DropdownMenu.Item
            onSelect={() => openNewTransactionModal('EXPENSE')}
            className="gap-2"
          >
            <CategoryIcon type="expense" />
            <span>Nova Despesa</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={() => openNewTransactionModal('INCOME')}
            className="gap-2"
          >
            <CategoryIcon type="income" />
            <span>Nova Receita</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item onSelect={openNewAccountModal} className="gap-2">
            <BankIcon />
            <span>Nova Conta</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

