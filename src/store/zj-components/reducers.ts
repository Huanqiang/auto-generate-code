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

import {
  insertComponent,
  deleteComponent,
  findComponent,
  resetChildPositionWhenInsert,
} from '../../utils/zjcomponentOperations';

export const reducer = (state: IZJComponent[] = [], action: any) => {
  switch (action.type) {
    case ADD_ZJ_COMPONENT: {
      state = state.map(component => ({
        ...component,
        isSelected: false,
      }));
      return [...state, action.payload];
    }
    case CHANGE_ZJ_COMPONENT_SIZE:
      return getNewComponentsAfterchangeProperty(state, action.payload.id, () => ({
        size: { width: action.payload.width, height: action.payload.height },
      }));

    case CHANGE_ZJ_COMPONENT_POSITION:
      return getNewComponentsAfterchangeProperty(state, action.payload.id, () => ({
        position: { left: action.payload.left, top: action.payload.top },
      }));
    case MOVE_MULTI_SELECTED_ZJ_COMPONENT:
      return getNewComponentsAfterchangeProperty(
        state,
        action.payload.ids,
        component => ({
          position: {
            left: component.position.left + action.payload.addLeft,
            top: component.position.top + action.payload.addTop,
          },
        })
      );
    case CHANGE_ZJ_COMPONENT_ISSELETED:
      const clearAllSelected = getNewComponentsAfterChangeAll(state, component => ({
        isSelected: false,
      }));
      return getNewComponentsAfterchangeProperty(
        clearAllSelected,
        action.payload.id,
        component => ({
          isSelected: component.id === action.payload.id,
        })
      );
    case MULTI_SELECTED_ZJ_COMPONENT:
      return getNewComponentsAfterchangeProperty(
        state,
        action.payload.ids,
        component => ({
          isSelected: action.payload.ids.includes(component.id),
        })
      );
    case CLEAR_ZJ_COMPONENT_ISSELETED:
      return getNewComponentsAfterChangeAll(state, component => ({
        isSelected: false,
      }));
    case CHANGE_ZJ_COMPONENT_LEVEL:
      const component = findComponent(state, action.payload.id)!;
      const newComponents = deleteComponent(state, component.id);

      return changeComponentLevel(
        newComponents,
        component,
        action.payload.parentId,
        action.payload.index
      );
    case CHANGE_ZJ_COMPONENT_NAME:
      return getNewComponentsAfterchangeProperty(state, action.payload.id, component => ({
        name: action.payload.name,
      }));
    case CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY:
      return getNewComponentsAfterchangeProperty(state, action.payload.id, component => ({
        config: {
          ...component.config,
          [action.payload.property]: action.payload.value,
        },
      }));
    case INSERT_NEW_CHILD_WHIT_ID: {
      const child = findComponent(state, action.payload.id);

      if (!child || child.parent === action.payload.parentId) {
        return state;
      }
      const parent = findComponent(state, action.payload.parentId);

      // 从原数组中删除
      const components = deleteComponent(state, action.payload.id);

      return insertComponent(
        components,
        action.payload.parentId,
        resetChildPositionWhenInsert(child, action.payload.parentId, parent!.position)
      );
    }
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

const getNewComponentsAfterchangeProperty: (
  state: IZJComponent[],
  ids: string[],
  getProperty: (component: IZJComponent) => { [index: string]: any }
) => IZJComponent[] = (
  state: IZJComponent[],
  ids: string[],
  getProperty: (component: IZJComponent) => { [index: string]: any }
) => {
  return state.map(comp =>
    ids.includes(comp.id)
      ? {
          ...comp,
          ...getProperty(comp),
        }
      : comp.hasChildren
      ? {
          ...comp,
          children: getNewComponentsAfterchangeProperty(comp.children, ids, getProperty),
        }
      : comp
  );
};

const getNewComponentsAfterChangeAll: (
  state: IZJComponent[],
  getProperty: (component: IZJComponent) => { [index: string]: any }
) => IZJComponent[] = (
  state: IZJComponent[],
  getProperty: (component: IZJComponent) => { [index: string]: any }
) => {
  return state.map(comp =>
    comp.hasChildren
      ? {
          ...comp,
          ...getProperty(comp),
          children: getNewComponentsAfterChangeAll(comp.children, getProperty),
        }
      : {
          ...comp,
          ...getProperty(comp),
        }
  );
};

export const changeComponentLevel: (
  components: IZJComponent[],
  child: IZJComponent,
  parentId: string,
  newIndex: number
) => IZJComponent[] = (
  components: IZJComponent[],
  child: IZJComponent,
  parentId: string,
  newIndex: number
) => {
  if (!parentId) {
    return [...components.slice(0, newIndex), child, ...components.slice(newIndex)];
  }

  return components.map(comp =>
    comp.id === parentId
      ? {
          ...comp,
          children: [
            ...comp.children.slice(0, newIndex),
            child,
            ...comp.children.slice(newIndex),
          ],
        }
      : comp.hasChildren
      ? {
          ...comp,
          children: changeComponentLevel(comp.children, child, parentId, newIndex),
        }
      : comp
  );
};
