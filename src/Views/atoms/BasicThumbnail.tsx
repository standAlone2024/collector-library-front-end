import React from 'react';
import styled from 'styled-components';

export interface BasicThumbnailProps{
    label: string;
    img_url?: string;
    background_color?: string;
}

const StyleBack = styled.div<{
    $background_color?: string;
}>`
    display: flex;
    flex-direction: column;
    align-items: center;  
    padding: 10px;
    background-color: ${props => props.$background_color || 'gray'};
`;

const ThumbImg = styled.img`
    padding: 5px;
    width: 150px; 
    height: 150px; 
    // background-color: red; //영역 확인용
`;

const BasicThumbnail: React.FC<BasicThumbnailProps> = ({ label, img_url, background_color}) => {
  return (
    <StyleBack $background_color={background_color}>
        <ThumbImg src={img_url}/>
        <span>{label}</span>
    </StyleBack>
  );
};

export default BasicThumbnail;
