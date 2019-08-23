import React from 'react';
import './index.css';

import Close from './asset/close.png';

type ICardTabItemProps = {
  type: string;
  isSelected: boolean;
  disabled: boolean;
  closable: boolean;
  onSelected: () => void;
  onClosed: () => void;
  children: React.ReactNode;
};

const TabItemRootNode: React.FC<ICardTabItemProps> = ({
  type,
  children,
  disabled,
  closable,
  isSelected,
  onSelected,
  onClosed,
}) => {
  const className = `ZJ-${type}-tab-item ZJ-tab-item${isSelected ? ' selected' : ''}${
    disabled ? ' disabled' : ''
  }`;

  const select = (e: React.MouseEvent) => {
    console.log('selected');
    onSelected();
  };

  const closed = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClosed();
  };

  return (
    <div className={className} onClick={disabled ? () => {} : select}>
      {children}
      {closable && (
        <span onClick={closed}>
          <img
            src={Close}
            alt="close icon"
            style={{
              marginLeft: 4,
              marginBottom: 2,
              verticalAlign: 'middle',
              width: 14,
              height: 14,
            }}
          ></img>
        </span>
      )}
    </div>
  );
};

export default TabItemRootNode;
