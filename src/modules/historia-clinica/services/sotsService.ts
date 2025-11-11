import axios from 'axios';
import { OBTENER_SOTS } from './historiaClinicaEndpoints';

export async function fetchSots(id_usuario: string | number) {
  const response = await axios({
    method: OBTENER_SOTS.METHOD,
    url: OBTENER_SOTS.URL(id_usuario),
  });
  return response.data;
}

export default { fetchSots };
