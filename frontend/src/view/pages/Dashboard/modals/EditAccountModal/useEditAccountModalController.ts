import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

import { bankAccountsService } from '@/app/services/bankAccountsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const EditAccountSchema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da conta é obrigatória'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {
    required_error: 'Tipo de conta é obrigatório',
  }),
  color: z.string().nonempty('Cor é obrigatória'),
});

type EditAccount = z.infer<typeof EditAccountSchema>;

export function useEditAccountModalController() {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const { accountBeingEdited, isEditAccountModalOpen, closeEditAccountModal } =
    useDashboard();

  const {
    control,
    formState: { errors },
    register,
    reset,
    handleSubmit: hookFormSubmit,
  } = useForm<EditAccount>({
    resolver: zodResolver(EditAccountSchema),
    defaultValues: {
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  function openDeleteAccountModal() {
    setIsDeleteAccountModalOpen(true);
  }

  function closeDeleteAccountModal() {
    setIsDeleteAccountModalOpen(false);
  }

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountsService.update,
  );

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        id: accountBeingEdited!.id,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });
      toast.success('Conta editada com sucesso!');
      closeEditAccountModal();
      reset();
    } catch (error) {
      toast.error('Erro ao salvar as alterações');
    }
  });

  const { isLoading: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation(bankAccountsService.remove);

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });

      closeEditAccountModal();
      closeDeleteAccountModal();
      toast.success('Conta excluída com sucesso!');
    } catch {
      toast.error('Erro ao excluir a conta');
    }
  }

  return {
    control,
    errors,
    accountBeingEdited,
    isEditAccountModalOpen,
    isDeleteAccountModalOpen,
    isLoading,
    isLoadingDelete,
    register,
    handleSubmit,
    handleDeleteAccount,
    closeEditAccountModal,
    openDeleteAccountModal,
    closeDeleteAccountModal,
  };
}

