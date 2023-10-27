import { TransactionType } from './transactions';

export interface Categories {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
}

