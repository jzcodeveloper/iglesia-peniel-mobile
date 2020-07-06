import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Loading from './screens/loading';
import Home from './screens/home';
import Login from './screens/login';
import About from './screens/about';
import History from './screens/history';
import Mission from './screens/mission';
import Ministry from './screens/ministry';
import Location from './screens/location';
import Activities from './screens/activities';
import Events from './screens/events';
import Requests from './screens/requests';
import Devotionals from './screens/devotionals';
import Donations from './screens/donations';
import More from './screens/more';
import Articles from './screens/articles';
import Article from './screens/article';
import Advices from './screens/advices';
import BibleStudies from './screens/bible_studies';
import BibleStudy from './screens/bible_study';
import Videos from './screens/videos';
import Audios from './screens/audios';
import Modal from './screens/modal';

const MainStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerTintColor: '#ffffff',
          headerStyle: {backgroundColor: '#2d1b58'},
          headerTitleStyle: {
            color: '#ffffff',
            textAlign: 'center',
            paddingRight: 60,
            letterSpacing: 1,
          },
        }}>
        <MainStack.Screen
          name="Cargando"
          component={Loading}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="Inicio"
          component={Home}
          options={{headerShown: false}}
        />
        <MainStack.Screen name="Administrador" component={Login} />
        <MainStack.Screen name="Nosotros" component={About} />
        <MainStack.Screen name="Historia" component={History} />
        <MainStack.Screen
          name="Misión, Visión y Propósito"
          component={Mission}
        />
        <MainStack.Screen name="Evangelismo" component={Ministry} />
        <MainStack.Screen name="Educación Cristiana" component={Ministry} />
        <MainStack.Screen name="Luminares en el Mundo" component={Ministry} />
        <MainStack.Screen name="Diaconados" component={Ministry} />
        <MainStack.Screen name="Ubicación" component={Location} />
        <MainStack.Screen name="Actividades" component={Activities} />
        <MainStack.Screen name="Eventos" component={Events} />
        <MainStack.Screen name="Petición de Oración" component={Requests} />
        <MainStack.Screen name="Devocionales" component={Devotionals} />
        <MainStack.Screen name="Donaciones" component={Donations} />
        <MainStack.Screen name="Más" component={More} />
        <MainStack.Screen name="Artículos" component={Articles} />
        <MainStack.Screen name="Artículo" component={Article} />
        <MainStack.Screen name="Consejería" component={Advices} />
        <MainStack.Screen name="Estudios Bíblicos" component={BibleStudies} />
        <MainStack.Screen name="Estudio Bíblico" component={BibleStudy} />
        <MainStack.Screen name="Biblia" component={More} />
        <MainStack.Screen name="Videos" component={Videos} />
        <MainStack.Screen name="Audios" component={Audios} />
        <MainStack.Screen name="Formulario" component={Modal} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
