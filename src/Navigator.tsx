import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ITransaction from './models/ITransaction';

export { NavigationContainer } from '@react-navigation/native';
export type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailScreen: { trx: ITransaction };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();