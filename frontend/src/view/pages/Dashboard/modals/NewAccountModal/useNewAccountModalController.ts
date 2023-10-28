import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

import { bankAccountsService } from '@/app/services/bankAccountsService';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const newAccountSchema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatória'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {
    required_error: 'Tipo de conta é obrigatório',
  }),
  color: z.string().nonempty('Cor é obrigatória'),
});

type NewAccount = z.infer<typeof newAccountSchema>;

const defaultAccount: NewAccount = {
  initialBalance: '0',
  name: '',
  type: 'CHECKING',
  color: '',
};

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    control,
    formState: { errors },
    register,
    reset,
    handleSubmit: hookFormSubmit,
  } = useForm<NewAccount>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: defaultAccount,
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(bankAccountsService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: parseFloat(data.initialBalance),
      });

      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });

      toast.success('Conta criada com sucesso!');
      closeNewAccountModal();
      reset(defaultAccount);
    } catch (error) {
      toast.error('Erro ao criar conta');
    }
  });

  function handleCloseModal() {
    closeNewAccountModal();
    reset(defaultAccount);
  }

  return {
    control,
    errors,
    isNewAccountModalOpen,
    isLoading,
    register,
    handleSubmit,
    handleCloseModal,
  };
}

