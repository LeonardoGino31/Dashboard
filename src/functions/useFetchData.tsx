import { useEffect, useState, useCallback } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
import { type DataState } from '../types/DataTypes';

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

export default function useFetchData() {



    const [dataState, setDataState] = useState<DataState>({
        data: undefined,
        loading: true,
        error: null
    })

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data: OpenMeteoResponse = await response.json();
            setDataState({
                data: data,
                loading: false,
                error: null
            });
        } catch (error) {
            setDataState(prev => ({
                ...prev,
                loading: false,
                error: (error as Error).message
            }));
        }
    }, []);

    useEffect(() => {
        if (dataState.data === undefined) fetchData();
    }, []);

    return {
        data: dataState.data,
        loading: dataState.loading,
        error: dataState.error
    };


}