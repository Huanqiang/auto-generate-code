import { SetActiveZJComponentAction, SET_ACTIVE_ZJ_COMPONENT } from './types';

export const setActiveZJComponent = ({ id }: SetActiveZJComponentAction) => {
  return {
    type: SET_ACTIVE_ZJ_COMPONENT,
    payload: {
      id,
    },
  };
};
