import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import ThunderstormIcon from '@mui/icons-material/ThunderstormOutlined';
import GrainIcon from '@mui/icons-material/Grain';

export const WeatherIcon = ({ code, sx }: { code: number; sx?: any }) => {
  // Códigos WMO: https://open-meteo.com/en/docs
  if (code === 0) return <WbSunnyIcon sx={{ color: '#FFD700', ...sx }} />; // Despejado
  if (code >= 1 && code <= 3) return <CloudIcon sx={{ color: '#90a4ae', ...sx }} />; // Nublado
  if (code >= 51 && code <= 67) return <UmbrellaIcon sx={{ color: '#2196f3', ...sx }} />; // Lluvia/Drizzle
  if (code >= 71 && code <= 77) return <GrainIcon sx={{ color: '#bbdefb', ...sx }} />; // Nieve
  if (code >= 80) return <ThunderstormIcon sx={{ color: '#455a64', ...sx }} />; // Tormenta
  return <WbSunnyIcon sx={{ ...sx }} />;
};