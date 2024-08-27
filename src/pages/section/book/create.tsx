import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 55px; // Top 영역의 높이만큼 내림
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem; // Top 영역과의 여백 확보
  margin: 0.5rem;
  overflow: auto;
//   background-color: red;
`;

const LibraryBookCreate: React.FC = () => {
    return (
        <Container>
            LibraryBookCreate
        </Container>
    )
};

export default LibraryBookCreate;