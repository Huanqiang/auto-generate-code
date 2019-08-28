// Describing the shape of the system's slice of state
export interface AddZJComponentAction {
  type: React.FC;
  tag: string;
  customPerproties?: IZJComponentCustomPropertyCategory[];
}

export interface ChangeZJComponentSizeAction {
  id: string;
  width: number;
  height: number;
}

export interface ChangeZJComponentIsSelectedAction {
  id: string;
}

export interface ChangeZJComponentsLevel {
  id: string;
  index: number;
}

export interface ChangeZJComponentsName {
  id: string;
  name: string;
}

export interface ChangeZJComponentCustomProperty {
  id: string;
  property: any;
  value: any;
}

// Describing the different ACTION NAMES available
export const ADD_ZJ_COMPONENT: string = 'ADD_ZJ_COMPONENT';
export const CHANGE_ZJ_COMPONENT_SIZE: string = 'CHANGE_ZJ_COMPONENT_SIZE';
export const CHANGE_ZJ_COMPONENT_ISSELETED: string = 'CHANGE_ZJ_COMPONENT_ISSELETED';
export const CLEAR_ZJ_COMPONENT_ISSELETED: string = 'CLEAR_ZJ_COMPONENT_ISSELETED';
export const CHANGE_ZJ_COMPONENT_LEVEL: string = 'CHANGE_ZJ_COMPONENT_LEVEL';
export const CHANGE_ZJ_COMPONENT_NAME: string = 'CHANGE_ZJ_COMPONENT_NAME';

export const CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY: string =
  'CHANGE_ZJ_COMPONENT_CUSTOM_PROPERTY';

export interface AddZJComponentPlayload {
  type: typeof ADD_ZJ_COMPONENT;
  payload: AddZJComponentAction & {
    id: string;
    size: { width: number; height: number };
    isSelected: false;
  };
}

declare type AddZJComponentType = AddZJComponentPlayload;
