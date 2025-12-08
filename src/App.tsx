// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

function App() {
  const dataFetcherOutput = useFetchData();
  if (dataFetcherOutput.loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid>
          <h2>Cargando datos del clima...</h2>
        </Grid>
      </Grid>
    );
  }

  if (dataFetcherOutput.error) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid>
          <h2>Error al cargar datos</h2>
          <p>{`${dataFetcherOutput.error}`}</p>
        </Grid>
      </Grid>
    );
  }


  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid container justifyContent="right" alignItems="center">

        <AlertUI description="No se preveen lluvias" />

      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI /></Grid>

      {/* Indicadores */}
      <Grid container spacing={2}>

       
        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput.data && (
            <IndicatorUI
              title='Temperatura (2m)'
              description={`${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}`}
            />
          )}
        </Grid>

        
        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput.data && (
            <IndicatorUI
              title='Temp. Aparente'
              description={`${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}`}
            />
          )}
        </Grid>

   
        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput.data && (
            <IndicatorUI
              title='Viento'
              description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`}
            />
          )}
        </Grid>

      
        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput.data && (
            <IndicatorUI
              title='Humedad'
              description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`}
            />
          )}
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid sx={{ display: { xs: "none", md: "block" } }}>Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App
