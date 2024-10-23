// HomeScreen.tsx
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchRandomGifStart, resetSearch, startSearch} from '../redux/actions';
import GifCard from '@components/GifCard';
import SearchBar from '@components/SearchBar';
import {RootState} from '../redux/store';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Access the random GIF state from Redux store
  const {gif, loading} = useSelector((state: RootState) => state.randomGif);
  const {results, loading: searchLoading} = useSelector(
    (state: RootState) => state.searchGif,
  );

  useEffect(() => {
    // Dispatch action to start fetching random GIFs
    dispatch(fetchRandomGifStart());

    // Optionally, reset search results when component mounts
    dispatch(resetSearch());
  }, [dispatch]);

  // Memoize the onChangeText handler
  const onChangeText = useCallback(
    (text: string) => {
      setValue(text);
      if (text) {
        dispatch(startSearch(text)); // Dispatch the search action on text change
      }
    },
    [dispatch],
  );

  // Memoize the handleFocus and handleBlur handlers
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        testID="search-bar"
        value={value}
        onChangeText={onChangeText}
        onCancel={() => setValue('')} // Clear search on cancel
        onFocus={handleFocus} // Call handleFocus when focused
        onBlur={handleBlur} // Call handleBlur when blurred
        clearTestID="cancel-button"
      />

      {/* Conditionally render loading text or GIFs based on focus state */}
      {isFocused ? (
        // Show searched GIFs or loading state
        searchLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : results && results.length > 0 ? (
          <View style={{flex: 1, marginTop: 20}}>
            <FlatList
              data={results} // Ensure results is of type Gif[] or null
              numColumns={3}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Detail', {item})}
                  style={styles.imageContainer}>
                  <FastImage
                    source={{
                      uri: item.stillImage, // Use the image property from the Gif type
                      priority: FastImage.priority.high,
                    }}
                    style={styles.images}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No GIFs found.</Text>
              }
            />
          </View>
        ) : (
          <Text style={styles.emptyText}>Start searching for GIFs!</Text>
        )
      ) : // Show random GIF
      loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : gif ? (
        <GifCard
          image={gif.image}
          rating={gif.rating}
          url={gif.url}
          title={gif.title}
        />
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
    height: width / 3 - 10,
    marginBottom: 10,
  },
  images: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
