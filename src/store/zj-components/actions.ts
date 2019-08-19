import { v4 } from 'node-uuid';
import {
  AddZJComponentAction,
  ChangeZJComponentSizeAction,
  ChangeZJComponentIsSelectedAction,
  ADD_ZJ_COMPONENT,
  CHANGE_ZJ_COMPONENT_ISSELETED,
  CHANGE_ZJ_COMPONENT_SIZE,
  CLEAR_ZJ_COMPONENT_ISSELETED,
} from './types';

export const addZJComponent = ({ type: cType }: AddZJComponentAction) => {
  return {
    type: ADD_ZJ_COMPONENT,
    payload: {
      id: v4(),
      size: { width: 100, height: 100 },
      isSelected: true,
      type: cType,
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
