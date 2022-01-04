import React, { useState, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ScrollView,
  StatusBar,
  useColorScheme,
  Button,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  ListRenderItem,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
  NativeStackScreenProps,
  NavigationContainer,
  RootStack,
  RootStackParamList,
} from '../Navigator';

import TransactionItem from '../components/TransactionItem';
import ITransaction from '../models/ITransaction';


const HomeScreen = (
  { navigation }: NativeStackScreenProps<RootStackParamList, "HomeScreen">
) => {

  const [isLoading, setLoading] = useState(true);
  const [trxList, setTrxList] = useState(Array<ITransaction>());

  const isDarkMode = useColorScheme() === 'dark';

  const getTrxList = async () => {
    try {
      const response = await fetch(
        'https://nextar.flip.id/frontend-test'
      );
      const trxObj = await response.json();

      var arr: Array<ITransaction> = [];
      Object.keys(trxObj).forEach(function (key) {
        arr.push(trxObj[key] as ITransaction);
      });

      /// DEBUG check loading state
      await new Promise(res => setTimeout(res, 3000));
      setTrxList(arr);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrxList();
  }, []);

  const _renderItem: ListRenderItem<ITransaction> = ({ ...list }) => (
    <Pressable onPress={() => navigation.navigate(
      "DetailScreen",
      { trx: list.item }
    )}>
      <TransactionItem
        trx={list.item}
      />
    </Pressable>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList<ITransaction>
            data={trxList}
            keyExtractor={({ id }, index) => id}
            renderItem={_renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;