import React from 'react';
import styled from 'styled-components';
import BasicThumbnail, { BasicThumbnail as BasicThumbnailProps } from '../atoms/BasicThumbnail'

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

const ThumbListComponent: React.FC<ThumbListComponentProps> = ({ thumbnails }) => {
  return (
    <ThumbnailContainer>
      {thumbnails.map((thumbnail, index) => (
        <ThumbnailItem key={index}>
          <BasicThumbnail img_url={thumbnail.img_url} background_color={thumbnail.background_color} />
        </ThumbnailItem>
      ))}
    </ThumbnailContainer>
  );
};

export default ThumbListComponent;