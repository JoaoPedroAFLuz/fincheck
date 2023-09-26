import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export function Input({ id, name, placeholder, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        id={inputId}
        name={name}
        className="peer h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-gray-800 placeholder-shown:pt-0 focus:border-gray-800"
        placeholder=" "
        {...props}
      />

      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-[13px] text-gray-700 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm"
      >
        {placeholder}
      </label>
    </div>
  );
}

