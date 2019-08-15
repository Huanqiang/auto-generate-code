import React from 'react';
import './index.css';

type Props = {
  component: IComponentClass;
  onCreateComponent: (id: IComponentClass) => void;
};

const SideItem: React.FC<Props> = ({ component, onCreateComponent }) => {
  return (
    <div
      className="home_left-sider_item"
      onClick={() => onCreateComponent(component)}
    >
      <div className="home_left-sider_item_img"></div>
      <span className="home_left-sider_item_title">{component.title}</span>
    </div>
  );
};

export default SideItem;
