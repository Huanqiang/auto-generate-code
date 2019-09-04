import React, { useState, useEffect, useCallback } from 'react';

let startX = 0;
let startY = 0;

export const useMouseMove = () => {
  const [move, setMove] = useState({ addX: 0, addY: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  // useEffect(() => {
  //   document.addEventListener('mousemove', draging);
  //   document.addEventListener('mouseup', dragEnd);
  //   document.addEventListener('mouseleave', dragEnd);

  //   return () => {
  //     document.removeEventListener('mousemove', draging);
  //     document.removeEventListener('mouseup', dragEnd);
  //     document.removeEventListener('mouseleave', dragEnd);
  //   };
  // });

  const draging = (e: MouseEvent) => {
    e.preventDefault();
    // if (!isMouseDown) {
    //   return;
    // }

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
    console.log('dragEnd', isMouseDown);
    // if (!isMouseDown) {
    //   return;
    // }

    document.removeEventListener('mousemove', draging);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mouseleave', dragEnd);

    console.log('setIsMouseDown(false);');
    // setIsMouseDown(false);
    setMove({ addX: 0, addY: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    // setIsMouseDown(true);
    document.addEventListener('mousemove', draging);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mouseleave', dragEnd);

    startX = e.pageX;
    startY = e.pageY;
  };

  return { move, onMouseDown };
};