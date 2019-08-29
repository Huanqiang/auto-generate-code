import React, { useCallback } from 'react';
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
} from '../../../../store/zj-components/actions';
import {
  ChangeZJComponentIsSelectedAction,
  ChangeZJComponentSizeAction,
  ChangeZJComponentPositionAction,
} from '../../../../store/zj-components/types';

type IProps = {
  parentWidth: number;
  parentHeight: number;
  multiSelectedComponents: IMultiSelectedComponents[];
  needMultiSelecteing: boolean;
  onCombine: (event: MouseEvent) => void;
  onCancelCombine: (event: MouseEvent, componentId: string) => void;
  changeZJComponentIsSelected: (playload: ChangeZJComponentIsSelectedAction) => void;
  changeZJComponentSize: (playload: ChangeZJComponentSizeAction) => void;
  changeZJComponentPosition: (playload: ChangeZJComponentPositionAction) => void;
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
  onCombine,
  onCancelCombine,
  changeZJComponentIsSelected,
  changeZJComponentSize,
  changeZJComponentPosition,
  multiSelectedZJComponent,
}) => {
  const { id, size, isSelected, type: Component } = component;
  const onRescale = useCallback(
    (addWidth: number, addHeight: number) => {
      // 实际上在某一次拖拽完成之前，本方法里的 size 都不会变，无论外部的 size 改变了多少次；
      changeZJComponentSize({
        id,
        width: size.width + addWidth,
        height: size.height + addHeight,
      });
    },
    [id, size, changeZJComponentSize]
  );

  const onRemove = useCallback(
    (top: number, left: number) => {
      changeZJComponentPosition({ id, top, left });
    },
    [id]
  );

  const onSelected = () => {
    const msc = multiSelectedComponents.filter(msc => msc.componentIds.includes(id));
    if (msc.length !== 0) {
      multiSelectedZJComponent(msc[0].componentIds);
    } else {
      changeZJComponentIsSelected({ id });
    }
  };

  const isInMultiSelected =
    multiSelectedComponents.filter(msc => msc.componentIds.includes(id)).length !== 0;

  // const onCombination = () => {};
  // const onCancelCombination = () => {};

  return (
    <DragAndScale
      maxWidth={parentWidth - size.width}
      maxHeight={parentHeight - size.height}
      minHeight={size.height}
      minWidth={size.width}
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
          ></Component>
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
  changeZJComponentSize: (playload: any) => dispatch(changeZJComponentSize(playload)),
  changeZJComponentIsSelected: (playload: any) =>
    dispatch(changeZJComponentIsSelected(playload)),
  changeZJComponentPosition: (playload: any) =>
    dispatch(changeZJComponentPosition(playload)),
  multiSelectedZJComponent: (ids: string[]) =>
    dispatch(multiSelectedZJComponent({ ids })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragScaleWrapper);
