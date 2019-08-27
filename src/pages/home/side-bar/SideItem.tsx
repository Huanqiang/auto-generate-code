import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addZJComponent } from '../../../store/zj-components/actions';
import { AddZJComponentAction } from '../../../store/zj-components/types';

import './index.css';

type Props = {
  component: IComponentClass;
  addZJComponent: (playload: AddZJComponentAction) => void;
};

const SideItem: React.FC<Props> = ({ component, addZJComponent }) => {
  const onCreateComponent = () => {
    addZJComponent({
      type: component.type,
      customPerproties: component.customPerproties,
    });
  };

  return (
    <div className="home_left-sider_item" onClick={onCreateComponent}>
      <div className="home_left-sider_item_img"></div>
      <span className="home_left-sider_item_title">{component.title}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addZJComponent: (playload: any) => dispatch(addZJComponent(playload)),
});

export default connect(
  null,
  mapDispatchToProps
)(SideItem);
