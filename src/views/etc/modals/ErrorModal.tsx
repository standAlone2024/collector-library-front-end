import React from 'react';
import styled from 'styled-components';
import { Modal, Typography, Button } from '@mui/material';
import { useError } from '../ErrorContext';
import { handleError } from '@util/errorHandler';

const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${props => props.theme.palette.background.paper};
  box-shadow: ${props => props.theme.shadows[24]};
  padding: ${props => props.theme.spacing(4)};
`;

const StyledTypography = styled(Typography)`
  margin-top: ${props => props.theme.spacing(2)};
`;

const StyledButton = styled(Button)`
  margin-top: ${props => props.theme.spacing(2)};
`;

export const ErrorModal: React.FC = () => {
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
      <StyledBox>
        <Typography id="error-modal-title" variant="h6" component="h2">
          An Error Occurred
        </Typography>
        <StyledTypography id="error-modal-description">
          {message}
        </StyledTypography>
        <StyledButton onClick={handleClose}>
          Close
        </StyledButton>
      </StyledBox>
    </Modal>
  );
};

export default ErrorModal;