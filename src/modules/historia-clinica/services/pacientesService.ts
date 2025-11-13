import axios from 'axios';
import { OBTENER_PACIENTE } from './historiaClinicaEndpoints';

export async function fetchPaciente(id_usuario: string | number) {
  const response = await axios({
    method: OBTENER_PACIENTE.METHOD,
    url: OBTENER_PACIENTE.URL(id_usuario),
  });
  return response.data;
}

export default { fetchPaciente };