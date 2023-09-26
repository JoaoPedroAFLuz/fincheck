import { Link } from 'react-router-dom';

import { Button } from '@/view/components/Button';
import { Input } from '@/view/components/Input';

export function Login() {
  return (
    <div className="flex flex-col items-center">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">Novo por aqui?</span>

          <Link to="/register" className="font-medium text-teal-900">
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex w-full flex-col gap-4">
        <Input name="email" type="email" placeholder="Email" />

        <Input name="password" type="password" placeholder="Senha" />

        <Button title="Entrar" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}

