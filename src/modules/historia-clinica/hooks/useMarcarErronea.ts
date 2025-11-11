import { useState } from 'react';
import axios from 'axios';
import { MARCAR_ERRONEA } from '../services/historiaClinicaEndpoints';
import errorHandler from '@/globals/utils/errorHandler';
import { EvolucionCompleta } from '../types/EvolucionCompleta';


export interface UseMarcarErronea {
  marcarErronea: (id_usuario: number | string, id_evolucion: number | string, body: {
    motivo_erronea: string
  }) => Promise<EvolucionCompleta | null>;
  isLoading: boolean;
  error: string | null;
}

export const useMarcarErronea = (): UseMarcarErronea => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const marcarErronea = async (id_usuario: number | string, id_evolucion: number | string, 
    body: {
        motivo_erronea: string
    })  => {
    //retiramos los inputs con ""
    Object.entries(body).forEach(([key, value]) => {
      if(!value)
        delete body[key];
    });
    setIsLoading(true);
    setError(null);
    console.log("vamos a cargar en la url: ", MARCAR_ERRONEA.URL(id_usuario, id_evolucion))
    let evolucion = null;
    try {
      const response = await axios({
        method: MARCAR_ERRONEA.METHOD,
        url: MARCAR_ERRONEA.URL(id_usuario, id_evolucion),
        data: body
      });
      evolucion = response.data;
    } catch (err) {
      console.error('Error al marcar como erronea la evolucion:', err);
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        setError(errorHandler(err.response.data.detail));
      } else {
        setError(err instanceof Error ? err.message : 'Error desconocido al marcar como erronea evolucion');
      }
    } finally {
      setIsLoading(false);
    }
    return evolucion;
  };


  return {
    marcarErronea,
    isLoading,
    error,
  };
};

export default useMarcarErronea;