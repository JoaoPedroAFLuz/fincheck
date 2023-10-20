import { NumericFormat } from 'react-number-format';

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0,00"
      className="w-full text-[32px] font-bold tracking-tighter text-gray-800 outline-none"
    />
  );
}

