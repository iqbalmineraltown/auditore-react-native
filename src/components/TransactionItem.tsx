import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faCircle, faCircleNotch, faDotCircle } from '@fortawesome/free-solid-svg-icons'


const TransactionItem = () => {
  return (
    <View style={[styles.mainContainer, {
      flexDirection: "row",
    }]}>
      <View style={[styles.infoContainer, {
        flexDirection: "column",
        flex: 2,
        justifyContent: "center"
      }]}>
        <View style={[, {
          flexDirection: "row",
        }]}>
          <Text>Inazuma </Text>
          <FontAwesomeIcon icon={faArrowRight} />
          <Text>Liyue</Text>
        </View>
        <Text>Kamisato Ayaka</Text>
        <View style={[, {
          flexDirection: "row",
        }]}>
          <Text>Rp 99.999 </Text>
          <FontAwesomeIcon icon={faCircle} />
          <Text>24 November 2019</Text>
        </View>
      </View>
      <View style={[styles.statusContainer, {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
      }]}>
        <Text>Berhasil</Text>
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
