import {
  ADD_MULTI_SELECTED_ZJ_COMPONENT,
  DELETED_MULTI_SELECTED_ZJ_COMPONENT,
  MOVE_MULTI_SELECTED_ZJ_COMPONENT,
} from './types';

export const reducer = (state: any[] = [], action: any) => {
  switch (action.type) {
    case ADD_MULTI_SELECTED_ZJ_COMPONENT:
      console.log([...state, action.payload]);
      return [...state, action.payload];
    case DELETED_MULTI_SELECTED_ZJ_COMPONENT:
      return state.filter(msc => !msc.componentIds.includes(action.payload.componentId));
    case MOVE_MULTI_SELECTED_ZJ_COMPONENT:
    default:
      return state;
  }
};
