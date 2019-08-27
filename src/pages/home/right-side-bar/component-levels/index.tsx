import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeZJComponentsLevel } from '../../../../store/zj-components/actions';
import ComponentLevelItem from './ComponentLevelItem';
import { List } from 'react-movable';

import './index.css';

type IComponentLevelProps = {
  components: IZJComponent[];
  changeComponentLevel: (id: string, index: number) => void;
};

const ComponentLevels: React.FC<IComponentLevelProps> = ({
  components,
  changeComponentLevel,
}) => {
  const onChangeComponentLevel = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    changeComponentLevel(components[oldIndex].id, newIndex);
  };

  return components.length !== 0 ? (
    <List
      values={components}
      onChange={onChangeComponentLevel}
      renderList={({ children, props }) => (
        <div {...props} style={{ position: `relative` }}>
          {children}
        </div>
      )}
      renderItem={({ value, props }) => (
        <li {...props} style={{ ...props.style, listStyleType: 'none' }}>
          <ComponentLevelItem component={value}>{`${value}`}</ComponentLevelItem>
        </li>
      )}
    />
  ) : (
    // <>
    //   {components.map(component => (
    //     <ComponentLevelItem
    //       key={component.id}
    //       component={component}
    //       onChangeComponentLevel={onChangeComponentLevel}
    //     ></ComponentLevelItem>
    //   ))}
    // </>
    <div>请添加组件</div>
  );
};

const mapStateToProps = (props: any) => ({
  components: props.components,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeComponentLevel: (id: string, index: number) =>
    dispatch(changeZJComponentsLevel({ id, index })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentLevels);
