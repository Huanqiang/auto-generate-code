import React, { useState } from 'react';

let startX = 0;
let startY = 0;

export const useResizeScale = (
  minWidth: number,
  minHeight: number,
  onScale = (addWidth: number, addHeight: number) => {},
  onScaleEnd = () => {}
) => {
  const [size, setSize] = useState({ addWidth: 0, addHeight: 0 });

  const draging = (e: MouseEvent) => {
    e.preventDefault();

    const addX = e.pageX - startX;
    const addY = e.pageY - startY;
    if (addX === 0 && addY === 0) {
      return;
    }

    const addWidth = addX + minWidth <= 0 ? 0 : addX;
    const addHeight = addY + minHeight <= 0 ? 0 : addY;

    // onScale(addWidth, addHeight);
    setSize({
      addWidth,
      addHeight,
    });
    startX = e.pageX;
    startY = e.pageY;

    return false;
  };

  const dragEnd = (e: MouseEvent) => {
    // onScaleEnd();
    document.removeEventListener('mousemove', draging);
    document.removeEventListener('mouseup', dragEnd);
    setSize({ addWidth: 0, addHeight: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    document.addEventListener('mousemove', draging);
    document.addEventListener('mouseup', dragEnd);
    startX = e.pageX;
    startY = e.pageY;
  };

  return { size, onMouseDown };
};
