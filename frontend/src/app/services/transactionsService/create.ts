import { httpClient } from '../httpClient';

interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'EXPENSE' | 'INCOME';
}

export async function create(params: CreateTransactionParams) {
  await httpClient.post('/transactions', params);
}

