import { createNativeStackNavigator } from '@react-navigation/native-stack';

export { NavigationContainer } from '@react-navigation/native';
export type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailScreen: { title: string };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();