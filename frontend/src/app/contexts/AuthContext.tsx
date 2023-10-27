import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { LaunchScreen } from '@/view/components/LaunchScreen';
import { localStorageKeys } from '../config/localStorageKeys';
import { User } from '../entities/user';
import { httpClient } from '../services/httpClient';
import { userService } from '../services/usersService';

interface AuthContextValue {
  user: User | undefined;
  loggedIn: boolean;
  login(accessToken: string): void;
  logout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const {
    data: user,
    isError,
    isFetching,
    isSuccess,
    remove,
  } = useQuery({
    queryKey: ['loggedUser', 'me'],
    queryFn: () => {
      return userService.me();
    },
    enabled: loggedIn,
    staleTime: Infinity,
  });

  const login = useCallback(
    (accessToken: string) => {
      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
      httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;

      setLoggedIn(true);
      remove();
    },
    [remove],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setLoggedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      logout();
    }
  }, [isError, logout]);

  return (
    <AuthContext.Provider
      value={{ user, loggedIn: isSuccess && loggedIn, login, logout }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}

