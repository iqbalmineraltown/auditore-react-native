import React from 'react';
import { Text, View } from "react-native";

type DetailInfoProps = {
  title: string;
  info: string;
};

const DetailInfo: React.FC<DetailInfoProps> = (props) => (
  <View style={{ flexDirection: "column" }}>
    <Text>{props.title}</Text>
    <Text>{props.info}</Text>
  </View>
);

export default DetailInfo;