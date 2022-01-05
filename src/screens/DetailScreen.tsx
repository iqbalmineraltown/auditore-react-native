import React from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeStackScreenProps, RootStackParamList, } from '../Navigator';
import DetailInfo from '../components/DetailInfo';
import { displayDateFormatID, displayCurrencyFormatID } from '../Utils';


const DetailScreen = ({ route }: NativeStackScreenProps<RootStackParamList, "DetailScreen">) => {
  const trx = route.params.trx;
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flexDirection: "column",
          paddingHorizontal: 16,
        }}>
        <View style={style.row}>
          <Text>ID TRANSAKSI: # {trx.id}</Text>
        </View>
        <View style={[style.row, { justifyContent: "space-between" }]}>
          <Text>DETAIL TRANSAKSI</Text>
          <Pressable
            android_ripple={{ color: '0x00000045', borderless: false, foreground: true }}
            onPress={() => navigation.goBack()}
          >
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