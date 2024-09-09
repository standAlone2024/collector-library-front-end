import React from 'react';
import styled from 'styled-components';

export interface ImgButtonProps<T = void> {
  background_color: string | ((props: any) => string);
  label: string;
  img_path: string;
  onClick: () => T;
}

const Container = styled.button<{ $background_color: string | ((props: any) => string) }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  background-color: ${props => typeof props.$background_color === 'function' ? props.$background_color(props) : props.$background_color};
  color: ${props => props.$background_color === '#FFFFFF' ? '#000000' : '#FFFFFF'};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const BasicImageButton = <T,>({ background_color, label, img_path, onClick }: ImgButtonProps<T>): React.ReactElement => {
  return (
    <Container $background_color={background_color} onClick={onClick}>
      <Icon src={img_path} alt={label} />
      {label}
    </Container>
  );
};

export default BasicImageButton;