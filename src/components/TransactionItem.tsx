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
import {
  displayDateFormatID,
  displayCurrencyFormatID,
  bankNameCase,
} from '../utils/DisplayFormat';
import { baseStyles, colors } from '../const/Styles';
import { TransactionStatus, transactionStatusDisplay } from '../const/Status';


const TransactionItem: React.FC<{ transaction: ITransaction }> = (props) => {
  const navigation = useNavigation();
  const trx = props.transaction;

  const status = transactionStatusDisplay
    .find((s) => { return s.value == trx.status });

  const bgColorStyle = status?.key == TransactionStatus.Success ?
    styles.successBgColor : styles.pendingBgColor;

  const statusContainerStyle = [styles.baseStatusContainer, status?.key == TransactionStatus.Success ?
    styles.successBgColor : styles.pendingStatusContainer];

  const statusLabelStyle = [styles.baseStatusLabel, status?.key == TransactionStatus.Success ?
    styles.statusLabel : styles.pendingStatusLabel];

  const statusDisplay = status?.label;

  const navigateToDetailScreen = () => {
    navigation.navigate("DetailScreen", { transaction: trx })
  };

  return (
    <View style={[styles.mainContainer, bgColorStyle]}>
      <Pressable
        android_ripple={{
          color: colors.rippleOverlay, borderless: false,
          foreground: true
        }}
        onPress={navigateToDetailScreen}>
        <View style={styles.subContainer}>
          <View style={styles.infoContainer}>
            <View style={baseStyles.row}>
              <Text style={styles.bankLabel}>
                {trx.sender_bank.toUpperCase()}
              </Text>
              <FontAwesomeIcon icon={faArrowRight} size={12} style={styles.inlineIcon} />
              <Text style={styles.bankLabel}>
                {bankNameCase(trx.beneficiary_bank)}
              </Text>
            </View>
            <Text style={styles.infoLabel}>
              {trx.beneficiary_name.toUpperCase()}
            </Text>
            <View style={baseStyles.row}>
              <Text style={styles.infoLabel}>
                {displayCurrencyFormatID(trx.amount)}
              </Text>
              <FontAwesomeIcon icon={faCircle} size={8} style={styles.inlineIcon} />
              <Text style={styles.infoLabel}>
                {displayDateFormatID(trx.created_at)}
              </Text>
            </View>
          </View>
          <View style={statusContainerStyle}>
            <Text style={statusLabelStyle}>{statusDisplay}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
    paddingLeft: 5,
    borderRadius: 5,
    fontFamily: "serif"

  },
  successBgColor: {
    backgroundColor: colors.secondary,
  },
  pendingBgColor: {
    backgroundColor: colors.primary,
  },
  subContainer: {
    ...baseStyles.row,
    backgroundColor: colors.white,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  infoContainer: {
    flexDirection: "column",
    flex: 3,
    justifyContent: "center",
    paddingVertical: 12,
    paddingLeft: 14,
  },
  inlineIcon: {
    marginHorizontal: 4,
  },
  bankLabel: {
    ...baseStyles.baseTextStyles,
    fontSize: 14,
    fontWeight: "bold"
  },
  infoLabel: {
    ...baseStyles.baseTextStyles,
    fontSize: 14,
  },
  baseStatusContainer: {
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  pendingStatusContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  baseStatusLabel: {
    fontSize: 12,
  },
  statusLabel: {
    color: colors.white,
    fontWeight: "bold",
  },
  pendingStatusLabel: {
    color: colors.black,
    fontWeight: "bold",
  }
});

export default TransactionItem;
