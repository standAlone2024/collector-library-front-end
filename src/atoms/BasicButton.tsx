import React from 'react';
import styled from 'styled-components';

// 제네릭 타입을 사용하는 BasicButtonProps 인터페이스
export interface BasicButtonProps<T = void> {
  background_color: string;
  label: string;
  onClick: () => T;
}

const StyledButton = styled.button<{ $background_color: string }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${props => props.$background_color};
  color: black;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

// 제네릭 타입을 사용하는 BasicButton 컴포넌트
export const BasicButton = <T,>({ background_color: background_color, label, onClick }: BasicButtonProps<T>): React.ReactElement => {
  return (
    <StyledButton $background_color={background_color} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default BasicButton;
