import { useState } from 'react';
import axios from 'axios';
import { Paciente } from '../types/Paciente';
import { BUSCAR_PACIENTES_ENDPOINT, BuscarPacientesParams } from '../services/buscarPacientesEndpoint';

export interface UseBuscarPacientesReturn {
  buscarPacientes: (params: BuscarPacientesParams) => Promise<void>;
  pacientes: Paciente[];
  totalPacientes: number;
  getTotalPages: (limit: number) => number;
  isLoading: boolean;
  error: string | null;
}

export const useBuscarPacientes = (): UseBuscarPacientesReturn => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [totalPacientes, setTotalPacientes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const buscarPacientes = async (params: BuscarPacientesParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        method: BUSCAR_PACIENTES_ENDPOINT.METHOD,
        url: BUSCAR_PACIENTES_ENDPOINT.URL(params),
      });

      // El backend devuelve un array de pacientes directamente
      const pacientesData: Paciente[] = response.data;
      setPacientes(pacientesData);
      setTotalPacientes(pacientesData.length);
    } catch (err) {
      console.error('Error al buscar pacientes:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al buscar pacientes');
      setPacientes([]);
      setTotalPacientes(0);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalPages = (limit: number): number => {
    if (limit <= 0 || totalPacientes === 0) return 0;
    const pages = Math.floor(totalPacientes / limit);
    return totalPacientes % limit !== 0 ? pages + 1 : pages;
  };

  return {
    buscarPacientes,
    pacientes,
    totalPacientes,
    getTotalPages,
    isLoading,
    error,
  };
};

export default useBuscarPacientes;

