import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@src/constants/types';
import GifCard from '@src/components/GifCard';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <GifCard
        testID="gif-card"
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
});

export default DetailScreen;
