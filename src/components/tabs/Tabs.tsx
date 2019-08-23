import React from 'react';
import TabContent from './TabContent';
import Tabbar from './Tabbar';

type ITabsProps = {
  defaultActiveKey?: string;
  type?: string;
  onChange?: (key: string) => void;
  onClosed?: (key: string) => void;
  onPrevClick?: (e: React.MouseEvent) => void;
  onNextClick?: (e: React.MouseEvent) => void;
};

type ITabsState = {
  tabs: any[];
  panels: any[];
  activeKey: string;
  oldActiveIndex: number;
};

class Tabs extends React.Component<ITabsProps, ITabsState> {
  state = {
    tabs: [],
    panels: [],
    activeKey: '',
    oldActiveIndex: -1,
  };

  componentDidMount() {
    const tabs: any[] = [];
    const panels: any[] = [];
    const { children, defaultActiveKey } = this.props;

    let activeKey: string = defaultActiveKey as string;

    React.Children.forEach(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const {
        key,
        props: { children, ...properties },
      } = child;

      if (!defaultActiveKey && index === 0) {
        activeKey = key as string;
      }

      tabs.push({
        key: key,
        ...properties,
      });

      panels.push({ key: key, children });
    });

    let oldActiveIndex = tabs.findIndex(tab => tab.key === activeKey);
    this.setState({ tabs, panels, activeKey, oldActiveIndex });
  }

  changeTabs = (key: string) => {
    this.props.onChange && this.props.onChange(key);
    this.setState(prevState => ({
      activeKey: key,
      oldActiveIndex: prevState.tabs.findIndex(tab => tab.key === prevState.activeKey),
    }));
  };

  removeTab = (key: string) => {
    this.props.onClosed && this.props.onClosed(key);
    this.setState(
      prevState => {
        // 判断被删除是不是当前活动tab
        const index = prevState.tabs.findIndex(tab => tab.key === key);
        const activeIndex = prevState.tabs.findIndex(
          tab => tab.key === prevState.activeKey
        );

        if (prevState.activeKey === key) {
          const newIndex = index === 0 ? 1 : index - 1;
          return {
            activeKey: prevState.tabs[newIndex].key,
            oldActiveIndex: (index === 0 ? 0 : newIndex) + 1,
            tabs: prevState.tabs.filter(tab => tab.key !== key),
            panels: prevState.panels.filter(panel => panel.key !== key),
          };
        } else {
          return {
            ...prevState,
            oldActiveIndex: activeIndex,
            tabs: prevState.tabs.filter(tab => tab.key !== key),
            panels: prevState.panels.filter(panel => panel.key !== key),
          };
        }
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    const { type } = this.props;
    const { tabs, panels, activeKey, oldActiveIndex } = this.state;

    return (
      <div style={{ overflow: `hidden` }}>
        <Tabbar
          tabs={tabs}
          activeKey={activeKey}
          oldActiveIndex={oldActiveIndex}
          onChangeTabs={this.changeTabs}
          onClosed={this.removeTab}
          type={type}
        ></Tabbar>
        <div className="ZJ-tab-content-container">
          <TabContent panels={panels} activeKey={activeKey}></TabContent>
        </div>
      </div>
    );
  }
}

export default Tabs;
