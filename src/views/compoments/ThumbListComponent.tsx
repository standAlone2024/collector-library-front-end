import React from 'react';
import styled from 'styled-components';
import BasicThumbnail, { BasicThumbnailProps } from '../atoms/BasicThumbnail'

const ThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ThumbnailItem = styled.div`
  // 추가 스타일이 필요하면 여기에 추가
`;

interface ThumbListComponentProps {
  thumbnails: BasicThumbnailProps[];
}

export const ThumbListComponent: React.FC<ThumbListComponentProps> = ({ thumbnails }) => {
  return (
    <ThumbnailContainer>
      {thumbnails.map((thumbnail, index) => (
        <ThumbnailItem key={index}>
          <BasicThumbnail 
            label={thumbnail.label} 
            target_id={thumbnail.target_id}
            menu_click_event={thumbnail.menu_click_event}
            thumb_img_url={thumbnail.thumb_img_url} 
            background_color={thumbnail.background_color}
            move_to_where={thumbnail.move_to_where}
          />
        </ThumbnailItem>
      ))}
    </ThumbnailContainer>
  );
};

export default ThumbListComponent;