import { httpClient } from '../httpClient';

interface MeResponse {
  firstName: string;
  lastName: string;
  email: string;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
}

