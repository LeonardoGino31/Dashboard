import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

type FetchDataReturn = {
  data: OpenMeteoResponse | undefined;
  loading: boolean;
  error: Error | undefined;
}

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.0447, longitude: -79.908 },
  'Quito': { latitude: -0.22985, longitude: -78.52495 },
  'Manta': { latitude: -0.94937, longitude: -80.73137 },
  'Cuenca': { latitude: -2.8953, longitude: -78.9963 },
};

export default function useFetchData(selectedOption: string | null): FetchDataReturn {
  const [data, setData] = useState<OpenMeteoResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    // 1. Resetear estados al cambiar de ciudad
    setLoading(true);
    setError(undefined);

    // 2. Definir configuración
    const cityConfig = selectedOption && CITY_COORDS[selectedOption] 
      ? CITY_COORDS[selectedOption] 
      : CITY_COORDS["Guayaquil"];

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    // 3. Función asíncrona interna
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la respuesta de la red");
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]); // Se dispara cada vez que cambia la opción

  return { data, loading, error };
}