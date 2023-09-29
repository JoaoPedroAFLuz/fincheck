import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '@/app/hooks/useAuth';
import { authService } from '@/services/authService';
import { LoginParams } from '@/services/authService/login';

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
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const { login } = useAuth();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: LoginParams) => authService.login(data),
  });

  const handleSubmit = hookFormHandleSubmit(async (data: LoginForm) => {
    try {
      const { accessToken } = await mutateAsync(data);

      login(accessToken);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return { errors, isLoading, register, handleSubmit };
}

