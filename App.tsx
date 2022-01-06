import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';


import {
  NavigationContainer,
  RootStack,
} from "./src/Navigator";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";

const App = () => (
  <RootSiblingParent>
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
  </RootSiblingParent>
);

export default App;
