import React from 'react';
import './index.css';

type ITabItemProps = {
  title: string;
  isSelected: boolean;
  onSelected: () => void;
  icon?: string;
};

const TabItem: React.FC<ITabItemProps> = ({ title, icon, isSelected, onSelected }) => {
  const className = `ZJ-default-tab-item${isSelected ? ' selected' : ''}`;
  return (
    <div className={className} onClick={onSelected}>
      {icon && <img src={icon} alt="image icon"></img>} {title}
    </div>
  );
};

export default TabItem;
