import React from 'react';

import './index.css';

type IComponentLevelItemProps = {
  component: IZJComponent;
};

const ComponentLevelItem: React.FC<IComponentLevelItemProps> = props => {
  return (
    <div className="component-level_item">
      <span>{props.component.id} </span>
      <div>
        <div className="component-level_item_drag-bar"></div>
      </div>
    </div>
  );
};

export default ComponentLevelItem;
