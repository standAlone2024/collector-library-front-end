import React from 'react';
import styled from 'styled-components';
import { FiInfo, FiMapPin, FiMessageSquare } from 'react-icons/fi';

const BottomContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.theme.sizes.footerHeight};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.8rem;
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

export const Bottom: React.FC = () => {
  return (
    <BottomContainer>
      <FooterItem>
        <FiInfo />
        <span>약관</span>
      </FooterItem>
      <FooterItem>
        <FiMessageSquare />
        <span>광고문의</span>
      </FooterItem>
      <FooterItem>
        <FiMapPin />
        <span>주소</span>
      </FooterItem>
    </BottomContainer>
  );
};

export default Bottom;