import { createContext, useCallback, useState } from 'react';

interface DashboardContextValue {
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  toggleValueVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(true);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(!areValuesVisible);
  }, [areValuesVisible, setAreValuesVisible]);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, [setIsNewAccountModalOpen]);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, [setIsNewAccountModalOpen]);

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
        areValuesVisible,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

