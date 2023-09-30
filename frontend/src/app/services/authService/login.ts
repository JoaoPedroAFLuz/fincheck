import { httpClient } from '../httpClient';

export interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export async function login(userData: LoginParams) {
  const { data } = await httpClient.post<LoginResponse>(
    '/auth/login',
    userData,
  );

  return data;
}

