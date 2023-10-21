import React, { FC } from 'react';

import styled from 'styled-components';
import Palette from '../Color';

interface CustomButtonProps {
  label: string;
  badgeNumber?: number;
  onClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ label, badgeNumber, onClick }): JSX.Element => {
  return (
    <ButtonContainer onClick={onClick}>
      {label}
      {badgeNumber && badgeNumber > 0 ? <Badge>{badgeNumber}</Badge> : <></>}
    </ButtonContainer>
  );
};

export default CustomButton;

const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: -15px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  position: relative;
  padding: 4px 10px;
  border: 2px solid ${Palette.darkBlue};
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  &:hover {
    opacity: 0.5;
  }
`;
