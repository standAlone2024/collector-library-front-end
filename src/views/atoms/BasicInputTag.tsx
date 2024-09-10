import React from 'react';
import styled from 'styled-components';

export interface BasicTagProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  text_color?: string;
  type?: string;
}

const Container = styled.input<{ text_color?: string }>`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  font-size: 16px;
  color: ${props => props.text_color || props.theme.colors.text};
  &::placeholder {
    color: ${props => props.theme.colors.secondary};
  }
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const BasicInputTag: React.FC<BasicTagProps> = ({ value, onChange, hint, text_color, type = "text" }) => {
  return (
    <Container 
      type={type}
      placeholder={hint}
      text_color={text_color}
      value={value}
      onChange={onChange}
    />
  );
};

export default BasicInputTag;