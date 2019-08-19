import React, { useState, useCallback } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  changeZJComponentIsSelected,
  changeZJComponentSize,
} from '../../store/zj-components/actions';
import DragAndScale from './DragAndScale';
import {
  ChangeZJComponentIsSelectedAction,
  ChangeZJComponentSizeAction,
} from 'store/zj-components/types';

type IProps = {
  parentWidth: number;
  parentHeight: number;
  Component: React.FC<{ style: any }>;
  changeZJComponentIsSelected: (playload: ChangeZJComponentIsSelectedAction) => void;
  changeZJComponentSize: (playload: ChangeZJComponentSizeAction) => void;
} & {
  id: string;
  size: { width: number; height: number };
  isSelected: false;
};

const DragScaleWrapper: React.FC<IProps> = ({
  id,
  size,
  isSelected,
  parentWidth,
  parentHeight,
  Component,
  changeZJComponentIsSelected,
  changeZJComponentSize,
}) => {
  const onRescale = useCallback(
    (addWidth: number, addHeight: number) => {
      console.log('当前改变了多少', addWidth, addHeight);
      console.log('当前的宽高', size.width, size.height);
      // 实际上在某一次拖拽完成之前，本方法里的 size 都不会变，无论外部的 size 改变了多少次；
      changeZJComponentSize({
        id,
        width: size.width + addWidth,
        height: size.height + addHeight,
      });
    },
    [size]
  );

  const onSelected = () => {
    changeZJComponentIsSelected({ id });
  };

  console.log('每一次移动后的宽高', size.width, size.height);
  return (
    <DragAndScale
      maxWidth={parentWidth - size.width}
      maxHeight={parentHeight - size.height}
      minHeight={size.height}
      minWidth={size.width}
      onRescale={onRescale}
      isSelected={isSelected}
      onClick={onSelected}
    >
      <Component
        style={{
          width: size.width,
          height: size.height,
          background: 'red',
        }}
      ></Component>
    </DragAndScale>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeZJComponentSize: (playload: any) => dispatch(changeZJComponentSize(playload)),
  changeZJComponentIsSelected: (playload: any) =>
    dispatch(changeZJComponentIsSelected(playload)),
});

export default connect(
  null,
  mapDispatchToProps
)(DragScaleWrapper);
