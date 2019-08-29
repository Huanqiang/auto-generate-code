import React from 'react';
import { Menu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

interface MenuItemEventHandler {
  /**
   * The event that triggered the context menu
   */
  event: MouseEvent & TouchEvent;
  /**
   * Any props supplied
   */
  props?: object;
}

type IMultiSelectedContextMenuProps = {
  id: string;
  isShowCombine: boolean;
  isShowCancelCombine: boolean;
  onCombine: ({ event }: MenuItemEventHandler) => void;
  onCancelCombine: ({ event }: MenuItemEventHandler) => void;
};

const MultiSelectedContextMenu: React.FC<IMultiSelectedContextMenuProps> = ({
  id,
  isShowCombine,
  isShowCancelCombine,
  onCombine,
  onCancelCombine,
}) => (
  <Menu id={id}>
    <Item onClick={onCombine} disabled={!isShowCombine}>
      合并
    </Item>
    <Item onClick={onCancelCombine} disabled={!isShowCancelCombine}>
      取消合并
    </Item>
  </Menu>
);

export default MultiSelectedContextMenu;
