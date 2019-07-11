
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/index';

const enhancers = [ ];
const middleware = [ thunk ];

if( process.env.NODE_ENV === 'development' ){
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  middleware.push(createLogger({
    collapsed: true,
  }))
}

export default function configureStore() {
  return createStore(
    rootReducer,
    compose(applyMiddleware(...middleware), ...enhancers),
  );
}
