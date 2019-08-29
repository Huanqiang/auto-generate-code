import { v4 } from 'node-uuid';
import {
  MoveMultiSelectedZJComponentAction,
  AddMultiSelectedZJComponentAction,
  DeletedMultiSelectedZJComponentAction,
  ADD_MULTI_SELECTED_ZJ_COMPONENT,
  MOVE_MULTI_SELECTED_ZJ_COMPONENT,
  DELETED_MULTI_SELECTED_ZJ_COMPONENT,
} from './types';

export const addMultiSelectedZJComponent = ({
  componentIds,
}: AddMultiSelectedZJComponentAction) => {
  return {
    type: ADD_MULTI_SELECTED_ZJ_COMPONENT,
    payload: {
      id: v4(),
      componentIds,
    },
  };
};

export const deletedMultiSelectedZJComponent = ({
  componentId,
}: DeletedMultiSelectedZJComponentAction) => {
  return {
    type: DELETED_MULTI_SELECTED_ZJ_COMPONENT,
    payload: {
      componentId,
    },
  };
};

export const moveMultiSelectedZJComponentAction = ({
  id,
  top,
  left,
}: MoveMultiSelectedZJComponentAction) => {
  return {
    type: MOVE_MULTI_SELECTED_ZJ_COMPONENT,
    payload: {
      id,
      top,
      left,
    },
  };
};
