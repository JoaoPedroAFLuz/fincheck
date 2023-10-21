import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';

import { cn } from '@/app/utils/cn';

interface InputCurrencyProps {
  value?: string;
  error?: string;
  onChange?(value: string): void;
}

export function InputCurrency({ value, error, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onValueChange={(event) => onChange?.(event.value)}
        className={cn(
          'w-full text-[32px] font-bold tracking-tighter text-gray-800 outline-none',
          error && 'text-red-900',
        )}
      />

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}

