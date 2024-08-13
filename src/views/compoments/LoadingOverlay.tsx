// components/LoadingOverlay.tsx
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useLoading } from '@view/templates/LoadingContext';

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;