import React from 'react';

type IZJTextProps = {
  text: string;
  textColor: string;
  fontSize: number;
};

const ZJText: React.FC<IZJTextProps & IZJStyleProps> = ({
  style,
  text,
  textColor,
  fontSize,
}) => {
  return <div style={{ ...style, color: textColor, fontSize }}>{text}</div>;
};

export default ZJText;
