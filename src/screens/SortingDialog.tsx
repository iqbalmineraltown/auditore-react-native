import React from 'react';
import {
  Text, View, Modal, Pressable, TouchableWithoutFeedback, StyleSheet,
  ListRenderItem, FlatList
} from "react-native";

import { colors, baseStyles } from "../const/Styles";

import { SortType } from "../models/SortType";
import SortTypeItem from "../components/SortTypeItem";
import { sortTypeData, SortingItemProps } from "../const/SortTypeData";

type SortingDialogProps = {
  sortSelectHandler: (sortType: SortingItemProps | null) => void;
  closeHandler: () => void;
  visible: boolean;
  selectedSortType: SortType | null;
};

const SortingDialog: React.FC<SortingDialogProps> = (props) => {

  const renderItem: ListRenderItem<SortingItemProps> = ({ ...renderItem }) => (
    <SortTypeItem
      checked={props.selectedSortType == renderItem.item.key}
      item={renderItem.item}
      value={renderItem.item.key}
      label={renderItem.item.value}
      onPress={props.sortSelectHandler} />
  );

  const onResetHandler = () => {
    props.sortSelectHandler(null);
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.closeHandler}>
      <Pressable
        style={styles.centeredView}
        onPressOut={props.closeHandler}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.resetContainer}>
              <Pressable
                android_ripple={{
                  color: colors.rippleOverlay, borderless: false,
                  foreground: true
                }}
                style={styles.resetButton}
                onPress={onResetHandler}>
                <Text style={styles.resetLabel}>Reset</Text>
              </Pressable>
            </View>
            <FlatList<SortingItemProps>
              style={{ flexGrow: 0 }}
              data={sortTypeData}
              keyExtractor={({ key: value }, _) => value.toString()}
              renderItem={renderItem}
            />
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    ...baseStyles.row,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black54,
  },
  modalView: {
    ...baseStyles.column,
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 4,
    margin: 24,
    padding: 24,
    alignItems: "flex-start",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  resetContainer: {
    ...baseStyles.row,
    alignItems: "stretch",
  },
  resetButton: {
    padding: 10,
    elevation: 2,
  },
  resetLabel: {
    ...baseStyles.baseTextStyles,
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default SortingDialog;