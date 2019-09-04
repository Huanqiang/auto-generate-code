import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addZJComponent } from '../../../store/zj-components/actions';
import { AddZJComponentAction } from '../../../store/zj-components/types';

import './index.css';

type Props = {
  componentClass: IComponentClass;
  addZJComponent: (playload: AddZJComponentAction) => void;
};

const SideItem: React.FC<Props> = ({ componentClass, addZJComponent }) => {
  const onCreateComponent = () => {
    addZJComponent({
      type: componentClass.type,
      tag: componentClass.tag,
      hasChildren: !!componentClass.children,
      customPerproties: componentClass.customPerproties,
    });
  };

  return (
    <div className="home_left-sider_item" onClick={onCreateComponent}>
      <div className="home_left-sider_item_img"></div>
      <span className="home_left-sider_item_title">{componentClass.title}</span>
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
