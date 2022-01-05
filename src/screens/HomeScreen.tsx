import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  StatusBar,
  useColorScheme,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import TransactionList from '../components/TransactionList';
import ITransaction from '../models/ITransaction';


const HomeScreen = () => {

  const [isLoading, setLoading] = useState(true);
  const [trxList, setTrxList] = useState(Array<ITransaction>());
  const [filteredTrxList, setFilteredTrxList] = useState(Array<ITransaction>());

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
      setFilteredTrxList(arr);
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

  /// query w/ precedence: beneficiary_name > beneficiary_bank > amount
  const searchQuery = (query: string) => {
    query = query.trim();
    if (query.length == 0) {
      setFilteredTrxList(trxList);
      return;
    }
    const filteredList = trxList.filter((trx) => {
      query = query.toLowerCase();
      const beneficiaryName = trx.beneficiary_name.toLowerCase();
      const beneficiaryBank = trx.beneficiary_bank.toLowerCase();
      const amount = trx.amount.toString();
      return beneficiaryName.indexOf(query) > -1
        || beneficiaryBank.indexOf(query) > -1
        || amount.indexOf(query) > -1;
    });
    setFilteredTrxList(filteredList);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput
        onChangeText={searchQuery}
        placeholder="Cari nama, bank, atau nominal">
      </TextInput>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        {
          isLoading ? <ActivityIndicator /> : (
            <TransactionList
              trxList={filteredTrxList}
            />
          )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;