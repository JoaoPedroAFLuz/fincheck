import { Transaction, TransactionType } from '@/app/entities/transactions';
import { httpClient } from '../httpClient';

type TransactionsResponse = Transaction[];

export type TransactionFilters = {
  monthIndex: number;
  year: number;
  bankAccountId?: string;
  categoryId?: string;
  type?: TransactionType;
};

export async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters,
  });

  return data;
}

