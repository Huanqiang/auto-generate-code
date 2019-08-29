import { SET_ACTIVE_ZJ_COMPONENT, SetActiveZJComponentAction } from './types';
import { ADD_ZJ_COMPONENT, CLEAR_ZJ_COMPONENT_ISSELETED } from '../zj-components/types';

interface IAction {
  type: string;
  payload: SetActiveZJComponentAction;
}

export const reducer = (state: string = '', action: IAction) => {
  switch (action.type) {
    case ADD_ZJ_COMPONENT:
    case SET_ACTIVE_ZJ_COMPONENT:
      return action.payload.id;
    case CLEAR_ZJ_COMPONENT_ISSELETED:
      return '';
    default:
      return state;
  }
};
