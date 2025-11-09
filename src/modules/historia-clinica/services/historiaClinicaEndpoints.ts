import { BASE_URL_HISTORIA_CLINICA } from './config';


export const OBTENER_ITEMS_DM = {
  URL: `${BASE_URL_HISTORIA_CLINICA}/items-dm`,
  METHOD: 'get' as const
};

export const CARGAR_EVOLUCION = {
  URL: (id_usuario: string | number) => `${BASE_URL_HISTORIA_CLINICA}/pacientes/${id_usuario}/evoluciones`,
  METHOD: 'post' as const
};
