import { AddZJComponentAction, ADD_ZJ_COMPONENT } from './types';

export const reducer = (state: IZJComponent[] = [], action: AddZJComponentAction) => {
  switch (action.type) {
    case ADD_ZJ_COMPONENT:
      return [...state, action.payload];
    default:
      break;
  }
  return state;
};
