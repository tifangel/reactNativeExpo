import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/state/store';
import {Provider} from 'react-redux';
import {
  DetailScreen,
  SplashScreen
} from './src/screens';
import {
  BottomTabNavigator
} from './src/navigations';
import * as Sentry from 'sentry-expo';
import { AppRegistry } from 'react-native';

Sentry.init({
  dsn: 'dsn',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

// Access any @sentry/react-native exports via:
// Sentry.Native.*

// Access any @sentry/browser exports via:
// Sentry.Browser.*

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name="Detail" component={DetailScreen} options={{
            title: 'Detail',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App