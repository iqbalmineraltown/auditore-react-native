import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faCircle, } from '@fortawesome/free-solid-svg-icons';
import ITransaction from '../models/ITransaction';


const TransactionItem: React.FC<{ trx: ITransaction }> = (props) => {
  return (
    <View style={[styles.mainContainer, {
      flexDirection: "row",
    }]}>
      <View style={[styles.infoContainer, {
        flexDirection: "column",
        flex: 2,
        justifyContent: "center"
      }]}>
        <View style={{ flexDirection: "row" }}>
          <Text>{props.trx.sender_bank.toUpperCase()} </Text>
          <FontAwesomeIcon icon={faArrowRight} />
          <Text>{props.trx.beneficiary_bank.toUpperCase()}</Text>
        </View>
        <Text>{props.trx.beneficiary_name.toUpperCase()}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>{props.trx.amount}</Text>
          <FontAwesomeIcon icon={faCircle} />
          <Text>{props.trx.completed_at}</Text>
        </View>
      </View>
      <View style={[styles.statusContainer, {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
      }]}>
        <Text>{props.trx.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  },
  infoContainer: {
    backgroundColor: 'crimson'
  },
  statusContainer: {
    backgroundColor: 'aliceblue'
  }
});

export default TransactionItem;
