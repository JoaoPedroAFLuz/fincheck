import { httpClient } from '../httpClient';

export interface SignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(userData: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>(
    '/auth/signup',
    userData,
  );

  return data;
}

