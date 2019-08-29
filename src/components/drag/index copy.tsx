import React, { useState, useRef } from 'react';

let startX = 0;
let startY = 0;
export const useDraggable = (maxWidth: number, maxHeight: number) => {
  const [point, setPoint] = useState({ left: 0, top: 0 });
  const scaleRef = useRef<HTMLDivElement>(null);

  const draging = (e: MouseEvent) => {
    e.preventDefault();

    const movedX = e.pageX - startX;
    const movedY = e.pageY - startY;
    if (movedX === point.left && movedY === point.top) {
      return;
    }

    setPoint({
      left: movedX < 0 ? 0 : movedX > maxWidth ? maxWidth : movedX,
      top: movedY < 0 ? 0 : movedY > maxHeight ? maxHeight : movedY,
    });

    return false;
  };

  const dragEnd = (e: MouseEvent) => {
    document.removeEventListener('mousemove', draging);
    document.removeEventListener('mouseup', dragEnd);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target === scaleRef.current) {
      return;
    }
    document.addEventListener('mousemove', draging);
    document.addEventListener('mouseup', dragEnd);
    startX = e.pageX - point.left;
    startY = e.pageY - point.top;
  };

  return { point, scaleRef, onMouseDown };
};
