import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeZJComponentIsSelected } from '../../../../store/zj-components/actions';
import './index.css';

type IComponentLevelItemProps = {
  component: IZJComponent;
  changeComponentIsSelected: (id: string) => void;
};

const ComponentLevelItem: React.FC<IComponentLevelItemProps> = ({
  component,
  changeComponentIsSelected,
}) => {
  const className = component.isSelected
    ? 'component-level_item selected'
    : 'component-level_item';

  const onChangeZJComponentIsSelected = () => {
    changeComponentIsSelected(component.id);
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
});

export default connect(
  null,
  mapDispatchToProps
)(ComponentLevelItem);
