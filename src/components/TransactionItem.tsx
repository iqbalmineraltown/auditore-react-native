import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faCircle, } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

import { } from "../navigator/Navigator";
import ITransaction from '../models/ITransaction';
import { displayDateFormatID, displayCurrencyFormatID } from '../utils/DisplayFormat';


const TransactionItem: React.FC<{ transaction: ITransaction }> = (props) => {
  const navigation = useNavigation();
  const trx = props.transaction;
  return (
    <Pressable
      android_ripple={{ color: '0x00000045', borderless: false, foreground: true }}
      onPress={() => navigation.navigate("DetailScreen",
        { transaction: trx }
      )}
    >
      <View style={[styles.mainContainer, {
        flexDirection: "row",
      }]}>
        <View style={[styles.infoContainer, {
          flexDirection: "column",
          flex: 2,
          justifyContent: "center"
        }]}>
          <View style={{ flexDirection: "row" }}>
            <Text>{trx.sender_bank.toUpperCase()} </Text>
            <FontAwesomeIcon icon={faArrowRight} />
            <Text>{trx.beneficiary_bank.toUpperCase()}</Text>
          </View>
          <Text>{trx.beneficiary_name.toUpperCase()}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>{displayCurrencyFormatID(trx.amount)}</Text>
            <FontAwesomeIcon icon={faCircle} />
            <Text>{displayDateFormatID(trx.created_at)}</Text>
          </View>
        </View>
        <View style={[styles.statusContainer, {
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end"
        }]}>
          <Text>{trx.status}</Text>
        </View>
      </View>
    </Pressable>
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
