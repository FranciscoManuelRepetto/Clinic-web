import { BASE_URL_PERSONAL } from '@/globals/services/config';

export interface RegistrarPersonalData {
  dni: string;
  tipo: string;
  genero: string;
  nombre: string;
  apellido: string;
  matricula?: string;
  email: string;
  foto_url?: File | null;
}

export const REGISTRAR_PERSONAL_ENDPOINT = {
  URL: () => `${BASE_URL_PERSONAL}/personal/`,
  METHOD: 'post' as const,
  headers: {
    Accept: 'application/json',
    // No incluimos Content-Type porque FormData lo establece automáticamente
  },
};

export default REGISTRAR_PERSONAL_ENDPOINT;