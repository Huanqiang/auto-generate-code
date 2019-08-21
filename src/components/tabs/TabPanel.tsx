import React from 'react';
import './index.css';

type ITabPanelProps = {
  title: string;
  icon?: string;
};

const TabPanel: React.FC<ITabPanelProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default TabPanel;
