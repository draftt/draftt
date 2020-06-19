import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import combinedReducers from './reducers';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    sagaMiddleware,
  ];

  // ======================================================
  // Store Enhancers
  // ======================================================
  // const enhancers = []
  //   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  //     enhancers.push(devToolsExtension())

  // const composeEnhancers = composeWithDevTools({
  //       // Specify here name, actionsBlacklist, actionsCreators and other options
  //     });
  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(
    combinedReducers,
    initialState, // initial state
    composeWithDevTools(
      applyMiddleware(...middleware),
    ),
  );

  sagaMiddleware.run(rootSaga);
  //   store.asyncReducers = {}
  // ======================================================
  // Hot Module Reloading (HMR) Setup
  // ======================================================
  //   if(module.hot) {
  //     // Enable Webpack hot module replacement for reducers
  //     module.hot.accept('../reducers', () => {
  //       const nextReducer = require('../reducers').default;

  //       store.replaceReducer(nextReducer);
  //     });
  //    };

  return store;
};
