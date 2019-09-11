import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeZJComponentsLevel } from '../../../../store/zj-components/actions';
import { ChangeZJComponentsLevel } from '../../../../store/zj-components/types';

import ComponentLevelItem from './ComponentLevelItem';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

import './index.css';

type IComponentLevelProps = {
  components: IZJComponent[];
  changeComponentLevel: ({ id, index }: ChangeZJComponentsLevel) => void;
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  outline: 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
  top: draggableStyle.top ? draggableStyle.top - 94 : 0,
  left: draggableStyle.left ? draggableStyle.left - 1207 + 292 + 16 : 0,
});

const getListStyle = (isDraggingOver: any, level: number) => ({
  // background: isDraggingOver ? 'lightblue' : 'white',
  paddingLeft: level * 8,
});

class ComponentLevels extends React.PureComponent<IComponentLevelProps, {}> {
  renderTree = (
    curLevelComponents: IZJComponent[],
    components: IZJComponent[],
    level: number
  ) => {
    return curLevelComponents.map((comp, index) => (
      <Draggable draggableId={comp.id} key={comp.id} index={index}>
        {(dragProvided, dragSnapshot) => (
          <div>
            <div
              ref={dragProvided.innerRef}
              {...dragProvided.draggableProps}
              {...dragProvided.dragHandleProps}
              style={getItemStyle(
                dragSnapshot.isDragging,
                dragProvided.draggableProps.style
              )}
            >
              <ComponentLevelItem component={comp}></ComponentLevelItem>
              {comp.hasChildren && comp.children.length > 0 && (
                <Droppable droppableId={comp.id} type={comp.id} key={comp.id}>
                  {(droppableProvided, droppableSnapshot) => (
                    <div
                      ref={droppableProvided.innerRef}
                      style={getListStyle(droppableSnapshot.isDraggingOver, level)}
                    >
                      {this.renderTree(
                        components.filter(c => c.parent === comp.id),
                        components,
                        level + 1
                      )}
                      {droppableProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </div>
            {dragProvided.placeholder}
          </div>
        )}
      </Draggable>
    ));
  };

  onChangeComponentLevel = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    this.props.changeComponentLevel({
      id: this.props.components[oldIndex].id,
      index: newIndex,
    });
  };

  onDragEnd = (result: any) => {
    console.log('lkkk', result);
    if (!result.destination) {
      return;
    }
    this.onChangeComponentLevel({
      oldIndex: result.source.index,
      newIndex: result.destination.index,
    });
  };

  render() {
    const { components } = this.props;

    const firstLevelComponents = components.filter(c => c.parent === '');

    return components.length !== 0 ? (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" type="droppableItem">
            {(dropProvided, dropSnapshot) => (
              <div
                ref={dropProvided.innerRef}
                style={getListStyle(dropSnapshot.isDraggingOver, 1)}
              >
                {this.renderTree(firstLevelComponents, components, 1)}
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

// const ComponentLevels: React.FC<IComponentLevelProps> = ({
//   components,
//   changeComponentLevel,
// }) => {
//   const onChangeComponentLevel = ({
//     oldIndex,
//     newIndex,
//   }: {
//     oldIndex: number;
//     newIndex: number;
//   }) => {
//     changeComponentLevel({ id: components[oldIndex].id, index: newIndex });
//   };

//   const firstLevelComponents = components.filter(c => c.parent === '');

//   const renderTree = (
//     curLevelComponents: IZJComponent[],
//     components: IZJComponent[],
//     level: number
//   ) => {
//     return curLevelComponents.map((comp, index) => (
//       <Draggable draggableId={comp.id} key={comp.id} index={index}>
//         {(dragProvided, dragSnapshot) => (
//           <div>
//             {console.log(dragProvided.draggableProps.style)}
//             <div
//               ref={dragProvided.innerRef}
//               {...dragProvided.draggableProps}
//               {...dragProvided.dragHandleProps}
//               style={getItemStyle(
//                 dragSnapshot.isDragging,
//                 dragProvided.draggableProps.style
//               )}
//             >
//               {comp.hasChildren && comp.children.length > 0 ? (
//                 <div>
//                   <ComponentLevelItem
//                     component={comp}
//                     dragHandleProps={{}}
//                   ></ComponentLevelItem>
//                   <Droppable droppableId={comp.id} type={comp.id} key={comp.id}>
//                     {(droppableProvided, droppableSnapshot) => (
//                       <div
//                         ref={droppableProvided.innerRef}
//                         style={getListStyle(droppableSnapshot.isDraggingOver, level)}
//                       >
//                         {renderTree(
//                           components.filter(c => c.parent === comp.id),
//                           components,
//                           level + 1
//                         )}
//                       </div>
//                     )}
//                   </Droppable>
//                 </div>
//               ) : (
//                 <ComponentLevelItem
//                   component={comp}
//                   dragHandleProps={{}}
//                 ></ComponentLevelItem>
//               )}
//             </div>
//             {dragProvided.placeholder}
//           </div>
//         )}
//       </Draggable>
//     ));
//   };

//   const onDragEnd = (result: any) => {
//     console.log('lkkk', result);
//     if (!result.destination) {
//       return;
//     }
//     onChangeComponentLevel({
//       oldIndex: result.source.index,
//       newIndex: result.destination.index,
//     });
//   };

//   return components.length !== 0 ? (
//     <div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="droppable" type="droppableItem">
//           {(dropProvided, dropSnapshot) => (
//             <div
//               ref={dropProvided.innerRef}
//               style={getListStyle(dropSnapshot.isDraggingOver, 1)}
//             >
//               {renderTree(firstLevelComponents, components, 1)}
//               {dropProvided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   ) : (
//     <div>请添加组件</div>
//   );
// };

const mapStateToProps = (props: any) => ({
  components: props.components,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeComponentLevel: ({ id, index }: ChangeZJComponentsLevel) =>
    dispatch(changeZJComponentsLevel({ id, index })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentLevels);
