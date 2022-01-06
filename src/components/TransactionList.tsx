import React from "react";
import {
  View,
  FlatList,
  Text,
  ListRenderItem,
} from 'react-native';

import ITransaction from "../models/ITransaction";
import TransactionItem from '../components/TransactionItem';

const TransactionList: React.FC<{ trxList: Array<ITransaction> }> = ({ trxList }) => {

  const renderItem: ListRenderItem<ITransaction> = ({ ...renderItem }) => (
    <TransactionItem transaction={renderItem.item} />
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