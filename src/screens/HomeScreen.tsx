import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet, StatusBar, View, ActivityIndicator, TextInput, Text,
  Pressable, Keyboard, TouchableWithoutFeedback
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ITransaction from '../models/ITransaction';
import { SortType } from '../models/SortType';
import TransactionList from '../components/TransactionList';
import { SortingItemProps } from '../const/SortTypeData';
import { sortByCreatedAt, sortByBeneficiaryName } from '../utils/Sort';
import SortingDialog from './SortingDialog';


const HomeScreen = () => {

  const [isLoading, setLoading] = useState(true);
  const [trxList, setTrxList] = useState(Array<ITransaction>());
  const [filteredTrxList, setFilteredTrxList] = useState(Array<ITransaction>());

  const [queryText, setQueryText] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedSortType, setSelectedSortType] =
    useState<SortType | null>(null);
  const [sortButtonLabel, setSortButtonLabel] = useState('Urutkan');


  const getTrxList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://nextar.flip.id/frontend-test'
      );
      const trxObj = await response.json();

      var arr: Array<ITransaction> = [];
      Object.keys(trxObj).forEach(function (key) {
        arr.push(trxObj[key] as ITransaction);
      });

      setTrxList(arr);
      setFilteredTrxList(arr);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => { getTrxList(); }, []);

  /// query w/ precedence: 
  /// beneficiary_name > beneficiary_bank > sender_bank > amount
  const searchQuery = (query: string) => {
    setQueryText(query);
    query = query.trim();
    if (query.length == 0) {
      setFilteredTrxList(trxList);
      return;
    }
    const filteredList = trxList.filter((trx) => {
      query = query.toLowerCase();
      const beneficiaryName = trx.beneficiary_name.toLowerCase();
      const senderBank = trx.sender_bank.toLowerCase();
      const beneficiaryBank = trx.beneficiary_bank.toLowerCase();
      const amount = trx.amount.toString();
      return beneficiaryName.indexOf(query) > -1
        || beneficiaryBank.indexOf(query) > -1
        || senderBank.indexOf(query) > -1
        || amount.indexOf(query) > -1;
    });
    setFilteredTrxList(filteredList);
  };

  const onRefreshHandler = async () => {
    await getTrxList();
    clearQuery();
    setSelectedSortType(null);
  }

  const clearQuery = () => {
    setQueryText('');
    setFilteredTrxList(trxList);
  };

  const onOpenFilterModal = () => {
    setFilterModalVisible(true);
  }

  const onCloseFilterModal = () => {
    setFilterModalVisible(false);
  }

  const onSelectSortHandler = (sortItem: SortingItemProps | null) => {
    if (selectedSortType == null && sortItem?.value == null) {
      setFilterModalVisible(false);
      return;
    }

    setSelectedSortType(sortItem?.value ?? null);
    setSortButtonLabel(sortItem?.label ?? 'Urutkan')

    const sortType = sortItem?.value;
    let sortedTrxList: ITransaction[];
    switch (sortType) {
      case SortType.NameAscending:
        sortedTrxList = sortByBeneficiaryName(filteredTrxList, true);
        break;
      case SortType.NameDescending:
        sortedTrxList = sortByBeneficiaryName(filteredTrxList, false);
        break;
      case SortType.CreatedDateAscending:
        sortedTrxList = sortByCreatedAt(filteredTrxList, true);
        break;
      case SortType.CreatedDateDescending:
        sortedTrxList = sortByCreatedAt(filteredTrxList, false);
        break;
      default:
        sortedTrxList = trxList;
        break;
    }
    setFilteredTrxList(sortedTrxList);
    setFilterModalVisible(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3, flexDirection: "row" }}>
          <TextInput
            onChangeText={searchQuery}
            value={queryText}
            placeholder="Cari nama, bank, atau nominal">
          </TextInput>
          <Pressable
            style={[styles.sortButton]}
            onPress={clearQuery}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Pressable>
        </View>
        <View style={{ flex: 2 }}>
          <Pressable
            style={[styles.sortButton]}
            onPress={onOpenFilterModal}>
            <Text style={styles.textStyle}>{sortButtonLabel}</Text>
          </Pressable>
        </View>
      </View>
      <SortingDialog
        visible={isFilterModalVisible}
        closeHandler={onCloseFilterModal}
        sortSelectHandler={onSelectSortHandler}
        selectedSortType={selectedSortType}
      />
      <View
        style={{ backgroundColor: Colors.white }}>
        {isLoading ?
          <ActivityIndicator /> :
          <TransactionList
            trxList={filteredTrxList}
            refreshing={isLoading}
            onRefresh={onRefreshHandler} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000054"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  clearTextButton: {
    padding: 10,
  },
  sortButton: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HomeScreen;

