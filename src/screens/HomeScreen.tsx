import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from 'react-native-dotenv';
import GifCard from '@components/GifCard';
import SearchBar from '@components/SearchBar';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Memoize the onChangeText handler
  const onChangeText = useCallback((text: string) => {
    setValue(text);
  }, []);

  // Memoize the handleFocus handler
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Memoize the handleBlur handler
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  console.log('API_KEY:', API_KEY);

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

      {/* Conditionally render GifCard based on focus state */}
      {!isFocused && <GifCard />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
