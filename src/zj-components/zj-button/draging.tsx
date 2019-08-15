import React, { useState, useCallback, useRef } from 'react';
import { useResizeScale } from '../../components/scale';
import { useDraggable } from '../../components/drag';

declare type IDragProps = {
  onRescale: (addWidth: number, addHeight: number) => void;
  minHeight: number;
  minWidth: number;
  maxWidth: number;
  maxHeight: number;
  style?: any;
  children?: React.ReactNode;
};

let Drag = (props: IDragProps) => {
  let {
    style,
    children,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    onRescale,
  } = props;
  const { point, scaleRef, ...drageOther } = useDraggable(maxWidth, maxHeight);
  const { size, ...scaleOther } = useResizeScale(
    minWidth,
    minHeight,
    onRescale
  );

  return (
    <div
      style={{
        ...style,
        position: `absolute`,
        transform: `translate(${point.left}px, ${point.right}px)`,
      }}
      {...drageOther}
    >
      {children}
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
    </div>
  );
};

export default Drag;
