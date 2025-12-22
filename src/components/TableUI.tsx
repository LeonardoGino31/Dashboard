import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Importado para mensajes de carga/error
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import useFetchData from '../functions/useFetchData'; // Asegúrate de que la ruta de importación sea correcta

interface TableUIProps {
  selectedOption: string | null;
}


function formatDate(isoString: string) {
   const date = new Date(isoString);
   return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Formato 24h
   }).format(date);
}

function combineArrays(arrLabels: string[], arrValues1: number[], arrValues2: number[]) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label, // Mantenemos el string ISO original aquí
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 50 },
   {
      field: 'label',
      headerName: 'Fecha y Hora',
      width: 150,
      // 2. Usamos valueFormatter para cambiar cómo se ve el dato
      valueFormatter: (value) => formatDate(value),
   },
   {
      field: 'value1',
      headerName: 'Temperatura (°C)',
      width: 150,
      // Opcional: Agregar sufijo de unidad visualmente
      valueFormatter: (value) => `${value} °C`, 
   },
   {
      field: 'value2',
      headerName: 'Viento (km/h)',
      width: 150,
      valueFormatter: (value) => `${value} km/h`,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      sortable: false,
      width: 300,
      // Actualizamos el getter para usar la fecha formateada también
      valueGetter: (_, row) => 
         `${formatDate(row.label)}: ${row.value1}°C, Viento ${row.value2}km/h`,
   },
];

export default function TableUI({ selectedOption }: TableUIProps) {
  const { data, loading, error } = useFetchData(selectedOption);


   if (loading) {
      return (
         <Box sx={{ height: 400, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Cargando pronóstico...</Typography>
         </Box>
      );
   }

   if (error) {
  return (
    <Box sx={{ height: 400, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       {/* Cambia {error} por {error.message} */}
       <Typography color="error">Error: {error.message}</Typography>
    </Box>
  );
}

   const hourlyData = data?.hourly;
   
   const rows = hourlyData 
      ? combineArrays(hourlyData.time, hourlyData.temperature_2m, hourlyData.wind_speed_10m) 
      : [];

   return (
      <Box sx={{ height: 400, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: { pageSize: 5 },
               },
            }}
            pageSizeOptions={[5, 10, 24]} // 24 es útil para ver un día completo
            disableRowSelectionOnClick
         />
      </Box>
   );
}