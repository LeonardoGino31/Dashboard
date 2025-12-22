import { Box, Typography } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';

export default function HeaderUI() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        color: 'white',
        background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: 3,
      }}
    >
      <CloudIcon sx={{ fontSize: 48 }} />

      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold' }}
        >
          Dashboard del Clima
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{ opacity: 0.9 }}
        >
          Información meteorológica en tiempo real
        </Typography>
      </Box>
    </Box>
  );
}
