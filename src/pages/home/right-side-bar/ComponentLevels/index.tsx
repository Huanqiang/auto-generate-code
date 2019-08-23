import React from 'react';
// import { Dispatch } from 'react';
import { connect } from 'react-redux';
// import { changeZJComponentsLevel } from '../../../../store/zj-components/actions';
import ComponentLevelItem from './ComponentLevelItem';

import './index.css';

type IComponentLevelProps = {
  components: IZJComponent[];
};

const ComponentLevels: React.FC<IComponentLevelProps> = ({ components }) => {
  const changeComponentLevel = (id: string) => {
    console.log(id);
  };
  return (
    <div className="component-level">
      {components.map(component => (
        <ComponentLevelItem
          key={component.id}
          component={component}
          onChangeComponentLevel={changeComponentLevel}
        ></ComponentLevelItem>
      ))}
    </div>
  );
};

const mapStateToProps = (props: any) => ({
  components: props.components,
});

// const mapDispatchToProps = (dispatch: Dispatch) => {};

export default connect(
  mapStateToProps,
  null
)(ComponentLevels);
