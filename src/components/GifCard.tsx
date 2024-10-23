import React from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';

type GifProps = {
  title?: string;
  url?: string;
  ageRestriction?: number;
};

const GifCard: React.FC<GifProps> = ({
  title = 'dawar',
  url = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWpnZXdlcmFnd29ianVudHJneHl5Mnpzbm5vbWdrejA1NWF2anZoNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c1ORoB1FORyqk/giphy.gif',
  ageRestriction = 17,
}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: url}}
        style={[styles.gif, {width: width - 40, height: height / 3}]}
        resizeMode="cover"
      />
      <View style={styles.parentContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.url}>{url}</Text>
        </View>
        <View
          style={[
            styles.ageContainer,
            ageRestriction > 17 ? styles.redBackground : styles.greenBackground,
          ]}>
          <Text style={styles.age}>{ageRestriction}+</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
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
  redBackground: {
    backgroundColor: 'red',
  },
  greenBackground: {
    backgroundColor: 'green',
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
