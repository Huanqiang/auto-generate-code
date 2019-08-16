import { createStore, combineReducers } from 'redux';
import { reducer as ZJComponentsReducer } from './zj-components/reducers';

const configStore = () => {
  const reducers = combineReducers({
    components: ZJComponentsReducer,
  });

  const store = createStore(reducers, {});
  return store;
};

export default configStore();
