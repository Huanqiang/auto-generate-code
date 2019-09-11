import { v4 } from 'node-uuid';
import {
  AddZJComponentAction,
  ChangeZJComponentSizeAction,
  ChangeZJComponentIsSelectedAction,
  ChangeZJComponentsLevel,
  ChangeZJComponentsName,
  ChangeZJComponentPositionAction,
  ChangeZJComponentCustomProperty,
  MultiSelectedZJComponentAction,
  MoveMultiSelectedZJComponentAction,
  InsertNewChildAction,
  RemoveChildAction,
  ADD_ZJ_COMPONENT,
  CHANGE_ZJ_COMPONENT_ISSELETED,
  CHANGE_ZJ_COMPONENT_SIZE,
  CHANGE_ZJ_COMPONENT_POSITION,
  CLEAR_ZJ_COMPONENT_ISSELETED,
  CHANGE_ZJ_COMPONENT_LEVEL,
  CHANGE_ZJ_COMPONENT_NAME,
  CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY,
  MULTI_SELECTED_ZJ_COMPONENT,
  MOVE_MULTI_SELECTED_ZJ_COMPONENT,
  INSERT_NEW_CHILD_WHIT_ID,
  REMOVE_CHILD_BY_ID,
} from './types';

import { getInitPropertyValue } from '../../zj-component-perproty-item/constant';

export const addZJComponent = ({
  type: cType,
  tag,
  hasChildren,
  customPerproties,
}: AddZJComponentAction) => {
  return {
    type: ADD_ZJ_COMPONENT,
    payload: {
      id: v4(),
      name: tag,
      size: { width: 100, height: 35 },
      position: { left: 0, top: 0 },
      isSelected: true,
      type: cType,
      customPerproties,
      parent: '',
      children: [],
      hasChildren: hasChildren,
      config: {
        ...initCustomProperties(customPerproties),
      },
    },
  };
};

export const changeZJComponentSize = ({
  id,
  width,
  height,
}: ChangeZJComponentSizeAction) => {
  return {
    type: CHANGE_ZJ_COMPONENT_SIZE,
    payload: {
      id,
      width,
      height,
    },
  };
};

export const changeZJComponentPosition = ({
  id,
  top,
  left,
}: ChangeZJComponentPositionAction) => {
  return {
    type: CHANGE_ZJ_COMPONENT_POSITION,
    payload: {
      id,
      top,
      left,
    },
  };
};

export const changeZJComponentIsSelected = ({
  id,
}: ChangeZJComponentIsSelectedAction) => {
  return {
    type: CHANGE_ZJ_COMPONENT_ISSELETED,
    payload: {
      id,
    },
  };
};

export const multiSelectedZJComponent = ({ ids }: MultiSelectedZJComponentAction) => {
  return {
    type: MULTI_SELECTED_ZJ_COMPONENT,
    payload: {
      ids,
    },
  };
};

export const moveMultiSelectedZJComponentAction = ({
  ids,
  addTop,
  addLeft,
}: MoveMultiSelectedZJComponentAction) => {
  return {
    type: MOVE_MULTI_SELECTED_ZJ_COMPONENT,
    payload: {
      ids,
      addTop,
      addLeft,
    },
  };
};

export const clearZJComponentIsSelected = () => ({
  type: CLEAR_ZJ_COMPONENT_ISSELETED,
  payload: {},
});

export const changeZJComponentsLevel = ({ id, index }: ChangeZJComponentsLevel) => ({
  type: CHANGE_ZJ_COMPONENT_LEVEL,
  payload: { id, index },
});

export const changeZJComponentName = ({ id, name }: ChangeZJComponentsName) => ({
  type: CHANGE_ZJ_COMPONENT_NAME,
  payload: {
    id,
    name,
  },
});

export const changeZJComponentCustomProperty = ({
  id,
  property,
  value,
}: ChangeZJComponentCustomProperty) => ({
  type: CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY,
  payload: { id, property, value },
});

export const insertNewChildById = ({ parentId, id }: InsertNewChildAction) => ({
  type: INSERT_NEW_CHILD_WHIT_ID,
  payload: { parentId, id },
});

export const removeChildById = ({ parentId, id }: RemoveChildAction) => ({
  type: REMOVE_CHILD_BY_ID,
  payload: { parentId, id },
});

const initCustomProperties = (
  customPerproties: IZJComponentCustomPropertyCategory[] = []
) => {
  let newPerproties: {
    [index: string]: string | number;
  } = {};
  customPerproties.forEach(perproty => {
    newPerproties[perproty.property] =
      perproty.defaultValue || getInitPropertyValue(perproty.categoty);
  });
  return newPerproties;
};
