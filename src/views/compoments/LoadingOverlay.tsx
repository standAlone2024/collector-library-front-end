// components/LoadingOverlay.tsx
import React from 'react';
import styled from 'styled-components';
import { Backdrop, CircularProgress } from '@mui/material';
import { useLoading } from '@/views/etc/LoadingContext';

const StyledBackdrop = styled(Backdrop)`
  && {
    color: #fff;
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  }
`;

export const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <StyledBackdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
};

export default LoadingOverlay;