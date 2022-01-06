import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ITransaction from './models/ITransaction';

export { NavigationContainer } from '@react-navigation/native';
export type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailScreen: { transaction: ITransaction };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();