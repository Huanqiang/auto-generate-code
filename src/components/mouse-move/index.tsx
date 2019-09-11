import React, { useState } from 'react';

let startX = 0;
let startY = 0;

type Point = { x: number; y: number };

type UseMouseMoveType = {
  onDragingStart?: (e: React.MouseEvent) => void;
  onDragingEnd?: ({ x, y }: Point) => void;
};

export const useMouseMove = (option?: UseMouseMoveType) => {
  // const { onDragingStart, onDragingEnd } = option
  const [move, setMove] = useState({ addX: 0, addY: 0 });

  const draging = (e: MouseEvent) => {
    e.preventDefault();

    const addX = e.pageX - startX;
    const addY = e.pageY - startY;
    if (addX === 0 && addY === 0) {
      return;
    }

    setMove({ addX, addY });
    startX = e.pageX;
    startY = e.pageY;
    return false;
  };

  const dragEnd = (e: MouseEvent) => {
    document.removeEventListener('mousemove', draging);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mouseleave', dragEnd);

    option && option.onDragingEnd && option.onDragingEnd({ x: e.pageX, y: e.pageY });

    setMove({ addX: 0, addY: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    document.addEventListener('mousemove', draging);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mouseleave', dragEnd);

    option && option.onDragingStart && option.onDragingStart(e);

    startX = e.pageX;
    startY = e.pageY;
  };

  return { move, onMouseDown };
};
