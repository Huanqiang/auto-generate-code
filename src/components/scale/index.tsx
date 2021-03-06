import React, { useState, useEffect } from 'react';

let startX = 0;
let startY = 0;

export const useResizeScale = (minWidth: number, minHeight: number) => {
  const [size, setSize] = useState({ addWidth: 0, addHeight: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    document.addEventListener('mousemove', draging);
    document.addEventListener('mouseup', dragEnd);

    return () => {
      document.removeEventListener('mousemove', draging);
      document.removeEventListener('mouseup', dragEnd);
    };
  });

  const draging = (e: MouseEvent) => {
    e.preventDefault();
    if (!isMouseDown) {
      return;
    }

    const addX = e.pageX - startX;
    const addY = e.pageY - startY;
    if (addX === 0 && addY === 0) {
      return;
    }

    const addWidth = addX + minWidth <= 0 ? 0 : addX;
    const addHeight = addY + minHeight <= 0 ? 0 : addY;

    setSize({ addWidth, addHeight });
    startX = e.pageX;
    startY = e.pageY;
    return false;
  };

  const dragEnd = (e: MouseEvent) => {
    if (!isMouseDown) {
      return;
    }

    setIsMouseDown(false);
    setSize({ addWidth: 0, addHeight: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    startX = e.pageX;
    startY = e.pageY;
  };

  return { size, onMouseDown };
};
