import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@src/constants/types';
import GifCard from '@src/components/GifCard';
import {useNavigation} from '@react-navigation/native';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation();
  const {item} = route.params;

  useEffect(() => {
    // Set the title of the screen to the gif title if available
    navigation.setOptions({title: item.title || 'Gif Title'});
  }, [navigation, item.title]);

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
