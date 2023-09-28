import { Link } from 'react-router-dom';

import { Button } from '@/view/components/Button';
import { Input } from '@/view/components/Input';
import { useRegisterController } from './useRegisterController';

export function Register() {
  const { errors, register, handleSubmit } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px]">Crie sua conta</h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">Já possui uma conta?</span>

          <Link to="/login" className="font-medium text-teal-900">
            Fazer Login
          </Link>
        </p>
      </header>

      <form className="mt-8 flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          error={errors.firstName?.message}
          placeholder="Nome"
          {...register('firstName')}
        />

        <Input
          type="text"
          error={errors.lastName?.message}
          placeholder="Sobrenome"
          {...register('lastName')}
        />

        <Input
          type="email"
          error={errors.email?.message}
          placeholder="Email"
          {...register('email')}
        />

        <Input
          type="password"
          error={errors.password?.message}
          placeholder="Senha"
          {...register('password')}
        />

        <Button type="submit" className="mt-2">
          Criar conta
        </Button>
      </form>
    </>
  );
}

