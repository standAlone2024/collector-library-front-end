import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  margin: 0.5rem;
  overflow: auto;
`;

const LibraryBookCreate: React.FC = () => {
    return (
        <Container>
            LibraryBookCreate
        </Container>
    )
};

export default LibraryBookCreate;