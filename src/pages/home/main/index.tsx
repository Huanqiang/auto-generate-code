import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './index.css';

type IProp = {
  componentType: IComponentClass | undefined;
};

const Main: React.FC<IProp> = ({ componentType }) => {
  const [components, setComponents] = useState<any[]>([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const resize = () => {
    if (canvasRef.current !== null) {
      setWidth(canvasRef.current.clientWidth);
      setHeight(canvasRef.current.clientWidth * 0.75);
    }
  };

  useEffect(() => {
    resize();
  });

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });

  useEffect(() => {
    if (componentType !== undefined) {
      const component = {
        id: components.length + 1,
        C: componentType.type,
      };
      setComponents([...components, component]);
    }
  }, [componentType]);

  return (
    <div>
      Main
      <div
        ref={canvasRef}
        className="home_main_canvas"
        style={{ height: height }}
      >
        {components.map(c => (
          <c.C key={c.id} parentWidth={width} parentHeight={height}></c.C>
        ))}
      </div>
    </div>
  );
};

export default Main;
