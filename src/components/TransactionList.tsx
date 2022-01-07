import React from "react";
import {
  View,
  FlatList,
  Text,
  ListRenderItem,
} from 'react-native';

import ITransaction from "../models/ITransaction";
import TransactionItem from '../components/TransactionItem';

type TransactionListProps = {
  trxList: Array<ITransaction>;
  onRefresh: () => void;
  refreshing: boolean;
}

const TransactionList: React.FC<TransactionListProps> = (props) => {

  const renderItem: ListRenderItem<ITransaction> = ({ ...renderItem }) => (
    <TransactionItem transaction={renderItem.item} />
  );

  if (props.trxList.length == 0) {
    return (
      <View style={{ alignContent: 'center' }}>
        <Text>Wah hasil pencarianmu gak ditemukan</Text>
      </View>
    );
  }
  else {
    return (
      <FlatList<ITransaction>
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
        data={props.trxList}
        keyExtractor={({ id }, _) => id}
        renderItem={renderItem}
      />
    );
  }
};

export default TransactionList;