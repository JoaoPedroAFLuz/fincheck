import { Categories } from '@/app/entities/categories';
import { httpClient } from '../httpClient';

type CategoriesResponse = Categories[];
export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories');

  return data;
}

