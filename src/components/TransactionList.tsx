import React from "react";
import {
  View,
  FlatList,
  Text,
  ListRenderItem,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { } from "../Navigator";

import ITransaction from "../models/ITransaction";
import TransactionItem from '../components/TransactionItem';


const TransactionList: React.FC<{ trxList: Array<ITransaction> }> = ({ trxList }) => {
  const navigation = useNavigation();

  const renderItem: ListRenderItem<ITransaction> = ({ ...renderItem }) => (
    <Pressable
      android_ripple={{ color: '0x00000045', borderless: false, foreground: true }}
      onPress={() => navigation.navigate("DetailScreen",
        { trx: renderItem.item }
      )}
    >
      <TransactionItem trx={renderItem.item} />
    </Pressable>
  );
  if (trxList.length == 0) {
    return (
      <View style={{ alignContent: 'center' }}>
        <Text>Wah hasil pencarianmu gak ditemukan</Text>
      </View>
    );

  }
  else {
    return (
      <FlatList<ITransaction>
        data={trxList}
        keyExtractor={({ id }, _) => id}
        renderItem={renderItem}
      />
    );
  }
};

export default TransactionList;