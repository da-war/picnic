import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from 'react-native-dotenv';
import GifCard from '@components/GifCard';

const HomeScreen = () => {
  const detailScreen: string = 'Detail';
  const navigation = useNavigation();

  console.log('sdfafads', API_KEY);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Text
        onPress={() => navigation.navigate('Detail' as never)}
        style={{textDecorationLine: 'underline'}}>
        Detail Screen
      </Text>
      <GifCard />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
