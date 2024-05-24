import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';
import { transactionService } from '@/app/services/transactionsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const transactionSchema = z.object({
  value: z.string().nonempty('Valor é obrigatório'),
  name: z.string().nonempty('Nome é obrigatório'),
  categoryId: z.string().nonempty('Categoria é obrigatória'),
  bankAccountId: z.string().nonempty('Conta é obrigatória'),
  instalments: z.coerce
    .number()
    .min(1, 'Número de parcelas deve ser maior ou igual a 1'),
  date: z.date(),
});

type NewTransaction = z.infer<typeof transactionSchema>;

const defaultTransaction: NewTransaction = {
  value: '0',
  name: '',
  categoryId: '',
  bankAccountId: '',
  instalments: 1,
  date: new Date(),
};

export function useNewTransactionModalController() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categoriesList, newTransactionType]);

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
    reset,
  } = useForm<NewTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultTransaction,
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(transactionService.create);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });

      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });

      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa criada com sucesso!'
          : 'Receita criada com sucesso!',
      );

      reset(defaultTransaction);
      closeNewTransactionModal();
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao criar despesa'
          : 'Erro ao criar receita',
      );
    }
  });

  function handleCloseModal() {
    reset(defaultTransaction);
    closeNewTransactionModal();
  }

  return {
    control,
    errors,
    accounts,
    categories,
    newTransactionType,
    isNewTransactionModalOpen,
    isLoading,
    register,
    handleSubmit,
    handleCloseModal,
  };
}

