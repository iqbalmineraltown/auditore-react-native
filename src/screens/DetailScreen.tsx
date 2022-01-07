import React from 'react';
import {
  StatusBar, StyleSheet, Text, View, Pressable,
  useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faCopy } from '@fortawesome/free-solid-svg-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';

import { baseStyles, colors } from '../const/Styles';

import { NativeStackScreenProps, RootStackParamList, }
  from '../navigator/Navigator';
import DetailInfo from '../components/DetailInfo';
import { displayDateFormatID, displayCurrencyFormatID }
  from '../utils/DisplayFormat';


const DetailScreen = ({ route }: NativeStackScreenProps<RootStackParamList,
  "DetailScreen">) => {
  const trx = route.params.transaction;
  const navigation = useNavigation();

  const copyToClipboard = () => {
    Clipboard.setString(trx.id);
    Toast.show("ID Transaksi sudah berhasil disalin Kak", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });
  };

  const closeHandler = () => {
    navigation.goBack();
  };

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={baseStyles.baseScreenComponent}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: colors.white,
          flexDirection: "column",
        }}>
        <View style={styles.trxIDContainer}>
          <Text style={styles.infoTextStyle}>ID TRANSAKSI: #{trx.id}</Text>
          <Pressable
            onPress={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} color={colors.primary}
              style={styles.inlineIcon} />
          </Pressable>
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.trxDetailHeader}>
          <Text style={styles.infoTextStyle}>DETAIL TRANSAKSI</Text>
          <Pressable
            android_ripple={{
              color: colors.rippleOverlay, borderless: false,
              foreground: true
            }}
            style={styles.closeContainer}
            onPress={closeHandler}>
            <Text style={styles.closeLabel}>Tutup</Text>
          </Pressable>
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.bankInfoContainer}>
          <Text style={styles.bankTextStyles}>{trx.sender_bank.toUpperCase()}</Text>
          <FontAwesomeIcon icon={faArrowRight} size={14} style={styles.inlineIcon} />
          <Text style={styles.bankTextStyles}>{trx.beneficiary_bank.toUpperCase()}</Text>
        </View>
        <View style={styles.baseInfoContainer}>
          <View style={styles.leftInfoContainer}>
            <DetailInfo title={trx.beneficiary_name.toUpperCase()} info={trx.account_number} />
            <DetailInfo title="BERITA TRANSFER" info={trx.remark} />
            <DetailInfo title="WAKTU DIBUAT" info={displayDateFormatID(trx.created_at)} />
          </View>
          <View style={styles.rightInfoContainer}>
            <DetailInfo title="NOMINAL" info={displayCurrencyFormatID(trx.amount)} />
            <DetailInfo title="KODE UNIK" info={trx.unique_code.toString()} />
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    ...baseStyles.row,
    backgroundColor: colors.white,
  },
  trxIDContainer: {
    ...baseStyles.row,
    padding: 16
  },
  trxDetailHeader: {
    ...baseStyles.row,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  closeContainer: {
    padding: 16
  },
  closeLabel: {
    ...baseStyles.baseTextStyles,
    color: colors.primary,
  },
  separatorLine: {
    borderBottomColor: colors.black54,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bankInfoContainer: {
    ...baseStyles.row,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  inlineIcon: {
    marginHorizontal: 4,
  },
  baseInfoContainer: {
    ...baseStyles.row,
    paddingHorizontal: 16,
  },
  leftInfoContainer: {
    ...baseStyles.column,
    alignItems: "flex-start",
    flex: 2,
  },
  rightInfoContainer: {
    ...baseStyles.column,
    alignItems: "flex-start",
    flex: 1,
  },
  infoTextStyle: {
    ...baseStyles.baseTextStyles,
    fontWeight: "bold",
    fontSize: 14,
  },
  bankTextStyles: {
    ...baseStyles.baseTextStyles,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DetailScreen;