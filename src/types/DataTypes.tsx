import { type OpenMeteoResponse } from '../types/DashboardTypes';
export interface DataState{
    data: OpenMeteoResponse | undefined;
    loading: boolean;
    error: string|null;
}