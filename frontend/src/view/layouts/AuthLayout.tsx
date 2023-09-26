import { Logo } from '../components/Logo';

import { Outlet } from 'react-router-dom';
import illustration from '../../assets/illustration.png';

export function AuthLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] mt-16 px-8">
          <Outlet />
        </div>
      </div>

      <div className="h-full w-1/2 p-8 hidden flex-col items-center justify-center lg:flex">
        <img
          src={illustration}
          className="h-full max-h-[960px] w-full max-w-[656px] select-none rounded-[32px] object-cover"
        />

        <div className="absolute bottom-8 max-w-[656px] rounded-b-[32px] bg-white p-10">
          <Logo className="h-8 text-teal-900" />

          <p className="mt-6 text-xl font-medium text-gray-700">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
