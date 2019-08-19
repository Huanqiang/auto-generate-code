import React, { useState } from 'react';

let startX = 0;
let startY = 0;

export const useResizeScale = (
  minWidth: number,
  minHeight: number,
  onScale: (addWidth: number, addHeight: number) => void,
  onScaleEnd = () => {}
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const draging = (e: MouseEvent) => {
    e.preventDefault();

    const addX = e.pageX - startX;
    const addY = e.pageY - startY;
    if (addX === size.width && addY === size.height) {
      return;
    }

    const addWidth = addX + minWidth <= 0 ? -minWidth + 1 : addX;
    const addHeight = addY + minHeight <= 0 ? -minHeight + 1 : addY;

    onScale(addWidth, addHeight);
    setSize({
      width: addWidth,
      height: addHeight,
    });

    return false;
  };

  const dragEnd = (e: MouseEvent) => {
    onScaleEnd();
    document.removeEventListener('mousemove', draging);
    document.removeEventListener('mouseup', dragEnd);
    setSize({ width: 0, height: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    document.addEventListener('mousemove', draging);
    document.addEventListener('mouseup', dragEnd);
    startX = e.pageX - size.width;
    startY = e.pageY - size.height;
  };

  return { size, onMouseDown };
};
