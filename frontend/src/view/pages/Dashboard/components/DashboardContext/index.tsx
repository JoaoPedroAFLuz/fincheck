import { createContext, useCallback, useState } from 'react';

import { BankAccount } from '@/app/entities/bankAccount';

interface DashboardContextValue {
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  accountBeingEdited: BankAccount | null;
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  toggleValueVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<BankAccount | null>(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(!areValuesVisible);
  }, [areValuesVisible, setAreValuesVisible]);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, [setIsNewAccountModalOpen]);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, [setIsNewAccountModalOpen]);

  const openEditAccountModal = useCallback(
    (bankAccount: BankAccount) => {
      setIsEditAccountModalOpen(true);
      setAccountBeingEdited(bankAccount);
    },
    [setIsEditAccountModalOpen],
  );

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false);
    setAccountBeingEdited(null);
  }, [setIsEditAccountModalOpen]);

  const openNewTransactionModal = useCallback(
    (type: 'INCOME' | 'EXPENSE') => {
      setNewTransactionType(type);
      setIsNewTransactionModalOpen(true);
    },
    [setIsNewTransactionModalOpen],
  );

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, [setIsNewTransactionModalOpen]);

  return (
    <DashboardContext.Provider
      value={{
        newTransactionType,
        accountBeingEdited,
        areValuesVisible,
        isNewAccountModalOpen,
        isEditAccountModalOpen,
        isNewTransactionModalOpen,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openEditAccountModal,
        closeEditAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

