import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import { colors, baseStyles } from "../const/Styles";
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
    <Pressable onPress={onPressHandler} android_ripple={{
      color: colors.rippleOverlay, borderless: false,
      foreground: true
    }}>
      <View style={styles.optionItem}>
        <View style={styles.outline}>
          {props.checked && <View style={styles.checked}></View>}
        </View>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 8,
  },
  outline: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderColor: colors.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: "75%",
    height: "75%",
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  label: {
    ...baseStyles.baseTextStyles
  }
});

export default SortTypeItem;