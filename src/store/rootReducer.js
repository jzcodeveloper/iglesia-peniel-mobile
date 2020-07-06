import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import doctypes from './doctypes/reducer';
import documents from './documents/reducer';
import forms from './forms/reducer';
import tables from './tables/reducer';
import user from './user/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  doctypes,
  documents,
  forms,
  tables,
  user,
});

/* export default rootReducer; */

export default persistReducer(persistConfig, rootReducer);
