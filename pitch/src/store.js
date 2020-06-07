import { applyMiddleware, compose, createStore } from 'redux';
import combinedReducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

export default (initialState = {}) => {


  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
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
    )
  )
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
}