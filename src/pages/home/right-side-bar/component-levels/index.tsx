import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeZJComponentsLevel } from '../../../../store/zj-components/actions';
import { ChangeZJComponentsLevel } from '../../../../store/zj-components/types';
import PortalComponentLevelItem from './PortalComponentLevelItem';

import ComponentLevelItem from '../component-level-item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type IComponentLevelProps = {
  components: IZJComponent[];
  changeComponentLevel: (payload: ChangeZJComponentsLevel) => void;
};

const getListStyle = (isDraggingOver: any, level: number) => ({
  paddingLeft: level * 8,
});

class ComponentLevels extends React.PureComponent<IComponentLevelProps, {}> {
  renderTree = (components: IZJComponent[], level: number) => {
    return components.map((comp, index) => (
      <Draggable draggableId={comp.id} key={comp.id} index={index}>
        {(dragProvided, dragSnapshot) => (
          <div>
            <PortalComponentLevelItem
              dragProvided={dragProvided}
              dragSnapshot={dragSnapshot}
            >
              <ComponentLevelItem component={comp}></ComponentLevelItem>
              {comp.hasChildren && comp.children.length > 0 && (
                <Droppable droppableId={comp.id} type={comp.id} key={comp.id}>
                  {(droppableProvided, droppableSnapshot) => (
                    <div
                      ref={droppableProvided.innerRef}
                      style={getListStyle(droppableSnapshot.isDraggingOver, level)}
                    >
                      {this.renderTree(comp.children, level + 1)}
                      {droppableProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </PortalComponentLevelItem>
            {dragProvided.placeholder}
          </div>
        )}
      </Draggable>
    ));
  };

  onChangeComponentLevel = (result: any) => {
    if (!result.destination) {
      return;
    }
    this.props.changeComponentLevel({
      id: result.draggableId,
      parentId: result.type === 'droppableItem' ? undefined : result.type,
      index: result.destination.index,
    });
  };

  render() {
    const { components } = this.props;

    return components.length !== 0 ? (
      <div>
        <DragDropContext onDragEnd={this.onChangeComponentLevel}>
          <Droppable droppableId="droppable" type="droppableItem">
            {(dropProvided, dropSnapshot) => (
              <div
                ref={dropProvided.innerRef}
                style={getListStyle(dropSnapshot.isDraggingOver, 1)}
              >
                {this.renderTree(components, 1)}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    ) : (
      <div>请添加组件</div>
    );
  }
}

const mapStateToProps = (props: any) => ({
  components: props.components,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeComponentLevel: (payload: ChangeZJComponentsLevel) =>
    dispatch(changeZJComponentsLevel(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentLevels);
