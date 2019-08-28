import React from 'react';

type IZJButtonProps = {
  text: string;
  textColor: string;
  fontSize: number;
  backgroundColor: string;
  borderRadius: number;
};

const ZJButton: React.FC<IZJButtonProps & IZJStyleProps> = ({
  style,
  text,
  textColor,
  fontSize,
  backgroundColor,
  borderRadius,
}) => {
  const consoleX = () => {
    console.log("i'm a button");
  };
  return (
    <div
      style={{
        ...style,
        backgroundColor,
        borderRadius,
        color: textColor,
        fontSize,
        cursor: `pointer`,
      }}
      onClick={consoleX}
    >
      {text}
    </div>
  );
};

export default ZJButton;
