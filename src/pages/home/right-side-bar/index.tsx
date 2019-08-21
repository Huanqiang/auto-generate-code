import React from 'react';
import Tabs, { TabPanel } from './tabs';

const Perprotys: React.FC = () => {
  return (
    <div>
      Perprotys
      <Tabs defaultActiveKey="1">
        <TabPanel title="Tab 1" key="1">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 1</div>
        </TabPanel>
        <TabPanel title="Tab 2" key="2">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 2</div>
        </TabPanel>
        <TabPanel title="Tab 3" key="3">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 3</div>
        </TabPanel>
        <TabPanel title="Tab 4" key="4">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 4</div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Perprotys;
