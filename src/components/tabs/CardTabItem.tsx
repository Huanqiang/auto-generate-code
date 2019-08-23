import React from 'react';
import './index.css';

type ICardTabItemProps = {
  title: string;
  isSelected: boolean;
  onSelected: () => void;
  icon?: string;
};

const CardTabItem: React.FC<ICardTabItemProps> = ({ title, icon }) => {
  return (
    <>
      {icon && <img src={icon} alt="tab icon"></img>} {title}
    </>
  );
};

export default CardTabItem;
