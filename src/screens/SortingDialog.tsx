import React from 'react';
import {
  Text, View, Modal, Pressable, TouchableWithoutFeedback, StyleSheet,
  ListRenderItem, FlatList
} from "react-native";

import { SortType } from "../models/SortType";
import SortTypeItem from "../components/SortTypeItem";
import { sortTypeData, SortingItemProps } from "../Const";

type SortingDialogProps = {
  sortSelectHandler: (sortType: SortingItemProps | null) => void;
  closeHandler: () => void;
  visible: boolean;
  selectedSortType: SortType | null;
};

const SortingDialog: React.FC<SortingDialogProps> = (props) => {

  const renderItem: ListRenderItem<SortingItemProps> = ({ ...renderItem }) => (
    <SortTypeItem
      checked={props.selectedSortType == renderItem.item.value}
      item={renderItem.item}
      value={renderItem.item.value}
      label={renderItem.item.label}
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
            <Pressable
              style={styles.button}
              onPressOut={onResetHandler}>
              <Text>Reset</Text>
            </Pressable>
            <FlatList<SortingItemProps>
              contentContainerStyle={{ flexGrow: 0 }}
              data={sortTypeData}
              keyExtractor={({ value }, _) => value.toString()}
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
  button: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#F194FF"
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

export default SortingDialog;