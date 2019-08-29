import React, { useEffect, useRef } from 'react';
import { useMouseMove } from '../../../../components/mouse-move';

declare type IDragProps = {
  onRescale: (addWidth: number, addHeight: number) => void;
  onSelected: () => void;
  onMove: (top: number, left: number) => void;
  position: { top: number; left: number };
  isSelected: boolean;
  style?: any;
  children?: React.ReactNode;
};

let DragAndScale = (props: IDragProps) => {
  let { style, position, children, onRescale, onSelected, onMove, isSelected } = props;
  const { move: size, onMouseDown: onScaling } = useMouseMove();
  const { move: point, onMouseDown: onMouseDraging } = useMouseMove();
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onRescale(size.addX, size.addY);
  }, [size]);

  useEffect(() => {
    onMove(point.addX, point.addY);
  }, [point]);

  const onDraging = (e: React.MouseEvent) => {
    onSelected();
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
