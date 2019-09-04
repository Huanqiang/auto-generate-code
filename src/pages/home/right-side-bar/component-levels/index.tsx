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

  const firstLevelComponents = components.filter(c => c.parent === '');

  const renderTree = (
    curLevelComponents: IZJComponent[],
    components: IZJComponent[],
    level: number
  ) => {
    return (
      <List
        values={curLevelComponents}
        onChange={onChangeComponentLevel}
        renderList={({ children, props }) => (
          <div
            {...props}
            style={{ position: `relative`, padding: 8, paddingLeft: level * 8 }}
          >
            {children}
          </div>
        )}
        renderItem={({ value, props }) => (
          <li {...props} style={{ ...props.style, listStyleType: 'none' }}>
            {value.children && value.children.length > 0 ? (
              renderTree(
                components.filter(c => value.children.includes(c.id)),
                components,
                level + 1
              )
            ) : (
              <ComponentLevelItem component={value}></ComponentLevelItem>
            )}
          </li>
        )}
      />
    );
  };

  return components.length !== 0 ? (
    renderTree(firstLevelComponents, components, 1)
  ) : (
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
