// src/screens/DetailScreen.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@src/constants/types';
import GifCard from '@src/components/GifCard';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>; // Define the route prop type

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>(); // Use the route hook with type safety
  const {item} = route.params; // Safely extract the item parameter

  return (
    <View style={styles.container}>
      <GifCard
        image={item.image}
        rating={item.rating}
        title={item.title}
        url={item.url}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
