import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerFormSchema = z.object({
  firstName: z
    .string()
    .nonempty('Campo obrigatório')
    .min(3, 'Informe seu nome'),
  lastName: z
    .string()
    .nonempty('Campo obrigatório')
    .min(3, 'Informe seu sobrenome'),
  email: z
    .string()
    .nonempty('Campo obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Campo obrigatório')
    .min(8, 'Senha deve conter no mínimo 8 dígitos'),
});

type RegisterForm = z.infer<typeof registerFormSchema>;

export function useRegisterController() {
  const {
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleSubmit = hookFormHandleSubmit((data: RegisterForm) => {
    console.log({ data });
  });

  return { errors, register, handleSubmit };
}

