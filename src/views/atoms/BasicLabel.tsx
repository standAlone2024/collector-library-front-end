import React from 'react';
import styled from 'styled-components';
import { BASIC_FONT_SIZE } from '@util/constans';

export interface BasicLabelProps {
  description: string;
  font_size?: number;
  font_color?: string | ((props: any) => string);
}

const StyledLabel = styled.p<{
  $font_color?: string | ((props: any) => string);
  $font_size?: number;
}>`
  color: ${props => typeof props.$font_color === 'function' ? props.$font_color(props) : props.$font_color || 'black'};
  font-size: ${props => props.$font_size || BASIC_FONT_SIZE}px;
`;

export const BasicLabel: React.FC<BasicLabelProps> = ({ description, font_size, font_color }) => {
  return (
    <StyledLabel $font_color={font_color} $font_size={font_size}>
        {description}
    </StyledLabel>
  );
};

export default BasicLabel;