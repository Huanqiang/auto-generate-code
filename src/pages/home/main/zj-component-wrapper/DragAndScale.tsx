import React, { useEffect, useRef, useCallback } from 'react';
import { useMouseMove } from '../../../../components/mouse-move/index';

declare type IDragProps = {
  onRescale: (addWidth: number, addHeight: number) => void;
  onSelected: (e: React.MouseEvent) => void;
  onMove: (top: number, left: number) => void;
  onMoveEnd: ({ x, y }: { x: number; y: number }) => void;
  position: { top: number; left: number };
  isSelected: boolean;
  style?: any;
  children?: React.ReactNode;
};

let DragAndScale = (props: IDragProps) => {
  let {
    style,
    position,
    children,
    onRescale,
    onSelected,
    onMove,
    onMoveEnd,
    isSelected,
  } = props;
  const { move: size, onMouseDown: onScaling } = useMouseMove();
  const { move: point, onMouseDown: onMouseDraging } = useMouseMove({
    onDragingStart: onSelected,
    onDragingEnd: onMoveEnd,
  });
  const scaleRef = useRef<HTMLDivElement>(null);

  const rescale = useCallback(() => {
    onRescale(size.addX, size.addY);
  }, [size]);

  const move = useCallback(() => {
    onMove(point.addX, point.addY);
  }, [point]);

  useEffect(() => {
    rescale();
  }, [rescale]);

  useEffect(() => {
    move();
  }, [move]);

  const onDraging = (e: React.MouseEvent) => {
    if (e.target === scaleRef.current) {
      return;
    }
    onMouseDraging(e);
  };

  return (
    <div
      style={{
        ...style,
        position: `absolute`,
        userSelect: `none`,
        transform: `translate(${position.left}px, ${position.top}px)`,
      }}
      onMouseDown={onDraging}
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
          onMouseDown={onScaling}
        ></div>
      )}
    </div>
  );
};

export default DragAndScale;
