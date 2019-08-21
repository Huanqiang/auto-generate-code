import React from 'react';
import TabContent from './TabContent';
import TabItem from './TabItem';

type ITabsProps = {
  defaultActiveKey?: string;
};

type ITabsState = {
  tabs: any[];
  panels: any[];
  activeKey: string;
};

class Tabs extends React.Component<ITabsProps, ITabsState> {
  state = {
    tabs: [],
    panels: [],
    activeKey: '',
  };

  componentDidMount() {
    const tabs: any[] = [];
    const panels: any[] = [];
    const { children, defaultActiveKey } = this.props;

    let activeKey: string = defaultActiveKey as string;

    React.Children.forEach(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      if (!defaultActiveKey && index === 0) {
        activeKey = child.key as string;
      }

      tabs.push({
        key: child.key,
        title: child.props.title,
        icon: child.props.icon,
      });

      panels.push({ key: child.key, children: child.props.children });
    });

    this.setState({ tabs, panels, activeKey });
  }

  changeTabs = (key: string) => {
    this.setState({ activeKey: key });
  };

  render() {
    const { tabs, panels, activeKey } = this.state;

    return (
      <div>
        <div>
          {tabs.map((tab: any) => (
            <TabItem
              key={tab.key}
              title={tab.title}
              isSelected={activeKey === tab.key}
              onSelected={() => this.changeTabs(tab.key)}
            ></TabItem>
          ))}
        </div>
        <div className="ZJ-tab-content-container">
          <TabContent panels={panels} activeKey={activeKey}></TabContent>
        </div>
      </div>
    );
  }
}

export default Tabs;
