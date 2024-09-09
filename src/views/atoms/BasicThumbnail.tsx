import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { S3_PATH } from '@util/constans';

export interface BasicThumbnailProps{
    label: string;
    target_id: number;
    menu_click_event: (id: number) => void;
    thumb_img_url?: string;
    background_color?: string;
    move_to_where?: string;
}

const StyleBack = styled.div<{
    $background_color?: string;
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: ${props => props.$background_color || props.theme.colors.background};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
`;

const ThumbImgContainer = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 4px;
    background-color: ${props => props.theme.colors.secondary};
`;

const ThumbImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const BottomArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  width: 100%;
`;

const CenteredSpan = styled.span`
  flex-grow: 1;
  text-align: center;
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.text};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20px;
`;

const SetImg = styled.img`
  width: 20px; 
  height: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const handleMove = (path: string) => {
    Router.push(path);
}

export const BasicThumbnail: React.FC<BasicThumbnailProps> = ({ label, target_id, menu_click_event, thumb_img_url: img_url, background_color, move_to_where}) => {
    if(move_to_where)
        return (
            <StyleBack 
                $background_color={background_color}
                onClick={() => handleMove(move_to_where)}>
                <ThumbImgContainer>
                    <ThumbImg src={img_url ? (S3_PATH + img_url) : '/icons/no_photography.png'} alt={label} />
                </ThumbImgContainer>
                <BottomArea>
                    <CenteredSpan>{label}</CenteredSpan>
                    <IconWrapper>
                        <SetImg 
                            src={'/icons/menu.png'}
                            onClick={(e) => {
                                e.stopPropagation();
                                menu_click_event(target_id);
                            }}
                            alt="Menu"
                        />
                    </IconWrapper>
                </BottomArea>
            </StyleBack>
        );
    else
        return (
            <StyleBack 
                $background_color={background_color}>
                <ThumbImgContainer>
                    <ThumbImg src={img_url} alt={label} />
                </ThumbImgContainer>
                <CenteredSpan>{label}</CenteredSpan>
            </StyleBack>
        );
};

export default BasicThumbnail;