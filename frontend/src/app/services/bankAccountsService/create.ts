import { httpClient } from '../httpClient';

export interface BankAccountParams {
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
}

export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}

