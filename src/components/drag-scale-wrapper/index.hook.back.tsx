import React, { useState, useCallback } from 'react';
import DragAndScale from './DragAndScale';

type IProps = {
  parentWidth: number;
  parentHeight: number;
  Component: React.FC<{ style: any }>;
  onClearAllComponentsSelected: () => void;
};

// 设置是否被选中
const useIsSelected = () => {
  const [isSelected, setIsSelected] = useState(true);

  const onClick = useCallback(() => {
    setIsSelected(true);
  }, []);

  return { isSelected, setIsSelected, onClick };
};

const DragScaleWrapper: React.FC<IProps> = ({
  parentWidth,
  parentHeight,
  Component,
  onClearAllComponentsSelected,
}) => {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const { isSelected, onClick } = useIsSelected();

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
      isSelected={isSelected}
      onClick={onClick}
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
