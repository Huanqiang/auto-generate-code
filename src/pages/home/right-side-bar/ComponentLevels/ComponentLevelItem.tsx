import React from 'react';

import './index.css';

type IComponentLevelItemProps = {
  component: IZJComponent;
  onChangeComponentLevel: (id: string) => void;
};

const ComponentLevelItem: React.FC<IComponentLevelItemProps> = ({
  component,
  onChangeComponentLevel,
}) => {
  return (
    <div className="component-level_item">
      {component.id}{' '}
      <div onClick={() => onChangeComponentLevel(component.id)}>
        <div className="component-level_item_drag-bar"></div>
      </div>
    </div>
  );
};

export default ComponentLevelItem;
