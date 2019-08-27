import React from 'react';

type IZJDivProps = {
  backgroundColor: string;
  borderRadius: number;
};

const ZJDiv: React.FC<IZJDivProps & IZJStyleProps> = ({
  style,
  backgroundColor,
  borderRadius,
}) => {
  return <div style={{ ...style, backgroundColor, borderRadius }}></div>;
};

export default ZJDiv;
