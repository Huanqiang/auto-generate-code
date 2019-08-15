import React, { useState } from 'react';
import DragAndScale from './DragAndScale';

type IProps = {
  parentWidth: number;
  parentHeight: number;
  Component: React.FC<{ style: any }>;
};

const DragScaleWrapper: React.FC<IProps> = ({
  parentWidth,
  parentHeight,
  Component,
}) => {
  const [size, setSize] = useState({ width: 100, height: 100 });

  const onRescale = (addWidth: number, addHeight: number) => {
    setSize({ width: size.width + addWidth, height: size.height + addHeight });
  };

  return (
    <DragAndScale
      maxWidth={parentWidth - size.width}
      maxHeight={parentHeight - size.height}
      minHeight={size.height}
      minWidth={size.width}
      onRescale={onRescale}
    >
      <Component
        style={{
          width: size.width,
          height: size.height,
          background: 'red',
        }}
      ></Component>
    </DragAndScale>
  );
};

export default DragScaleWrapper;
