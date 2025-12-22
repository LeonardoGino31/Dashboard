import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

interface SelectorProps {
  onOptionSelect: (option: string) => void;
}

export default function SelectorUI({ onOptionSelect }: SelectorProps) {
  // Inicializamos con un string vacío
  const [cityInput, setCityInput] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    // Actualizamos el estado local para que el Select muestre el texto
    setCityInput(selectedValue);
    // Notificamos al padre (App.tsx)
    onOptionSelect(selectedValue);
  };

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        value={cityInput} // Debe ser exactamente igual a uno de los MenuItem values
        onChange={handleChange}
        label="Ciudad" 
      >
        <MenuItem value="">
          <em>Seleccione una ciudad</em>
        </MenuItem>
        
        {/* Los valores aquí DEBEN empezar con mayúscula para coincidir con tu CITY_COORDS */}
        <MenuItem value="Guayaquil">Guayaquil</MenuItem>
        <MenuItem value="Quito">Quito</MenuItem>
        <MenuItem value="Manta">Manta</MenuItem>
        <MenuItem value="Cuenca">Cuenca</MenuItem>
      </Select>

      {cityInput && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
          Ciudad actual: <strong>{cityInput}</strong>
        </Typography>
      )}
    </FormControl>
  );
}