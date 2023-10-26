export interface Transaction {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: string;
  date: string;
  type: 'EXPENSE' | 'INCOME';
}

