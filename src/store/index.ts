import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as ZJComponentsReducer } from './zj-components/reducers';
import { reducer as MultiZJComponentsReducer } from './multi-selected-zj-components/reducers';
import { reducer as ActiveZJComponentReducer } from './active-zj-component/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const configStore = () => {
  const reducers = combineReducers({
    components: ZJComponentsReducer,
    multiSelectedComponents: MultiZJComponentsReducer,
    activeZJComponent: ActiveZJComponentReducer,
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
