import React, { useState, useRef, useEffect } from 'react';
import CardTabItem from './CardTabItem';
import LineTabItem from './LineTabItem';
import TabItemRootNode from './TabItemRootNode';

import LeftArrow from './asset/left-arrow.png';
import RightArrow from './asset/right-arrow.png';

enum TabbarType {
  'line' = 'line',
  'card' = 'card',
  'editable-card' = 'editable-card',
}

type ITabbarProps = {
  tabs: any[];
  type: string | undefined;
  activeKey: string;
  oldActiveIndex: number;
  onChangeTabs: (key: string) => void;
  onClosed: (key: string) => void;
  onPrevClick?: (e: React.MouseEvent) => void;
  onNextClick?: (e: React.MouseEvent) => void;
};

const useSrcoll = (tabbarRef: React.RefObject<HTMLDivElement>) => {
  const [scroll, setScroll] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // useEffect(() => {
  //   ref.current && ref.current.addEventListener('mousedown', onMouseDown);
  //   return () => {
  //     ref.current && ref.current.removeEventListener('mousedown', onMouseDown);
  //   };
  // }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    e.persist();
    e.preventDefault();
    if (e.movementX !== 0 && isMouseDown && tabbarRef.current) {
      const maxMove = tabbarRef.current.scrollWidth - tabbarRef.current.clientWidth;
      setScroll(scroll => Math.min(0, Math.max(scroll + e.movementX, -maxMove)));
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseLeave = () => {
    setIsMouseDown(false);
  };

  return { scroll, setScroll, onMouseDown, onMouseMove, onMouseUp, onMouseLeave };
};

const Tabbar: React.FC<ITabbarProps> = ({
  tabs,
  activeKey,
  oldActiveIndex,
  type,
  onChangeTabs,
  onClosed,
  onPrevClick,
  onNextClick,
}) => {
  const tabbarRef = useRef<HTMLDivElement>(null);
  const [hasArrow, setHasArrow] = useState(false);
  const [leftArrowCursor, setLeftArrowCursor] = useState(`not-allowed`);
  const [rightArrowCursor, setRightArrowCursor] = useState('pointer');
  const { scroll, setScroll, ...mouseEvent } = useSrcoll(tabbarRef);
  const activeIndex = tabs.findIndex(tab => tab.key === activeKey);
  // const [activeIndex, setActiveIndex] = useState(
  //   tabs.findIndex(tab => tab.key === activeKey)
  // );

  // useEffect(() => {
  //   setActiveIndex(tabs.findIndex(tab => tab.key === activeKey));
  // }, [tabs, activeKey]);

  useEffect(() => {
    tabbarRef.current &&
      setHasArrow(tabbarRef.current.scrollWidth > tabbarRef.current.clientWidth);
  }, [tabs]);

  let TabItem: any;
  switch (type) {
    case TabbarType.line:
      TabItem = LineTabItem;
      break;
    case TabbarType.card:
    default:
      TabItem = CardTabItem;
  }

  const swipeToLeft = (e: React.MouseEvent) => {
    onPrevClick && onPrevClick(e);
    handleArrowClick(scroll + (tabbarRef.current ? tabbarRef.current.clientWidth : 0));
  };

  const swipeToRight = (e: React.MouseEvent) => {
    onNextClick && onNextClick(e);
    handleArrowClick(scroll - (tabbarRef.current ? tabbarRef.current.clientWidth : 0));
  };

  const handleArrowClick = (scroll: number) => {
    if (tabbarRef.current) {
      const maxMove = tabbarRef.current.scrollWidth - tabbarRef.current.clientWidth;
      const curScroll = Math.min(0, Math.max(scroll, -maxMove));
      setScroll(curScroll);
      if (curScroll === 0) {
        setRightArrowCursor('pointer');
        setLeftArrowCursor('not-allowed');
      } else if (curScroll === -maxMove) {
        setLeftArrowCursor('pointer');
        setRightArrowCursor('not-allowed');
      } else {
        setLeftArrowCursor('pointer');
        setRightArrowCursor('pointer');
      }
    }
  };

  return (
    <div className="ZJ-tabbar-container">
      {hasArrow && (
        <div
          className="ZJ-tabbar-left-arrow"
          style={{ cursor: `${leftArrowCursor}` }}
          onClick={swipeToLeft}
        >
          <img src={LeftArrow} alt="left arrow icon"></img>
        </div>
      )}
      <div className="ZJ-tabbar-content">
        <div
          ref={tabbarRef}
          style={{
            whiteSpace: 'nowrap',
            display: 'flex',
            transform: `translateX(${scroll}px)`,
            transition: `transform 1s`,
          }}
          // {...mouseEvent}
        >
          {tabs.map((tab: any, index) => (
            <TabItemRootNode
              key={tab.key}
              type={type || 'line'}
              disabled={tab.disabled || false}
              closable={tab.closable || false}
              isSelected={activeKey === tab.key}
              onSelected={() => onChangeTabs(tab.key)}
              onClosed={() => onClosed(tab.key)}
            >
              <TabItem
                oldActiveIndex={oldActiveIndex}
                activeIndex={activeIndex}
                selfIndex={index}
                title={tab.title}
                isSelected={activeKey === tab.key}
              ></TabItem>
            </TabItemRootNode>
          ))}
        </div>
      </div>
      {hasArrow && (
        <div
          className="ZJ-tabbar-right-arrow"
          style={{ cursor: `${rightArrowCursor}` }}
          onClick={swipeToRight}
        >
          <img src={RightArrow} alt="right arrow icon"></img>
        </div>
      )}
    </div>
  );
};

export default Tabbar;
