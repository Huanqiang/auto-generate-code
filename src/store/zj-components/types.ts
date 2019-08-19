// Describing the shape of the system's slice of state
export interface AddZJComponentAction {
  type: React.FC;
}

export interface ChangeZJComponentSizeAction {
  id: string;
  width: number;
  height: number;
}

export interface ChangeZJComponentIsSelectedAction {
  id: string;
}

// Describing the different ACTION NAMES available
export const ADD_ZJ_COMPONENT: string = 'ADD_ZJ_COMPONENT';
export const CHANGE_ZJ_COMPONENT_SIZE: string = 'CHANGE_ZJ_COMPONENT_SIZE';
export const CHANGE_ZJ_COMPONENT_ISSELETED: string = 'CHANGE_ZJ_COMPONENT_ISSELETED';
export const CLEAR_ZJ_COMPONENT_ISSELETED: string = 'CLEAR_ZJ_COMPONENT_ISSELETED';

export interface AddZJComponentPlayload {
  type: typeof ADD_ZJ_COMPONENT;
  payload: AddZJComponentAction & {
    id: string;
    size: { width: number; height: number };
    isSelected: false;
  };
}

declare type AddZJComponentType = AddZJComponentPlayload;
