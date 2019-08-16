import { v4 } from 'node-uuid';
import { AddZJComponent, ADD_ZJ_COMPONENT } from './types';

export const addZJComponent = ({ ref, type }: AddZJComponent) => {
  return {
    type: ADD_ZJ_COMPONENT,
    payload: {
      id: v4(),
      ref,
      type,
    },
  };
};
