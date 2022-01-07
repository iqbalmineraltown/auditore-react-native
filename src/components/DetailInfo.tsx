import React from 'react';
import { StyleSheet, Text, View } from "react-native";

import { baseStyles } from '../const/Styles';

type DetailInfoProps = {
  title: string;
  info: string;
};

const DetailInfo: React.FC<DetailInfoProps> = (props) => (
  <View style={styles.mainContainer}>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.info}>{props.info}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    ...baseStyles.column,
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  title: {
    ...baseStyles.baseTextStyles,
    fontWeight: "bold"
  },
  info: {
    ...baseStyles.baseTextStyles,
  },
});

export default DetailInfo;