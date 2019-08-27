import React from 'react';
import Tabs, { TabPanel } from '../../../components/tabs';
import ComponentLevels from './component-levels';
import ComponentProperties from './component-properties';

const Perprotys: React.FC = () => {
  return (
    <div style={{ paddingTop: 8 }}>
      <Tabs defaultActiveKey="1" type="line">
        <TabPanel title="层级" key="1">
          <ComponentLevels></ComponentLevels>
        </TabPanel>
        <TabPanel title="属性" key="2">
          <ComponentProperties></ComponentProperties>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Perprotys;
