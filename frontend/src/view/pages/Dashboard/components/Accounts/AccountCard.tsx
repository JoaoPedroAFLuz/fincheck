import { cn } from '@/app/utils/cn';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { BankAccountTypeIcon } from '@/view/components/icons/BankAccountTypeIcon';
import { iconsMap } from '@/view/components/icons/BankAccountTypeIcon/iconsMap';
import { useAccountController } from './useAccountController';

interface AccountCardProps {
  name: string;
  type: keyof typeof iconsMap;
  balance: number;
  color: string;
  className?: string;
}

export function AccountCard({
  name,
  type,
  balance,
  color,
  className,
}: AccountCardProps) {
  const { areValuesVisible } = useAccountController();

  return (
    <div
      className={cn(
        'flex h-[200px] flex-col justify-between rounded-2xl border-b-4 border-teal-950 bg-white p-4 text-gray-800',
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
          {formatCurrency(balance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
