import React from 'react';
import styled from 'styled-components';
import BasicThumbnail, { BasicThumbnailProps as BasicThumbnailProps } from '../atoms/BasicThumbnail'

const ThumbnailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
`;

const ThumbnailItem = styled.div`
  //필요 시 추가 예정
`;

interface ThumbListComponentProps {
  thumbnails: BasicThumbnailProps[];
}

export const ThumbListComponent: React.FC<ThumbListComponentProps> = ({ thumbnails }) => {
  return (
    <ThumbnailContainer>
      {thumbnails.map((thumbnail, index) => (
        <ThumbnailItem key={index}>
          <BasicThumbnail label={thumbnail.label} img_url={thumbnail.img_url} background_color={thumbnail.background_color} />
        </ThumbnailItem>
      ))}
    </ThumbnailContainer>
  );
};

export default ThumbListComponent;