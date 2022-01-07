import React from 'react';
import { StatusBar, StyleSheet, Text, View, Pressable, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faCopy } from '@fortawesome/free-solid-svg-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';


import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeStackScreenProps, RootStackParamList, } from '../navigator/Navigator';
import DetailInfo from '../components/DetailInfo';
import { displayDateFormatID, displayCurrencyFormatID } from '../utils/DisplayFormat';


const DetailScreen = ({ route }: NativeStackScreenProps<RootStackParamList, "DetailScreen">) => {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          backgroundColor: Colors.white,
          flexDirection: "column",
          paddingHorizontal: 16,
        }}>
        <View style={style.row}>
          <Text>ID TRANSAKSI: #{trx.id}</Text>
          <Pressable
            onPress={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} />
          </Pressable>
        </View>
        <View style={[style.row, { justifyContent: "space-between" }]}>
          <Text>DETAIL TRANSAKSI</Text>
          <Pressable
            android_ripple={{ color: '0x00000045', borderless: false, foreground: true }}
            onPress={() => navigation.goBack()}>
            <View style={{ padding: 20 }}>
              <Text>Tutup</Text>
            </View>
          </Pressable>
        </View>
        <View style={style.row}>
          <Text>{trx.sender_bank.toUpperCase()} </Text>
          <FontAwesomeIcon icon={faArrowRight} />
          <Text>{trx.beneficiary_bank.toUpperCase()}</Text>
        </View>
        <View style={style.row}>
          <View style={{ flexDirection: "column", flex: 2 }}>
            <DetailInfo title={trx.beneficiary_name.toUpperCase()} info={trx.account_number} />
            <DetailInfo title="BERITA TRANSFER" info={trx.remark} />
            <DetailInfo title="WAKTU DIBUAT" info={displayDateFormatID(trx.created_at)} />
          </View>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <DetailInfo title="NOMINAL" info={displayCurrencyFormatID(trx.amount)} />
            <DetailInfo title="KODE UNIK" info={trx.unique_code.toString()} />
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
}

const style = StyleSheet.create({
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
});

export default DetailScreen;