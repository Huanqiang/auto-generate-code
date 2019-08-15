import { createStore, combineReducers } from 'redux';
import { components } from './mock';

const reducers = combineReducers({});

const configStore = () => {
  const initComponents = components;
  const store = createStore(reducers, initComponents);
  return store;
};

export default configStore();
