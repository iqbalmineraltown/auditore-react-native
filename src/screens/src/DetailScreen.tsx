import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  NativeStackScreenProps,
  RootStackParamList,
} from '../../Navigator';

const DetailScreen = ({ route }: NativeStackScreenProps<RootStackParamList, "DetailScreen">) => {
  const params = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{params.title}</Text>
    </View>
  );
}

export default DetailScreen;