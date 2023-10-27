export interface Transaction {
  id: string;
  bankAccountId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType;
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}

export type TransactionType = 'INCOME' | 'EXPENSE';

