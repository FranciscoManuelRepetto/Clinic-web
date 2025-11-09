import { BASE_URL_HISTORIA_CLINICA } from '@/globals/services/config';

export interface RegistrarPacienteData {
  dni: string;
  nombre: string;
  apellido: string;
  genero: string;
  obra_social: string;
  nro_socio: string;
  fecha_nacimiento: string;
  fecha_ingreso: string;
  domicilio?: string;
  telefono?: string;
  email?: string;
  [key: string]: any;
}

export const REGISTRAR_PACIENTE_ENDPOINT = {
  URL: () => `${BASE_URL_HISTORIA_CLINICA}/pacientes`,
  METHOD: 'post' as const
};

export default REGISTRAR_PACIENTE_ENDPOINT;

