import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { Logger } from 'renderer/middleware/Logger';
import { rootReducer } from 'renderer/redux/index';

const composeEnhancers = compose;

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
