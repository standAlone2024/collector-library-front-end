import React from 'react';
import styled from 'styled-components';

export interface BasicTagProps{
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  text_color?: string;
}

const Container = styled.input<{ text_color?: string }>`
  color: ${props => props.text_color || 'black'};
`;

export const BasicInputTag: React.FC<BasicTagProps> = ({ value, onChange, hint, text_color }) => {
  return (
    <Container 
      type="text" /* input 요소의 타입 설정 */
      placeholder = {hint}
      text_color={text_color}
      value={value}
      onChange={onChange}
    />
  );
};

export default BasicInputTag;
