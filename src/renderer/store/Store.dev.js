import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { Logger } from 'renderer/middleware/Logger';
import { rootReducer } from 'renderer/redux/index';

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
  }) :
  compose;

export function configureStore(history, initialState) {
  const middleware = applyMiddleware(
    Logger,
    routerMiddleware(history),
  );
  const enhancer = composeEnhancers(middleware);

  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
