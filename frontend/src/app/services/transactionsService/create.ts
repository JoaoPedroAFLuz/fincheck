import { TransactionType } from '@/app/entities/transactions';
import { httpClient } from '../httpClient';

interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType;
}

export async function create(params: CreateTransactionParams) {
  await httpClient.post('/transactions', params);
}

