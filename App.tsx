import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  NavigationContainer,
  RootStack,
} from "./src/Navigator";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeScreen">
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }} />
        <RootStack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ title: '' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
