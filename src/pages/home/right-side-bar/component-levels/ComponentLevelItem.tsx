import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeZJComponentIsSelected } from '../../../../store/zj-components/actions';
import { setActiveZJComponent } from '../../../../store/active-zj-component/actions';
import './index.css';

type IComponentLevelItemProps = {
  component: IZJComponent;
  changeComponentIsSelected: (id: string) => void;
  setActiveZJComponent: (id: string) => void;
};

const ComponentLevelItem: React.FC<IComponentLevelItemProps> = ({
  component,
  changeComponentIsSelected,
  setActiveZJComponent,
}) => {
  const className = component.isSelected
    ? 'component-level_item selected'
    : 'component-level_item';

  const onChangeZJComponentIsSelected = () => {
    changeComponentIsSelected(component.id);
    setActiveZJComponent(component.id);
  };
  return (
    <div className={className} onMouseDown={onChangeZJComponentIsSelected}>
      <span>{component.name}</span>
      <div>
        <div className="component-level_item_drag-bar"></div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeComponentIsSelected: (id: string) =>
    dispatch(changeZJComponentIsSelected({ id })),
  setActiveZJComponent: (id: string) => dispatch(setActiveZJComponent({ id })),
});

export default connect(
  null,
  mapDispatchToProps
)(ComponentLevelItem);
