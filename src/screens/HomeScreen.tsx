import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from 'react-native-dotenv';

const HomeScreen = () => {
  const navigation = useNavigation();
  const detailScreen: string = 'Detail';

  return (
    <View>
      <Text>HomeScreen</Text>
      <Text
        onPress={() => navigation.navigate(detailScreen)}
        style={{textDecorationLine: 'underline'}}>
        Detail Screen
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
