import { TransactionType } from '@/app/entities/transactions';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';
import { useState } from 'react';

export function useFiltersModalController(transactionType?: TransactionType) {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | undefined
  >(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >('all');
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const teste = [
    {
      id: 'all',
      name: 'Todas',
    },
  ];

  categories
    .filter((category) => !transactionType || category.type === transactionType)
    .forEach((category) => {
      teste.push({
        id: category.id,
        name: category.name,
      });
    });

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId,
    );
  }

  function handleSelectCategory(categoryId: string) {
    setSelectedCategoryId((prevState) =>
      prevState === categoryId ? undefined : categoryId,
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    accounts,
    selectedBankAccountId,
    categories: teste,
    selectedCategoryId,
    selectedYear,
    handleSelectBankAccount,
    handleSelectCategory,
    handleChangeYear,
  };
}

