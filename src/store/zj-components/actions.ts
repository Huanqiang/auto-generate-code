import { v4 } from 'node-uuid';
import {
  AddZJComponentAction,
  ChangeZJComponentSizeAction,
  ChangeZJComponentIsSelectedAction,
  ChangeZJComponentsLevel,
  ChangeZJComponentCustomProperty,
  ADD_ZJ_COMPONENT,
  CHANGE_ZJ_COMPONENT_ISSELETED,
  CHANGE_ZJ_COMPONENT_SIZE,
  CLEAR_ZJ_COMPONENT_ISSELETED,
  CHANGE_ZJ_COMPONENT_LEVEL,
  CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY,
} from './types';

import { getInitPropertyValue } from '../../zj-component-perproty-item/constant';

export const addZJComponent = ({
  type: cType,
  customPerproties,
}: AddZJComponentAction) => {
  return {
    type: ADD_ZJ_COMPONENT,
    payload: {
      id: v4(),
      size: { width: 100, height: 35 },
      isSelected: true,
      type: cType,
      customPerproties,
      ...initCustomProperties(customPerproties),
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

export const clearZJComponentIsSelected = () => ({
  type: CLEAR_ZJ_COMPONENT_ISSELETED,
  payload: {},
});

export const changeZJComponentsLevel = ({ id, index }: ChangeZJComponentsLevel) => ({
  type: CHANGE_ZJ_COMPONENT_LEVEL,
  payload: { id, index },
});

export const changeZJComponentCustomProperty = ({
  id,
  property,
  value,
}: ChangeZJComponentCustomProperty) => ({
  type: CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY,
  payload: { id, property, value },
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
