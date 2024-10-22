import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GifCard from '@components/GifCard';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>App</Text>
      <GifCard />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
