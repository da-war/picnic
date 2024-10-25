import {Gif} from '@src/constants/types';
import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

const GifCard: React.FC<Gif> = ({
  title = 'Giphy Gif',
  url,
  testID,
  rating,
  image,
}) => {
  const {width, height} = useWindowDimensions();

  // Normalize the rating to lowercase
  const normalizedRating = rating.toLowerCase(); // Add this line

  //object to store the rating and its corresponding age and background color
  const ratingLookup: Record<string, {age: number; backgroundColor: string}> = {
    g: {age: 9, backgroundColor: 'green'},
    pg: {age: 12, backgroundColor: 'blue'},
    'pg-13': {age: 17, backgroundColor: 'orange'},
    r: {age: 18, backgroundColor: 'red'},
    '18+': {age: 18, backgroundColor: 'red'}, // Similar to "r" for 18+
  };

  // Default to 'N/A' if rating is not found in the lookup
  const {age, backgroundColor} = ratingLookup[normalizedRating] || {
    age: 'N/A',
    backgroundColor: 'gray',
  };

  return (
    <View testID={testID} style={styles.container}>
      <FastImage
        testID="gif-card-test-id-image"
        source={{uri: image, priority: FastImage.priority.high}}
        style={[styles.gif, {width: width - 40, height: height / 3}]}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.parentContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title} testID={`${testID}-title`}>
            {title}
          </Text>
          <Text style={styles.url} testID={`${testID}-url`}>
            {url}
          </Text>
        </View>
        <View
          style={[styles.ageContainer, {backgroundColor}]}
          testID={`${testID}-age-container`}>
          <Text style={styles.age} testID={`${testID}-age`}>
            {age}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
    overflow: 'hidden',
  },
  gif: {
    borderRadius: 5,
    alignSelf: 'center',
  },
  parentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  leftContainer: {
    maxWidth: '80%',
  },
  ageContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  url: {
    fontSize: 12,
    color: 'gray',
  },
  age: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GifCard;
