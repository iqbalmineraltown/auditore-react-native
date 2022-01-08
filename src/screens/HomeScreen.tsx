import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet, StatusBar, View, ActivityIndicator, TextInput, Text,
  Pressable, useColorScheme,
} from 'react-native';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faSearch, faChevronDown }
  from '@fortawesome/free-solid-svg-icons';

import { colors, baseStyles } from "../const/Styles";

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
  const [isQueryFocused, setQueryFocused] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

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
    if (query.length == 0) {
      setQueryFocused(false);
      setFilteredTrxList(trxList);
      return;
    }
    setQueryFocused(true);
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
    setSortButtonLabel('Urutkan');
  }

  const clearQuery = () => {
    setQueryText('');
    setQueryFocused(false);
    setFilteredTrxList(trxList);
  };

  const onOpenFilterModal = () => {
    setFilterModalVisible(true);
  };

  const onCloseFilterModal = () => {
    setFilterModalVisible(false);
  };

  const onSelectSortHandler = (sortItem: SortingItemProps | null) => {
    if (selectedSortType == null && sortItem?.key == null) {
      setFilterModalVisible(false);
      return;
    }

    setSelectedSortType(sortItem?.key ?? null);
    setSortButtonLabel(sortItem?.value ?? 'Urutkan')

    const sortType = sortItem?.key;
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
    <SafeAreaView style={baseStyles.baseScreenComponent}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.mainHeader}>
        <View style={styles.queryContainer}>
          <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} />
          <TextInput
            style={styles.queryInput}
            onChangeText={searchQuery}
            value={queryText}
            maxLength={30}
            placeholderTextColor={colors.textHint}
            placeholder="Cari nama, bank, atau nominal">
          </TextInput>
          {isQueryFocused && <Pressable
            onPress={clearQuery}>
            <FontAwesomeIcon icon={faTimes}
              style={styles.clearTextButton} />
          </Pressable>}
        </View>
        <View style={styles.filterContainer}>
          <Pressable
            android_ripple={{
              color: colors.rippleOverlay, borderless: false,
              foreground: true
            }}
            style={styles.sortButton}
            onPress={onOpenFilterModal}>
            <Text style={[styles.sortButtonLabel, baseStyles.primaryAction]}>
              {sortButtonLabel}
            </Text>
            <FontAwesomeIcon icon={faChevronDown}
              style={baseStyles.primaryAction} />
          </Pressable>
        </View>
      </View>
      <SortingDialog
        visible={isFilterModalVisible}
        closeHandler={onCloseFilterModal}
        sortSelectHandler={onSelectSortHandler}
        selectedSortType={selectedSortType}
      />
      <View>
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
  mainHeader: {
    ...baseStyles.row,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 4,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  clearTextButton: {
    padding: 10,
    color: colors.placeholder,
  },
  sortButtonLabel: {
    fontWeight: "bold",
    paddingRight: 2,
  },
  sortButton: {
    ...baseStyles.row,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  searchIcon: {
    color: colors.placeholder
  },
  queryContainer: {
    ...baseStyles.row,
    flex: 3,
  },
  queryInput: {
    ...baseStyles.baseTextStyles,
    flex: 1,
  },
  filterContainer: {
    ...baseStyles.row,
  },
});

export default HomeScreen;

