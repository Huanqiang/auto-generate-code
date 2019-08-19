import React from 'react';
import { useResizeScale } from '../scale';
import { useDraggable } from '../drag';

declare type IDragProps = {
  onRescale: (addWidth: number, addHeight: number) => void;
  onRescaleEnd?: () => void;
  onClick: () => void;
  isSelected: boolean;
  minHeight: number;
  minWidth: number;
  maxWidth: number;
  maxHeight: number;
  style?: any;
  children?: React.ReactNode;
};

let DragAndScale = (props: IDragProps) => {
  let {
    style,
    children,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    onRescale,
    onRescaleEnd,
    onClick,
    isSelected,
  } = props;
  const { point, scaleRef, ...drageOther } = useDraggable(maxWidth, maxHeight);
  const { size, ...scaleOther } = useResizeScale(
    minWidth,
    minHeight,
    onRescale,
    onRescaleEnd
  );

  return (
    <div
      style={{
        ...style,
        position: `absolute`,
        transform: `translate(${point.left}px, ${point.right}px)`,
      }}
      {...drageOther}
      onClick={onClick}
    >
      {children}
      {isSelected && (
        <div
          ref={scaleRef}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            background: 'yellow',
            bottom: -5,
            right: -5,
            ...style,
          }}
          {...scaleOther}
        ></div>
      )}
    </div>
  );
};

export default DragAndScale;
