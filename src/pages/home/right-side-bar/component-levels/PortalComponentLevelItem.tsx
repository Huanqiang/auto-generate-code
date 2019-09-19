import React from 'react';
import ReactDOM from 'react-dom';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

type IPortalComponentLevelItemPorps = {
  dragProvided: DraggableProvided;
  dragSnapshot: DraggableStateSnapshot;
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  outline: 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
  // top: draggableStyle.top ? draggableStyle.top - 94 : 0,
  // left: draggableStyle.left ? draggableStyle.left - 1207 + 292 + 16 : 0,
});

const portal: HTMLElement = document.createElement('div');
// portal.classList.add('my-super-cool-portal');

if (!document.body) {
  throw new Error('body not ready for portal creation!');
}

document.body.appendChild(portal);

class PortalComponentLevelItem extends React.Component<
  IPortalComponentLevelItemPorps,
  {}
> {
  render() {
    const { dragProvided, dragSnapshot, children } = this.props;

    const usePortal: boolean = dragSnapshot.isDragging;

    const child: React.ReactNode = (
      <div
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
        style={getItemStyle(dragSnapshot.isDragging, dragProvided.draggableProps.style)}
      >
        {children}
      </div>
    );

    if (!usePortal) {
      return child;
    }

    // if dragging - put the item in a portal
    return ReactDOM.createPortal(child, portal);
  }
}

export default PortalComponentLevelItem;
