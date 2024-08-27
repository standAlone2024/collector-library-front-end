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
  // onClick: () => void;
}

export const ThumbListComponent: React.FC<ThumbListComponentProps> = ({ thumbnails }) => {
  return (
    <ThumbnailContainer>
      {thumbnails.map((thumbnail, index) => (
        <ThumbnailItem key={index}>
          <BasicThumbnail 
            key={index}
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