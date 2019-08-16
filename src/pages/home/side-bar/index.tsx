import React from 'react';
import SideItem from './SideItem';

import './index.css';
import { components } from '../../../mock';

const SideBar: React.FC = () => {
  return (
    <div className="home_left-sider">
      {components.map(c => (
        <SideItem key={c.id} component={c}></SideItem>
      ))}
    </div>
  );
};

export default SideBar;
