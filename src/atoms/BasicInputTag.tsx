import React from 'react';
import styled from 'styled-components';

export interface BasicTagProps{
  hint?: string;
  text_color?: string;
}

const Container = styled.input<{ text_color?: string }>`
  color: ${props => props.text_color || 'black'};
`;

const BasicInputTag: React.FC<BasicTagProps> = ({ hint, text_color }) => {
  return (
    <Container 
      type="text" /* input 요소의 타입 설정 */
      placeholder = {hint}
      text_color={text_color}
    />
  );
};

export default BasicInputTag;
