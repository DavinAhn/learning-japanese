import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { AppState } from 'renderer/redux/reducers/App';

export const rootReducer = combineReducers({
  AppState,
  router: routerReducer,
});

export { AppState };
