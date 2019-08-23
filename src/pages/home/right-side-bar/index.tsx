import React from 'react';
import Tabs, { TabPanel } from '../../../components/tabs';
import ComponentLevels from './ComponentLevels';

const Perprotys: React.FC = () => {
  return (
    <div style={{ paddingTop: 8 }}>
      <Tabs defaultActiveKey="1" type="line">
        <TabPanel title="层级" key="1" closable>
          Content of Tab Pane 1<ComponentLevels></ComponentLevels>
        </TabPanel>
        <TabPanel title="属性" key="2" closable>
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 2</div>
        </TabPanel>
        <TabPanel title="test3" key="3" closable>
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 3</div>
        </TabPanel>
        <TabPanel title="test4" key="4" closable>
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 4</div>
        </TabPanel>
        <TabPanel title="test5" key="5" closable>
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 5</div>
        </TabPanel>
        <TabPanel title="test6" key="6">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 3</div>
        </TabPanel>
        <TabPanel title="test7" key="7">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 4</div>
        </TabPanel>
        <TabPanel title="test8" key="8">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 5</div>
        </TabPanel>
        <TabPanel title="test6" key="9">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 3</div>
        </TabPanel>
        <TabPanel title="test7" key="10">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 4</div>
        </TabPanel>
        <TabPanel title="test8" key="11">
          <div style={{ padding: `8px 16px` }}>Content of Tab Pane 5</div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Perprotys;
