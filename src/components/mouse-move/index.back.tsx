import React, { useState, useEffect, useCallback } from 'react';

let startX = 0;
let startY = 0;

type Point = { x: number; y: number };

type UseMouseMoveType = {
  onDragingStart?: (e: React.MouseEvent) => void;
  onDragingEnd?: ({ x, y }: Point) => void;
};

export const useMouseMove = (option?: UseMouseMoveType) => {
  const [move, setMove] = useState({ addX: 0, addY: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const draging = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isMouseDown) {
        return;
      }

      const addX = e.pageX - startX;
      const addY = e.pageY - startY;
      if (addX === 0 && addY === 0) {
        return;
      }

      setMove({ addX, addY });
      startX = e.pageX;
      startY = e.pageY;
      return false;
    },
    [isMouseDown]
  );

  const dragEnd = useCallback(
    (e: MouseEvent) => {
      // if (!isMouseDown) {
      //   return;
      // }

      e.stopPropagation();
      e.preventDefault();

      console.log('dragEnd isMouseDown', isMouseDown);

      option && option.onDragingEnd && option.onDragingEnd({ x: e.pageX, y: e.pageY });

      setIsMouseDown(prev => false);
      setMove({ addX: 0, addY: 0 });
    },
    [isMouseDown, option]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsMouseDown(true);

      option && option.onDragingStart && option.onDragingStart(e);

      startX = e.pageX;
      startY = e.pageY;
    },
    [option]
  );

  useEffect(() => {
    document.addEventListener('mousemove', draging);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mouseleave', dragEnd);

    return () => {
      document.removeEventListener('mousemove', draging);
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('mouseleave', dragEnd);
    };
  }, [draging, dragEnd]);

  return { move, onMouseDown };
};
