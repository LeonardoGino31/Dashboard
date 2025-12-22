import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useFetchData from '../functions/useFetchData';

export default function ChartUI({ selectedOption }: { selectedOption: string | null }) {
    const { data, loading, error } = useFetchData(selectedOption);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Typography>Cargando datos del gráfico...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">Error: {error.message}</Typography>
            </Box>
        );
    }

    // --- CONFIGURACIÓN DE DATOS ---
    const limit = 24;

    // 1. Datos del Eje Y
    const temperatureData = data?.hourly.temperature_2m.slice(0, limit) || [];
    const windData = data?.hourly.wind_speed_10m.slice(0, limit) || [];

    // 2. Datos del Eje X (Horas simplificadas)
    const timeLabels = data?.hourly.time.slice(0, limit).map((isoString: string) => {
        return isoString.split('T')[1]; // Retorna "HH:mm"
    }) || [];

    return (
        /* Usamos un Box en lugar de Paper para no duplicar el contenedor de App.tsx */
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Pronóstico (Próximas 24 Horas)
            </Typography>

            <LineChart
                height={400} // Altura suficiente para el gráfico y las etiquetas
                series={[
                    {
                        data: temperatureData,
                        label: 'Temperatura (°C)',
                        color: '#ff5722',
                        curve: 'linear',
                        showMark: true,
                        valueFormatter: (value) => `${value}°C`,
                    },
                    {
                        data: windData,
                        label: 'Viento (km/h)',
                        color: '#2196f3',
                        curve: 'linear',
                        showMark: true,
                        valueFormatter: (value) => `${value} km/h`,
                    },
                ]}
                xAxis={[{
                    scaleType: 'point',
                    data: timeLabels,
                    tickLabelStyle: {
                        angle: -45, // Rotación para evitar que se encimen
                        textAnchor: 'end',
                        fontSize: 12,
                    },
                }]}
                /* Márgenes cruciales: bottom 70+ para que la rotación de las horas quepa */
                margin={{ top: 50, right: 20, bottom: 80, left: 50 }}

                /* Configuración de la leyenda para que no estorbe */
                slotProps={{
                    legend: {
                        // @ts-ignore - Ignora el error de validación de tipo literal
                        direction: 'row',
                        position: {
                            vertical: 'top',
                            horizontal: 'center' // Prueba con 'middle' o 'center' según tu versión
                        },
                        padding: 0,
                    },
                }}
                grid={{ vertical: true, horizontal: true }}
            />
        </Box>
    );
}