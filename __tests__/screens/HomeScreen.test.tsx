import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../src/screens/HomeScreen';

// Mock the SearchBar component
jest.mock('@components/SearchBar', () => {
  const React = require('react');
  const {TextInput, View, TouchableOpacity, Text} = require('react-native');

  return props => {
    const {value, onChangeText, onFocus, onBlur} = props;

    return (
      <View>
        <TextInput
          testID="search-bar"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {value.length > 0 && (
          <TouchableOpacity
            testID="cancel-button"
            onPress={() => onChangeText('')}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
});

// Mock the GifCard component
jest.mock('@components/GifCard', () => {
  const React = require('react');
  const {View} = require('react-native');
  return () => <View testID="gif-card" />;
});

describe('HomeScreen', () => {
  it('renders correctly and handles search input', async () => {
    const {getByTestId, queryByTestId} = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );

    const searchBar = getByTestId('search-bar');
    const gifCard = getByTestId('gif-card');

    // Initially, the GifCard should be visible
    expect(gifCard).toBeTruthy();

    // Simulate focusing the search bar
    fireEvent(searchBar, 'focus');

    // Wait for the GifCard to be removed
    await waitFor(() => {
      expect(queryByTestId('gif-card')).toBeNull(); // GifCard should not be visible
    });

    // Change the search input value
    fireEvent.changeText(searchBar, 'test');

    // Assert that the searchBar's value is updated (the component's value state)
    expect(searchBar.props.value).toBe('test');

    // Simulate blurring the search bar
    fireEvent(searchBar, 'blur');

    // Wait for the GifCard to be rendered again
    await waitFor(() => {
      expect(getByTestId('gif-card')).toBeTruthy(); // GifCard should be visible again
    });
  });

  it('clears the search on cancel', async () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );

    const searchBar = getByTestId('search-bar');

    // Simulate focusing the search bar
    fireEvent(searchBar, 'focus');

    // Change the search input value
    fireEvent.changeText(searchBar, 'test');
    expect(searchBar.props.value).toBe('test');

    // Simulate canceling the search
    fireEvent.press(getByTestId('cancel-button')); // Press the cancel button

    // Assert that the searchBar's value is empty
    expect(searchBar.props.value).toBe(''); // SearchBar should be empty
  });
});
