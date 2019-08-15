import React from 'react';

type IProps = {
  style?: any;
};

const ZJButton: React.FC<IProps> = ({ style }) => {
  return <div style={style}>button</div>;
};

export default ZJButton;
