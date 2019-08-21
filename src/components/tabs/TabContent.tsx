import React from 'react';

import './index.css';

type ITabContentProps = {
  panels: any[];
  activeKey: string;
};

const TabContent: React.FC<ITabContentProps> = ({ panels, activeKey }) => {
  const index = panels.findIndex(panel => panel.key === activeKey);
  const style = {
    transform: `translateX(${-index * 100}%)`,
  };

  return (
    <div className="ZJ-tab-content" style={style}>
      {panels.map((panel: any) => (
        <div key={panel.key} className="ZJ-tab-panel">
          {panel.children}
        </div>
      ))}
    </div>
  );
};

export default TabContent;
