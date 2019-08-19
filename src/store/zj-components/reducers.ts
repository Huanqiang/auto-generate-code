import {
  ADD_ZJ_COMPONENT,
  CHANGE_ZJ_COMPONENT_SIZE,
  CHANGE_ZJ_COMPONENT_ISSELETED,
  CLEAR_ZJ_COMPONENT_ISSELETED,
} from './types';

export const reducer = (state: IZJComponent[] = [], action: any) => {
  switch (action.type) {
    case ADD_ZJ_COMPONENT:
      state = state.map(component => ({
        ...component,
        isSelected: false,
      }));
      return [...state, action.payload];
    case CHANGE_ZJ_COMPONENT_SIZE:
      return state.map(component =>
        component.id !== action.payload.id
          ? component
          : {
              ...component,
              size: { width: action.payload.width, height: action.payload.height },
            }
      );
    case CHANGE_ZJ_COMPONENT_ISSELETED:
      return state.map(component => ({
        ...component,
        isSelected: component.id === action.payload.id,
      }));
    case CLEAR_ZJ_COMPONENT_ISSELETED:
      return state.map(component => ({
        ...component,
        isSelected: false,
      }));
    default:
      break;
  }
  return state;
};
