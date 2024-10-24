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
import {fetchRandomGifStart, resetSearch, startSearch} from '../redux/actions';
import GifCard from '@components/GifCard';
import SearchBar from '@components/SearchBar';
import {RootState} from '../redux/store';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from '@src/constants/types';

const {width} = Dimensions.get('window');

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

  const renderGifCard = (gif: any) => (
    <GifCard
      image={gif.image}
      rating={gif.rating}
      url={gif.url}
      title={gif.title}
    />
  );

  const renderResults = () => {
    if (searchLoading) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }
    if (results && results.length > 0) {
      return (
        <FlatList
          data={results}
          numColumns={3}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {item})}
              style={styles.imageContainer}>
              <FastImage
                source={{
                  uri: item.stillImage,
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
      );
    }
    return <Text style={styles.emptyText}>Start searching for GIFs!</Text>;
  };

  return (
    <View style={styles.container}>
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
        renderResults()
      ) : loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : gif ? (
        renderGifCard(gif)
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
