import React from 'react';

type IZJDivProps = {
  backgroundColor: string;
  borderRadius: number;
};

const ZJDiv: React.FC<IZJDivProps & IZJStyleProps> = ({
  style,
  backgroundColor,
  borderRadius,
  children,
}) => {
  return <div style={{ ...style, backgroundColor, borderRadius }}>{children}</div>;
};

export default ZJDiv;
