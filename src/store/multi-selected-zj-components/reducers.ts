import {
  ADD_MULTI_SELECTED_ZJ_COMPONENT,
  DELETED_MULTI_SELECTED_ZJ_COMPONENT,
} from './types';

export const reducer = (state: IMultiSelectedComponents[] = [], action: any) => {
  switch (action.type) {
    case ADD_MULTI_SELECTED_ZJ_COMPONENT:
      return [...state, action.payload];
    case DELETED_MULTI_SELECTED_ZJ_COMPONENT:
      return state.filter(msc => !msc.componentIds.includes(action.payload.componentId));
    default:
      return state;
  }
};
