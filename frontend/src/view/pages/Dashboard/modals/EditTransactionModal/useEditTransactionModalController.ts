import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Transaction } from '@/app/entities/transactions';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';
import { transactionService } from '@/app/services/transactionsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const transactionSchema = z.object({
  value: z.union([z.number(), z.string().nonempty('Valor é obrigatório')]),
  name: z.string().nonempty('Nome é obrigatório'),
  categoryId: z.string().nonempty('Categoria é obrigatória'),
  bankAccountId: z.string().nonempty('Conta é obrigatória'),
  date: z.date(),
});

type EditTransaction = z.infer<typeof transactionSchema>;

interface UseEditTransactionModalControllerProps {
  transaction: Transaction | null;
  onClose(): void;
}

export function useEditTransactionModalController({
  transaction,
  onClose,
}: UseEditTransactionModalControllerProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
  } = useForm<EditTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: transaction?.name,
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.category?.id,
      value: transaction?.value,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    },
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateTransaction } = useMutation(
    transactionService.update,
  );

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });

      queryClient.invalidateQueries({
        queryKey: [],
      });

      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!',
      );

      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao editar despesa'
          : 'Erro ao editar receita',
      );
    }
  });

  const { isLoading: isLoadingDelete, mutateAsync: removeTransaction } =
    useMutation(transactionService.remove);

  async function handleDeleteAccount() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });

      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });

      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Despesa excluída com sucesso!'
          : 'Receita excluída com sucesso!',
      );

      onClose();
      handleCloseDeleteModal();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao excluir despesa'
          : 'Erro ao excluir receita',
      );
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    control,
    errors,
    accounts,
    categories,
    isLoading,
    isLoadingDelete,
    isDeleteModalOpen,
    register,
    handleSubmit,
    handleDeleteAccount,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}

