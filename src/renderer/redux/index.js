import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { appReducer } from 'renderer/redux/reducers/App';

export const rootReducer = combineReducers({
  app: appReducer,
  router: routerReducer,
});

export { RouterState };
