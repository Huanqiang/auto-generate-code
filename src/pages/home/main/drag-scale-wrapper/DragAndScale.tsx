import React, { useEffect } from 'react';
import { useResizeScale } from '../../../../components/scale';
import { useDraggable } from '../../../../components/drag';

declare type IDragProps = {
  onRescale: (addWidth: number, addHeight: number) => void;
  onSelected: () => void;
  onMove: (top: number, left: number) => void;
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
    onSelected,
    onMove,
    isSelected,
  } = props;
  const { point, scaleRef, ...drageOther } = useDraggable(maxWidth, maxHeight);
  const { size, ...scaleOther } = useResizeScale(minWidth, minHeight);

  useEffect(() => {
    onRescale(size.addWidth, size.addHeight);
    // eslint-disable-next-line
  }, [size]);

  useEffect(() => {
    onMove(point.top, point.left);
  }, [point]);

  return (
    <div
      style={{
        ...style,
        position: `absolute`,
        userSelect: `none`,
        transform: `translate(${point.left}px, ${point.top}px)`,
      }}
      {...drageOther}
      onClick={onSelected}
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
