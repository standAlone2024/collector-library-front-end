import React from 'react';
import styled from 'styled-components';

export interface BasicButtonProps<T = void> {
  background_color?: string | ((props: any) => string);
  label: string;
  margin?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => T;
}

const StyledButton = styled.button<{ $background_color?: string | ((props: any) => string), $margin?: string }>`
  display: flex;
  margin: ${props => props.$margin || '0px'};
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  background-color: ${props => {
    if (typeof props.$background_color === 'function') {
      return props.$background_color(props);
    }
    return props.$background_color || props.theme.colors.primary;
  }};
  color: ${props => {
    const bgColor = typeof props.$background_color === 'function' ? props.$background_color(props) : (props.$background_color || props.theme.colors.primary);
    return bgColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
  }};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

export const BasicButton = <T,>({ background_color, label, margin, onClick }: BasicButtonProps<T>): React.ReactElement => {
  return (
    <StyledButton $background_color={background_color} $margin={margin} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default BasicButton;