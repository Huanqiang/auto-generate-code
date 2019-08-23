import React, { useState, useEffect } from 'react';
import './index.css';

type ILineTabItemProps = {
  title: string;
  isSelected: boolean;
  oldActiveIndex: number;
  activeIndex: number;
  selfIndex: number;
  icon?: string;
};

const LineTabItem: React.FC<ILineTabItemProps> = ({
  title,
  icon,
  selfIndex,
  oldActiveIndex,
  activeIndex,
  isSelected,
}) => {
  const [indicatorMove, setIndicatorMove] = useState(0);
  const speed = (activeIndex - oldActiveIndex) / 16;

  useEffect(() => {
    if (selfIndex === activeIndex) {
      // 当前元素是点击元素的时候，设置其 indicator X 的值为上一个元素位置
      console.log('activeIndex, oldActiveIndex', selfIndex, activeIndex, oldActiveIndex);
      setIndicatorMove(activeIndex - oldActiveIndex);
    } else {
      // 当前元素不是点击元素的时候，设置其 indicator X 的值为点击元素位置
      setIndicatorMove(selfIndex - activeIndex);
    }
  }, [activeIndex, oldActiveIndex, selfIndex]);

  console.log(
    'selfIndex, activeIndex, indicatorMove',
    selfIndex,
    activeIndex,
    indicatorMove
  );

  useEffect(() => {
    if (activeIndex - oldActiveIndex > 0 && indicatorMove < 0) {
      return;
    }
    if (activeIndex - oldActiveIndex < 0 && indicatorMove > 0) {
      return;
    }
    if (indicatorMove === 0) {
      return;
    }
    if (selfIndex === activeIndex && indicatorMove !== 0) {
      console.log('sssssssssss selfIndex', selfIndex, indicatorMove);
      const animation = () => {
        setIndicatorMove(+(indicatorMove - speed).toFixed(6));
      };
      window.requestAnimationFrame(animation);
    }
  }, [indicatorMove, activeIndex, oldActiveIndex, speed, selfIndex]);

  return (
    <>
      {icon && <img src={icon} alt="tab icon"></img>}
      {title}
      {isSelected && (
        <div
          className="ZJ_tab-item_line-indicator"
          style={{
            transform: `translateX(${indicatorMove * -100}%)`,
          }}
        ></div>
      )}
    </>
  );
};

export default LineTabItem;
