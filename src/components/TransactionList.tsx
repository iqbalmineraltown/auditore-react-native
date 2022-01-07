import React from "react";
import {
  View,
  FlatList,
  Text,
  ListRenderItem,
  StyleSheet,
} from 'react-native';

import { baseStyles } from '../const/Styles';

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
      <View style={styles.mainContainerEmpty}>
        <Text style={styles.labelEmpty}>Wah hasil pencarianmu gak ditemukan</Text>
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

const styles = StyleSheet.create({
  mainContainerEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelEmpty: {
    ...baseStyles.baseTextStyles,
    fontSize: 14,
    fontWeight: "500",
  }
});