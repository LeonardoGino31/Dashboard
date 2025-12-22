import { useState } from 'react';
import './App.css';

import { Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

import useFetchData from './functions/useFetchData';
function getWeatherSummary(temp: number, humidity: number, wind: number) {
  if (temp >= 30 && humidity >= 70) {
    return 'Día caluroso y húmedo. Se recomienda hidratarse y evitar el sol en horas pico.';
  }

  if (temp >= 30 && wind >= 15) {
    return 'Día caluroso con viento moderado. Sensación térmica elevada.';
  }

  if (temp < 18) {
    return 'Temperatura fresca durante el día. Considera usar ropa abrigada.';
  }

  return 'Condiciones climáticas agradables para actividades al aire libre.';
}


function getComfortLevel(temp: number, humidity: number) {
  if (temp > 30 && humidity > 70) {
    return { level: 'Incómodo', color: 'error.main' };
  }

  if (temp >= 25 && humidity >= 60) {
    return { level: 'Moderado', color: 'warning.main' };
  }

  return { level: 'Cómodo', color: 'success.main' };
}


function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dataFetcherOutput = useFetchData(selectedOption);

  // Loading
  if (dataFetcherOutput.loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Typography variant="h6">
          Cargando datos del clima...
        </Typography>
      </Grid>
    );
  }

  // Error
  if (dataFetcherOutput.error) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Typography color="error">
          Error al cargar datos
        </Typography>
      </Grid>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>

        {/* HEADER */}
        <Grid size={{ xs: 12 }}>
          <HeaderUI />
        </Grid>

        {/* ALERTA */}
        <Grid
          size={{ xs: 12 }}
          display="flex"
          justifyContent="flex-end"
        >
          <AlertUI description="No se prevén lluvias" />
        </Grid>

        {/* SELECTOR + CIUDAD */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <SelectorUI onOptionSelect={setSelectedOption} />

            {selectedOption && (
              <Typography
                variant="h5"
                align="center"
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                {selectedOption}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* INDICADORES */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            {dataFetcherOutput.data && (
              <>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                    title="Temperatura"
                    description={`${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}`}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                    title="Temp. Aparente"
                    description={`${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}`}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                    title="Viento"
                    description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                    title="Humedad"
                    description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>


        {/* GRÁFICO (solo desktop) */}
        <Grid
          size={{ xs: 12 }}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Paper elevation={3} sx={{ p: 3 }}>
            <ChartUI selectedOption={selectedOption} />
          </Paper>
        </Grid>

        {/* TABLA (solo desktop) */}
        <Grid
          size={{ xs: 12 }}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Paper elevation={3} sx={{ p: 3 }}>
            <TableUI selectedOption={selectedOption} />
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Índice de confort
            </Typography>

            {dataFetcherOutput.data && (() => {
              const comfort = getComfortLevel(
                dataFetcherOutput.data.current.temperature_2m,
                dataFetcherOutput.data.current.relative_humidity_2m
              );

              return (
                <Typography sx={{ color: comfort.color, fontWeight: 'bold' }}>
                  {comfort.level}
                </Typography>
              );
            })()}
          </Paper>
        </Grid>
        {/* RESUMEN DEL DÍA */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del día
            </Typography>

            {dataFetcherOutput.data && (
              <Typography color="text.secondary">
                {getWeatherSummary(
                  dataFetcherOutput.data.current.temperature_2m,
                  dataFetcherOutput.data.current.relative_humidity_2m,
                  dataFetcherOutput.data.current.wind_speed_10m
                )}
              </Typography>
            )}
          </Paper>
        </Grid>



      </Grid>
    </Container>
  );
}

export default App;
