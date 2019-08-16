// Describing the shape of the system's slice of state
export interface AddZJComponent {
  ref: React.RefObject<HTMLDivElement | React.FC | React.ReactNode | null>;
  type: React.FC;
}

// Describing the different ACTION NAMES available
export const ADD_ZJ_COMPONENT = 'ADD_ZJ_COMPONENT';

export interface AddZJComponentAction {
  type: typeof ADD_ZJ_COMPONENT;
  payload: AddZJComponent & { id: string };
}

declare type AddZJComponentType = AddZJComponent;
