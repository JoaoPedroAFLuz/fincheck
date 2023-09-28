import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { authService } from '@/services/authService';
import { SignupParams } from '@/services/authService/signup';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const registerFormSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .nonempty('Campo obrigatório')
      .min(8, 'Senha deve conter no mínimo 8 dígitos'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
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

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SignupParams) => authService.signup(data),
  });

  const handleSubmit = hookFormHandleSubmit(async (data: RegisterForm) => {
    try {
      await mutateAsync(data);

      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return { errors, isLoading, register, handleSubmit };
}

