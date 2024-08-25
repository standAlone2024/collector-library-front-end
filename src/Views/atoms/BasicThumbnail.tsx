import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';

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
    background-color: ${props => props.$background_color || 'gray'};
`;

const ThumbImg = styled.img`
    padding: 5px;
    width: 150px; 
    height: 150px; 
    // background-color: red; //영역 확인용
`;

const BottomArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  width: 100%; // 컨테이너의 너비를 100%로 설정
`;

const CenteredSpan = styled.span`
  flex-grow: 1;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // 오른쪽 정렬
  width: 20px; // 아이콘의 너비만큼 설정
`;

const SetImg = styled.img`
  width: 20px; 
  height: 20px; 
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
                <ThumbImg src={img_url}/>
                <BottomArea>
                    <CenteredSpan>{label}</CenteredSpan>
                    <IconWrapper>
                        <SetImg 
                            src={'/icons/menu.png'}
                            onClick={(e) => {
                                e.stopPropagation(); // 이벤트 버블링 방지
                                menu_click_event(target_id);
                            }}
                        />
                    </IconWrapper>
                </BottomArea>
            </StyleBack>
        );
    else
        return (
            <StyleBack 
                $background_color={background_color}>
                <ThumbImg src={img_url}/>
                <span>{label}</span>
            </StyleBack>
        );
};

export default BasicThumbnail;
