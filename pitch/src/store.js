import { applyMiddleware, compose, createStore } from 'redux';
import { version } from '../../package.json'
import makeRootReducer from './reducers';

export default (initialState = {}) => {
  // ======================================================
  // Window Vars Config
  // ======================================================
  window.version = version

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
 ];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      enhancers.push(devToolsExtension())
  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState, // initial state
    compose(
     applyMiddleware(...middleware),
     ...enhancers
    )
  )
  store.asyncReducers = {}

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;

      store.replaceReducer(nextReducer);
    });

  return store
}