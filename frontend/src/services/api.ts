import { MOCK_PROVIDERS } from '../data/mockProviders';
import type { Category, ServiceProvider } from '../types/service';

export const fetchDataProvider = async (categorySelected?: Category): Promise<ServiceProvider[]> => {
  // aca creamos el simulador de api llamando datos mock y simulando una demora de 1s para traer esos datos
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!categorySelected) return MOCK_PROVIDERS;

  return MOCK_PROVIDERS.filter((c) => c.category === categorySelected);
}