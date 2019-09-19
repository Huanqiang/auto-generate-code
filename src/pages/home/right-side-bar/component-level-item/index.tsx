import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeZJComponentIsSelected } from '../../../../store/zj-components/actions';
import { setActiveZJComponent } from '../../../../store/active-zj-component/actions';
import './index.css';

type IComponentLevelItemProps = {
  component: IZJComponent;
};

const ComponentLevelItem: React.FC<IComponentLevelItemProps> = ({ component }) => {
  const className = component.isSelected
    ? 'component-level_item selected'
    : 'component-level_item';

  const dispatch = useDispatch();
  const onChangeZJComponentIsSelected = useCallback(() => {
    dispatch(changeZJComponentIsSelected({ id: component.id }));
    dispatch(setActiveZJComponent({ id: component.id }));
  }, [dispatch, component.id]);

  return (
    <div className={className} onMouseDown={onChangeZJComponentIsSelected}>
      <span>{component.name}</span>
      <div>
        <div className="component-level_item_drag-bar"></div>
      </div>
    </div>
  );
};

export default ComponentLevelItem;
