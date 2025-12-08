import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import useFetchData from '../functions/useFetchData'; 

export default function ChartUI() {
    const { data, loading, error } = useFetchData();

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    // --- CONFIGURACIÓN DE DATOS ---
    const limit = 24; // Mostramos 24 horas

    // 1. Datos del Eje Y (Temperatura y Viento)
    // Usamos || [] para evitar errores si la data aún no carga
    const temperatureData = data?.hourly.temperature_2m.slice(0, limit) || [];
    const windData = data?.hourly.wind_speed_10m.slice(0, limit) || [];

    // 2. Datos del Eje X (Horas)
    // MÉTODO ROBUSTO: Tomamos el string "2024-12-09T14:00" y lo cortamos.
    // .split('T')[1] nos da "14:00". Es texto puro, el gráfico no puede fallar al mostrarlo.
    const timeLabels = data?.hourly.time.slice(0, limit).map((isoString) => {
        return isoString.split('T')[1]; 
    }) || [];

    return (
        <Paper elevation={3} sx={{ p: 2, width: '100%', height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary">
                Pronóstico (Próximas 24 Horas)
            </Typography>
            
            <LineChart
                height={300} // Altura fija para el gráfico
                series={[
                    { 
                        data: temperatureData, 
                        label: 'Temperatura (°C)', 
                        color: '#ff5722',
                        curve: 'linear', // Hace la línea más suave
                        showMark: true,   // Muestra los puntos (bolitas) como en tu imagen
                    },
                    { 
                        data: windData, 
                        label: 'Viento (km/h)', 
                        color: '#2196f3',
                        curve: 'linear',
                        showMark: true, 
                    },
                ]}
                xAxis={[{ 
                    scaleType: 'point', 
                    data: timeLabels, // Pasamos ["00:00", "01:00", ...]
                    tickLabelStyle: {
                        angle: -45,         // Rotamos para que quepan todas
                        textAnchor: 'end', 
                        fontSize: 10,
                        fontWeight: 'bold', // Las hacemos un poco más gruesas para verlas mejor
                    }
                }]}
                // Márgenes ajustados para que las etiquetas rotadas no se corten
                margin={{ bottom: 70, left: 40, right: 10, top: 10 }}
                grid={{ vertical: true, horizontal: true }}
            />
        </Paper>
    );
}