import {
  ADD_ZJ_COMPONENT,
  CHANGE_ZJ_COMPONENT_SIZE,
  CHANGE_ZJ_COMPONENT_ISSELETED,
  CLEAR_ZJ_COMPONENT_ISSELETED,
  CHANGE_ZJ_COMPONENT_LEVEL,
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
    case CHANGE_ZJ_COMPONENT_LEVEL:
      const component = state.find(component => component.id === action.paylaod.id);

      state = state.filter(component => component.id === action.paylaod.id);
      return [
        ...state.slice(0, action.paylaod.index),
        component,
        ...state.slice(action.paylaod.index),
      ];
    default:
      break;
  }
  return state;
};
