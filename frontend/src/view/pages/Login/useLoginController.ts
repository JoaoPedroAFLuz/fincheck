import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty('Campo obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Campo obrigatório')
    .min(8, 'Senha deve ter no mínimo 8 dígitos'),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export function useLoginController() {
  const {
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
    ...form
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmit = hookFormHandleSubmit((data: LoginForm) => {
    console.log({ data });
  });

  return { form, errors, register, handleSubmit };
}

