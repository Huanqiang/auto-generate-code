import {
  ADD_ZJ_COMPONENT,
  CHANGE_ZJ_COMPONENT_SIZE,
  CHANGE_ZJ_COMPONENT_POSITION,
  CHANGE_ZJ_COMPONENT_ISSELETED,
  CLEAR_ZJ_COMPONENT_ISSELETED,
  CHANGE_ZJ_COMPONENT_LEVEL,
  CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY,
  CHANGE_ZJ_COMPONENT_NAME,
  MULTI_SELECTED_ZJ_COMPONENT,
  MOVE_MULTI_SELECTED_ZJ_COMPONENT,
  INSERT_NEW_CHILD_WHIT_ID,
  REMOVE_CHILD_BY_ID,
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
    case CHANGE_ZJ_COMPONENT_POSITION:
      return state.map(component =>
        component.id !== action.payload.id
          ? component
          : {
              ...component,
              position: { left: action.payload.left, top: action.payload.top },
            }
      );
    case MOVE_MULTI_SELECTED_ZJ_COMPONENT:
      return state.map(component =>
        action.payload.ids.includes(component.id)
          ? {
              ...component,
              position: {
                left: component.position.left + action.payload.addLeft,
                top: component.position.top + action.payload.addTop,
              },
            }
          : component
      );
    case CHANGE_ZJ_COMPONENT_ISSELETED:
      return state.map(component => ({
        ...component,
        isSelected: component.id === action.payload.id,
      }));
    case MULTI_SELECTED_ZJ_COMPONENT:
      return state.map(component => ({
        ...component,
        isSelected: action.payload.ids.includes(component.id),
      }));
    case CLEAR_ZJ_COMPONENT_ISSELETED:
      return state.map(component => ({
        ...component,
        isSelected: false,
      }));
    case CHANGE_ZJ_COMPONENT_LEVEL:
      const component = state.find(component => component.id === action.payload.id);

      state = state.filter(component => component.id !== action.payload.id);
      return [
        ...state.slice(0, action.payload.index),
        component,
        ...state.slice(action.payload.index),
      ];
    case CHANGE_ZJ_COMPONENT_NAME:
      return state.map(component =>
        component.id !== action.payload.id
          ? component
          : {
              ...component,
              name: action.payload.name,
            }
      );
    case CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY:
      return state.map(component =>
        component.id !== action.payload.id
          ? component
          : {
              ...component,
              config: {
                ...component.config,
                [action.payload.property]: action.payload.value,
              },
            }
      );
    case INSERT_NEW_CHILD_WHIT_ID:
      return state.map(component =>
        component.id === action.payload.parentId
          ? {
              ...component,
              children: [...component.children, action.payload.id],
            }
          : component.id === action.payload.id
          ? {
              ...component,
              parent: action.payload.parentId,
            }
          : component
      );
    case REMOVE_CHILD_BY_ID:
      return state.map(component =>
        component.id === action.payload.parentId
          ? {
              ...component,
              children: component.children.filter(id => id !== action.payload.id),
            }
          : component.id === action.payload.id
          ? {
              ...component,
              parent: '',
            }
          : component
      );
    default:
      return state;
  }
};
