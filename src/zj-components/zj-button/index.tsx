import React from 'react';

const ZJButton: React.FC<IZJStyleProps> = ({ style }) => {
  const consoleX = () => {
    console.log("i'm a button");
  };
  return (
    <div style={style} onClick={consoleX}>
      button
    </div>
  );
};

export default ZJButton;
