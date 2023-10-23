import { httpClient } from '../httpClient';

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
}

export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}

