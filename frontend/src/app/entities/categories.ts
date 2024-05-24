import { TransactionType } from './transactions';

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
}

