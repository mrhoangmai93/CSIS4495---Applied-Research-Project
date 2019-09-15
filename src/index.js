import React from 'react';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';
import './client/scss/bootstrap.scss';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import config from './client/config/vars';
import rootReducer from './client/redux/reducers';
import rootSaga from './client/redux/sagas';
import Root from './client/containers/Root';
// Debugger for redux
const sagaMiddleware = createSagaMiddleware();

function createMiddlewares() { // eslint-disable-line
  const middlewares = [
    sagaMiddleware,
  ];

  if (config.mode === 'development' && typeof window !== 'undefined') {
    middlewares.push(createLogger({
      level: 'info',
      collapsed: true,
      stateTransformer: (state) => {
        const newState = {};

                for (const i of Object.keys(state)) { // eslint-disable-line
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
          } else {
            newState[i] = state[i];
          }
        }

        return newState;
      },
    }));
  }

  return middlewares;
}

// Redux & Saga Init
const middlewares = createMiddlewares();

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
