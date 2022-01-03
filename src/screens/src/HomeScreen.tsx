import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Button,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
  NativeStackScreenProps,
  NavigationContainer,
  RootStack,
  RootStackParamList,
} from '../../Navigator';

import TransactionItem from '../../components/TransactionItem';

const HomeScreen = (
  { navigation }: NativeStackScreenProps<RootStackParamList, "HomeScreen">
) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TransactionItem />
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate(
              "DetailScreen",
              { title: 'I am passed' }
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;