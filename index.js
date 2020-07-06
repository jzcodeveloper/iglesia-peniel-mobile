import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';

const Peniel = () => (
  <>
    <StatusBar backgroundColor="#1a1033" barStyle="light-content" />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);

AppRegistry.registerComponent(appName, () => Peniel);
