import { useEffect, useState, useCallback } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
import { type DataState } from '../types/DataTypes';

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-1.25&longitude=-78.25&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature';

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