import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import SearchBar from '@components/SearchBar';
import FastImage from 'react-native-fast-image';
import {GifItemProps, RootStackParamList} from '@src/constants/types';
import {RootState} from '@src/redux/store';
import {
  fetchRandomGifStart,
  resetSearch,
  startSearch,
} from '@src/redux/actions';

import GifCard from '@src/components/GifCard';

const {width, height} = Dimensions.get('window');

const GifItemSmall = ({item, onPress}: GifItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.imageContainer}>
      <FastImage
        source={{
          uri: item.stillImage,
          priority: FastImage.priority.high,
        }}
        style={styles.images}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Access the random GIF state from Redux store
  const {gif, loading} = useSelector((state: RootState) => state.randomGif);
  const {results, loading: searchLoading} = useSelector(
    (state: RootState) => state.searchGif,
  );

  useEffect(() => {
    dispatch(fetchRandomGifStart());
    dispatch(resetSearch());
  }, [dispatch]);

  const onChangeText = useCallback(
    (text: string) => {
      setValue(text);
      if (text) {
        dispatch(startSearch(text));
      }
    },
    [dispatch],
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const renderResults = () => {
    if (searchLoading) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }
    if (results && results.length > 0) {
      return (
        <FlatList
          data={results}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({item}) => (
            <GifItemSmall
              item={item}
              onPress={() => navigation.navigate('Detail', {item})}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No GIFs found.</Text>
          }
        />
      );
    }
    return <Text style={styles.emptyText}>Start searching for GIFs!</Text>;
  };

  return (
    <View testID="home-screen" style={styles.container}>
      <SearchBar
        testID="search-bar"
        value={value}
        onChangeText={onChangeText}
        onCancel={() => setValue('')}
        onFocus={handleFocus}
        onBlur={handleBlur}
        clearTestID="cancel-button"
      />

      {isFocused ? (
        <View style={{flex: 1}}>
          <Text style={styles.emptyText}>Search results:</Text>
          {renderResults()}
        </View>
      ) : loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : gif ? (
        <>
          <Text style={styles.emptyText}>Random GIF:</Text>
          <GifCard
            title={gif.title}
            url={gif.url}
            rating={gif.rating}
            image={gif.image}
            testID="gif-card"
          />
        </>
      ) : (
        <Text style={styles.emptyText}>No GIF available.</Text>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  listContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: width / 3 - 10,
    height: height / 7 - 10,
  },
  images: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
