import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as ZJComponentsReducer } from './zj-components/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const configStore = () => {
  const reducers = combineReducers({
    components: ZJComponentsReducer,
  });

  const middlewares: any[] = [];

  const store = createStore(
    reducers,
    {},
    composeWithDevTools(
      applyMiddleware(...middlewares)
      // other store enhancers if any
    )
  );
  return store;
};

export default configStore();
