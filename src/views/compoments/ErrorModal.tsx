import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useError } from '../contexts/ErrorContext';
import { handleError } from '@util/errorHandler';

const ErrorModal: React.FC = () => {
  const { errorState, setErrorState } = useError();
  const { error, message } = errorState;

  const handleClose = () => {
    setErrorState(null);
  };

  if (error) {
    handleError(error);
  }

  return (
    <Modal
      open={!!error}
      onClose={handleClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="error-modal-title" variant="h6" component="h2">
          An Error Occurred
        </Typography>
        <Typography id="error-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;