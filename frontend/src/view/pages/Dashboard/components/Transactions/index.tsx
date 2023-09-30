import { TransactionsIcon } from '@/view/components/icons/BankAccountTypeIcon/TransactionsIcon';

export function Transactions() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-gray-100 p-10">
      <div className="flex gap-2">
        <TransactionsIcon />
        <span>Transações</span>
      </div>
    </div>
  );
}

