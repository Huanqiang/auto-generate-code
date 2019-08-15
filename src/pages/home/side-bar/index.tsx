import React from 'react';
import SideItem from './SideItem';

import './index.css';

type Props = {
  components: IComponentClass[];
  onCreateComponent: (id: IComponentClass) => void;
};

const SideBar: React.FC<Props> = ({ components, onCreateComponent }) => {
  return (
    <div className="home_left-sider">
      {components.map(c => (
        <SideItem
          key={c.id}
          component={c}
          onCreateComponent={onCreateComponent}
        ></SideItem>
      ))}
    </div>
  );
};

export default SideBar;
