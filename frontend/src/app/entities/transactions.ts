export interface Transaction {
  id: string;
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

export type TransactionType = 'EXPENSE' | 'INCOME';

