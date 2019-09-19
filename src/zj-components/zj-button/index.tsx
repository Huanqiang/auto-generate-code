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
  const testClick = () => {
    console.log('other');
  };

  const consoleX = () => {
    testClick();
    console.log("i'm a button");
  };
  return (
    <div
      className="zj-button"
      style={{
        ...style,
        backgroundColor,
        borderRadius,
        color: textColor,
        fontSize,
        cursor: 'pointer',
      }}
      onClick={consoleX}
    >
      {text}
    </div>
  );
};

export default ZJButton;
