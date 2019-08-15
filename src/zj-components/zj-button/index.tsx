import React, { useState, useEffect } from 'react';
import Draging from './draging';

type IProps = {
  parentWidth: number;
  parentHeight: number;
  width?: number;
  height?: number;
};

const ZJButton: React.FC<IProps> = ({ parentWidth, parentHeight }) => {
  const [size, setSize] = useState({ width: 100, height: 100 });

  const onRescale = (addWidth: number, addHeight: number) => {
    setSize({ width: size.width + addWidth, height: size.height + addHeight });
  };

  return (
    <Draging
      maxWidth={parentWidth - size.width}
      maxHeight={parentHeight - size.height}
      minHeight={size.height}
      minWidth={size.width}
      onRescale={onRescale}
    >
      <div
        style={{
          width: size.width,
          height: size.height,
          background: 'red',
        }}
      >
        button
      </div>
    </Draging>
  );
};

export default ZJButton;
