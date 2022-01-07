import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { promisify } from "util";

import { SortType } from '../models/SortType';
import { SortingItemProps } from '../const/SortTypeData';

interface SortTypeItemProps {
  onPress: (sortType: SortingItemProps | null) => void
  checked: boolean;
  label: string;
  value: SortType;
  item: SortingItemProps;
}

const SortTypeItem: React.FC<SortTypeItemProps> = (props) => {

  const onPressHandler = () => {
    props.onPress(props.item);
  }

  return (
    <Pressable onPress={onPressHandler} style={styles.optionItem}>
      <View style={styles.outline}>
        {props.checked && <View style={styles.checked}></View>}
      </View>
      <Text>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  outline: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderColor: "#AABBCCFF",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: "75%",
    height: "75%",
    borderRadius: 999,
    backgroundColor: "#AABBCCFF",
  },
});

export default SortTypeItem;