import React from 'react';
import { Text, View } from "react-native";

const DetailInfo: React.FC<{ title: string; info: string; }> = ({ title, info }) => (
  <View style={{ flexDirection: "column" }}>
    <Text>{title}</Text>
    <Text>{info}</Text>
  </View>
);

export default DetailInfo;