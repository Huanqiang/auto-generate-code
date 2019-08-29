// Describing the shape of the system's slice of state
export interface AddMultiSelectedZJComponentAction {
  componentIds: string[];
}

export interface DeletedMultiSelectedZJComponentAction {
  componentId: string;
}

export interface MoveMultiSelectedZJComponentAction {
  id: string;
  top: number;
  left: number;
}

// Describing the different ACTION NAMES available
export const ADD_MULTI_SELECTED_ZJ_COMPONENT: string = 'ADD_MULTI_SELECTED_ZJ_COMPONENT';
export const DELETED_MULTI_SELECTED_ZJ_COMPONENT: string =
  'DELETED_MULTI_SELECTED_ZJ_COMPONENT';
export const MOVE_MULTI_SELECTED_ZJ_COMPONENT: string =
  'MOVE_MULTI_SELECTED_ZJ_COMPONENT';
