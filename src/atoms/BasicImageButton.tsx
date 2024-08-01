import React from 'react';
import styled from 'styled-components';

export interface ImgButtonProps<T = void> {
  background_color: string;
  label: string;
  img_path: string;
  onClick: () => T;
}

const Container = styled.div<{ 
    $background_color: string;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
}>`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
    align-items: ${props => props.alignItems || 'center'};
    gap: ${props => props.gap || '0'};
  padding: 10px 20px;
  border-radius: 5px; /* 모서리 둥글게 만들기 */
  border: 1px solid black;
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

const Icon = styled.img`
    padding: 5px;
    width: 12px; 
    height: 12px; 
`;

// 제네릭 타입을 사용하는 BasicButton 컴포넌트
export const BasicImageButton = <T,>({ background_color: background_color, label, img_path: img_path, onClick }: ImgButtonProps<T>): React.ReactElement => {
  return (
    <Container $background_color={background_color} onClick={onClick} direction='row'>
        <Icon src={img_path} />
        label
    </Container>
  );
};

export default BasicImageButton;
