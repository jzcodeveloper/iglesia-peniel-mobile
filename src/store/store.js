import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import {setAuthToken} from '../utils/utils';
import {selectToken} from './user/selectors';

import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

/* if (process.env.NODE_ENV === "development") middlewares.push(createLogger); */

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store, {}, () => {
  const token = selectToken(store.getState());

  if (!token) return;

  setAuthToken(token);
});
