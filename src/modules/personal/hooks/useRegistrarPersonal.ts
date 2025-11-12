import { useState } from "react";
import REGISTRAR_PERSONAL_ENDPOINT, {RegistrarPersonalData}  from "../services/registrarPersonalEndpoint";
import errorHandler from '@/globals/utils/errorHandler';

export function useRegistrarPersonal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registrarPersonal = async (data: RegistrarPersonalData) => {
    setIsLoading(true);
    setError(null);
    
    try {


      const response = await fetch(
        REGISTRAR_PERSONAL_ENDPOINT.URL(),
        {
          method: REGISTRAR_PERSONAL_ENDPOINT.METHOD,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al registrar paciente');
      }

      const responseData = await response.json();
      setIsLoading(false);
      return responseData;

    } catch (error: any) {
      const errorMessage = errorHandler(error.message);
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  return {
    registrarPersonal,
    isLoading,
    error,
  };
}