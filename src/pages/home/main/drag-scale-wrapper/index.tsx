import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MenuProvider } from 'react-contexify';
import DragAndScale from './DragAndScale';
import MultiSelectedContextMenu from './MultiSelectedContextMenu';
import {
  changeZJComponentIsSelected,
  changeZJComponentSize,
  changeZJComponentPosition,
  multiSelectedZJComponent,
  moveMultiSelectedZJComponentAction,
} from '../../../../store/zj-components/actions';
import {
  ChangeZJComponentIsSelectedAction,
  ChangeZJComponentSizeAction,
  ChangeZJComponentPositionAction,
  MoveMultiSelectedZJComponentAction,
} from '../../../../store/zj-components/types';
import { setActiveZJComponent } from '../../../../store/active-zj-component/actions';

type IProps = {
  parentWidth: number;
  parentHeight: number;
  multiSelectedComponents: IMultiSelectedComponents[];
  tempMultiSelectedIds: string[];
  needMultiSelecteing: boolean;
  onCombine: (event: MouseEvent) => void;
  onCancelCombine: (event: MouseEvent, componentId: string) => void;
  changeZJComponentIsSelected: (playload: ChangeZJComponentIsSelectedAction) => void;
  setActiveZJComponent: (id: string) => void;
  changeZJComponentSize: (playload: ChangeZJComponentSizeAction) => void;
  changeZJComponentPosition: (playload: ChangeZJComponentPositionAction) => void;
  moveMultiSelectedZJComponentAction: (
    playload: MoveMultiSelectedZJComponentAction
  ) => void;
  multiSelectedZJComponent: (ids: string[]) => void;
  customPerproties: object;
} & {
  component: IZJComponent;
};

const DragScaleWrapper: React.FC<IProps> = ({
  parentWidth,
  parentHeight,
  component,
  needMultiSelecteing,
  multiSelectedComponents,
  customPerproties,
  tempMultiSelectedIds,
  onCombine,
  onCancelCombine,
  changeZJComponentIsSelected,
  setActiveZJComponent,
  changeZJComponentSize,
  changeZJComponentPosition,
  multiSelectedZJComponent,
  moveMultiSelectedZJComponentAction,
  children,
}) => {
  const { id, size, isSelected, type: Component, position, hasChildren } = component;
  const isInMultiSelected =
    multiSelectedComponents.filter(msc => msc.componentIds.includes(id)).length !== 0;

  const onRescale = (addWidth: number, addHeight: number) => {
    const newSize = {
      width: (addWidth + size.width <= 0 ? 0 : addWidth) + size.width,
      height: (addHeight + size.height <= 0 ? 0 : addHeight) + size.height,
    };

    changeZJComponentSize({
      id,
      width: newSize.width,
      height: newSize.height,
    });
  };

  const onRemove = (addLeft: number, addTop: number) => {
    const msc = multiSelectedComponents.filter(msc => msc.componentIds.includes(id));

    if (tempMultiSelectedIds.length > 0) {
      moveMultiSelectedZJComponentAction({
        ids: tempMultiSelectedIds,
        addLeft,
        addTop,
      });
      return;
    }

    if (msc.length !== 0) {
      moveMultiSelectedZJComponentAction({
        ids: msc[0].componentIds,
        addLeft,
        addTop,
      });
    } else {
      const maxWidth = parentWidth - size.width;
      const maxHeight = parentHeight - size.height;
      const newPosition = {
        left:
          position.left + addLeft < 0
            ? 0
            : position.left + addLeft > maxWidth
            ? maxWidth
            : position.left + addLeft,
        top:
          position.top + addTop < 0
            ? 0
            : position.top + addTop > maxHeight
            ? maxHeight
            : position.top + addTop,
      };

      changeZJComponentPosition({ id, ...newPosition });
    }
  };

  const onSelected = () => {
    const msc = multiSelectedComponents.filter(msc => msc.componentIds.includes(id));
    setActiveZJComponent(id);

    if (tempMultiSelectedIds.length > 0) {
      multiSelectedZJComponent(tempMultiSelectedIds);
      return;
    }

    if (msc.length !== 0) {
      multiSelectedZJComponent(msc[0].componentIds);
    } else {
      changeZJComponentIsSelected({ id });
    }
  };

  return (
    <DragAndScale
      position={position}
      onRescale={onRescale}
      onMove={onRemove}
      isSelected={isSelected}
      onSelected={onSelected}
    >
      <MenuProvider id={`${id}`}>
        <div>
          <Component
            style={{
              width: size.width,
              height: size.height,
              border: isSelected ? `1px dashed grey` : `none`,
              textAlign: `center`,
              lineHeight: `${size.height}px`,
              verticalAlign: `middle`,
            }}
            {...customPerproties}
          >
            {hasChildren && children}
          </Component>
        </div>
      </MenuProvider>
      <MultiSelectedContextMenu
        id={`${id}`}
        isShowCombine={needMultiSelecteing}
        isShowCancelCombine={isInMultiSelected}
        onCombine={e => onCombine(e.event)}
        onCancelCombine={e => onCancelCombine(e.event, id)}
      />
    </DragAndScale>
  );
};

const mapStateToProps = (state: any) => ({
  multiSelectedComponents: state.multiSelectedComponents,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeZJComponentSize: (payload: ChangeZJComponentSizeAction) =>
    dispatch(changeZJComponentSize(payload)),
  changeZJComponentIsSelected: (payload: ChangeZJComponentIsSelectedAction) =>
    dispatch(changeZJComponentIsSelected(payload)),
  setActiveZJComponent: (id: string) => dispatch(setActiveZJComponent({ id })),
  changeZJComponentPosition: (payload: ChangeZJComponentPositionAction) =>
    dispatch(changeZJComponentPosition(payload)),
  multiSelectedZJComponent: (ids: string[]) =>
    dispatch(multiSelectedZJComponent({ ids })),
  moveMultiSelectedZJComponentAction: (payload: MoveMultiSelectedZJComponentAction) =>
    dispatch(moveMultiSelectedZJComponentAction(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragScaleWrapper);
