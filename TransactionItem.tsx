import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const TransactionItem = () => {
  return (
    <View style={[styles.container, {
      flexDirection: "row",
    }]}>
      <View style={[styles.container, {
        flexDirection: "column",
      }]}>
        <Text>Bank A Bank B</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'crimson'
  },
});

export default TransactionItem;
