import React from 'react';
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

type IDragScaleWrapperProps = {
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

class DragScaleWrapper extends React.Component<IDragScaleWrapperProps, {}> {
  // 记录每一次的拉伸的距离，如果是 hook 则不需要
  prevAddSize = { addWidth: 0, addHeight: 0 };

  onRescale = (addWidth: number, addHeight: number) => {
    const { id, size, changeZJComponentSize } = this.props;
    console.log('当前改变了多少', addWidth, addHeight);
    console.log('当前的宽高', size.width, size.height);
    changeZJComponentSize({
      id,
      width: size.width + addWidth - this.prevAddSize.addWidth,
      height: size.height + addHeight - this.prevAddSize.addHeight,
    });
    this.prevAddSize = { addWidth, addHeight };
  };

  onRescaleEnd = () => {
    console.log('shuxingle ');
    this.prevAddSize = { addWidth: 0, addHeight: 0 };
  };

  onSelected = () => {
    this.props.changeZJComponentIsSelected({ id: this.props.id });
  };

  render() {
    const { parentWidth, parentHeight, Component, size, isSelected } = this.props;
    console.log(this.prevAddSize);
    console.log(size, isSelected);

    return (
      <DragAndScale
        maxWidth={parentWidth - size.width}
        maxHeight={parentHeight - size.height}
        minHeight={size.height}
        minWidth={size.width}
        onRescale={this.onRescale}
        onRescaleEnd={this.onRescaleEnd}
        isSelected={isSelected}
        onClick={this.onSelected}
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
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeZJComponentSize: (playload: any) => dispatch(changeZJComponentSize(playload)),
  changeZJComponentIsSelected: (playload: any) =>
    dispatch(changeZJComponentIsSelected(playload)),
});

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    forwardRef: true,
  }
)(DragScaleWrapper);
