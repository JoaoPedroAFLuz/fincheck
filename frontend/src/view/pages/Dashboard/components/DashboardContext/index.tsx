import { createContext, useCallback, useState } from 'react';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  toggleValueVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(!areValuesVisible);
  }, [areValuesVisible, setAreValuesVisible]);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, [setIsNewAccountModalOpen]);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, [setIsNewAccountModalOpen]);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewAccountModalOpen,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

