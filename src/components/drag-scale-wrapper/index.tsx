import React from 'react';
import DragAndScale from './DragAndScale';

type IDragScaleWrapperProps = {
  parentWidth: number;
  parentHeight: number;
  Component: React.FC<{ style: any }>;
  onClearAllComponentsSelected: () => void;
};

type IDragScaleWrapperState = {
  size: { width: number; height: number };
  isSelected: boolean;
};

class DragScaleWrapper extends React.PureComponent<
  IDragScaleWrapperProps,
  IDragScaleWrapperState
> {
  state = {
    size: { width: 100, height: 100 },
    isSelected: true,
  };

  // 记录每一次的拉伸的距离，如果是 hook 则不需要
  prevAddSize = { addWidth: 0, addHeight: 0 };

  onRescale = (addWidth: number, addHeight: number) => {
    this.setState(
      (prevState: IDragScaleWrapperState) => ({
        size: {
          width: prevState.size.width + addWidth - this.prevAddSize.addWidth,
          height: prevState.size.height + addHeight - this.prevAddSize.addHeight,
        },
      }),
      () => {
        this.prevAddSize = { addWidth, addHeight };
      }
    );
  };

  onSelected = () => {
    this.props.onClearAllComponentsSelected();
    this.setState({ isSelected: true });
  };

  clearSelected = () => {
    this.setState({ isSelected: false });
  };

  render() {
    const { parentWidth, parentHeight, Component } = this.props;
    const { size, isSelected } = this.state;

    return (
      <DragAndScale
        maxWidth={parentWidth - size.width}
        maxHeight={parentHeight - size.height}
        minHeight={size.height}
        minWidth={size.width}
        onRescale={this.onRescale}
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

// const DragScaleWrapper: React.FC<IProps> = ({
//   parentWidth,
//   parentHeight,
//   Component,
// }) => {
//   const [size, setSize] = useState({ width: 100, height: 100 });

//   const onRescale = (addWidth: number, addHeight: number) => {
//     setSize({ width: size.width + addWidth, height: size.height + addHeight });
//   };

//   const { isSelected, onClick } = useIsSelected();

//   return (
//     <DragAndScale
//       maxWidth={parentWidth - size.width}
//       maxHeight={parentHeight - size.height}
//       minHeight={size.height}
//       minWidth={size.width}
//       onRescale={onRescale}
//       isSelected={isSelected}
//       onClick={onClick}
//     >
//       <Component
//         style={{
//           width: size.width,
//           height: size.height,
//           background: 'red',
//         }}
//       ></Component>
//     </DragAndScale>
//   );
// };

export default DragScaleWrapper;
