import React from 'react';
import styled from 'styled-components';

export interface BasicTagProps{
  tag: string;
  tag_color?: string;
}

const Container = styled.input<{ tag_color?: string }>`
  color: ${props => props.tag_color || 'black'};
`;

const BasicInputTag: React.FC<BasicTagProps> = ({ tag, tag_color }) => {
  return (
    <Container 
      type="text" /* input 요소의 타입 설정 */
      value={tag}
      tag_color={tag_color}
    />
  );
};

export default BasicInputTag;
