import { BankAccount } from '@/app/entities/bankAccount';
import { cn } from '@/app/utils/cn';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { BankAccountTypeIcon } from '@/view/components/icons/BankAccountTypeIcon';
import { useAccountController } from './useAccountController';

interface AccountCardProps {
  account: BankAccount;
  className?: string;
}

export function AccountCard({ account, className }: AccountCardProps) {
  const { name, currentBalance, type, color } = account;

  const { areValuesVisible, openEditAccountModal } = useAccountController();

  return (
    <div
      role="button"
      onClick={() => openEditAccountModal(account)}
      className={cn(
        'flex h-[200px] flex-col justify-between rounded-2xl border-b-4 border-teal-950 bg-white p-4 text-gray-800 transition-colors hover:bg-gray-200',
        className,
      )}
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="mt-4 block font-medium tracking-tight text-gray-800">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            'block font-medium tracking-tight text-gray-800',
            !areValuesVisible && 'blur',
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}

