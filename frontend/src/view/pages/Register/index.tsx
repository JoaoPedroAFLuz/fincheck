import { Link } from 'react-router-dom';

import { Button } from '@/view/components/Button';
import { Input } from '@/view/components/Input';

export function Register() {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold tracking-[-1px]">Crie sua conta</h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">Já possui uma conta?</span>

          <Link to="/login" className="font-medium text-teal-900">
            Fazer Login
          </Link>
        </p>
      </header>

      <form className="mt-8 flex w-full flex-col gap-4">
        <Input name="nome" type="text" placeholder="Nome" />

        <Input name="email" type="email" placeholder="Email" />

        <Input name="password" type="password" placeholder="Senha" />

        <Button type="submit">Criar conta</Button>
      </form>
    </>
  );
}

