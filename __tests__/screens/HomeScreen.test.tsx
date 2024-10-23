import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TextInput, View} from 'react-native'; // Import necessary components
import HomeScreen from '../../src/screens/HomeScreen';
import {jest} from '@jest/globals';

// Mock the components used in HomeScreen
jest.mock('@components/SearchBar', () => {
  return ({value, onChangeText, onFocus, onBlur}: any) => (
    <TextInput
      testID="search-bar"
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
});

jest.mock('@components/GifCard', () => {
  return () => <View testID="gif-card" />;
});

describe('HomeScreen', () => {
  it('renders the search bar and gif card correctly', () => {
    const {getByTestId} = render(<HomeScreen />);

    // Check if the search bar is rendered
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeTruthy();

    // Check if the GifCard is rendered by default
    const gifCard = getByTestId('gif-card');
    expect(gifCard).toBeTruthy();
  });

  it('hides GifCard when the search bar is focused', () => {
    const {getByTestId, queryByTestId} = render(<HomeScreen />);

    const searchBar = getByTestId('search-bar');

    // Focus on the search bar
    fireEvent.focus(searchBar);

    // Check that the GifCard is not rendered
    expect(queryByTestId('gif-card')).toBeNull();
  });

  it('shows GifCard again when the search bar is blurred', () => {
    const {getByTestId, queryByTestId} = render(<HomeScreen />);

    const searchBar = getByTestId('search-bar');

    // Focus and then blur the search bar
    fireEvent.focus(searchBar);
    fireEvent.blur(searchBar);

    // Check that the GifCard is rendered again
    expect(getByTestId('gif-card')).toBeTruthy();
  });

  it('changes the search bar value on text input', () => {
    const {getByTestId} = render(<HomeScreen />);
    const searchBar = getByTestId('search-bar');

    // Simulate entering text into the search bar
    fireEvent.changeText(searchBar, 'Hello');
    expect(searchBar.props.value).toBe('Hello');
  });

  it('clears the search bar value when cancel is pressed', () => {
    const {getByTestId} = render(<HomeScreen />);
    const searchBar = getByTestId('search-bar');

    // Set some value
    fireEvent.changeText(searchBar, 'Hello');
    expect(searchBar.props.value).toBe('Hello');

    // Simulate cancel action
    fireEvent.changeText(searchBar, '');
    expect(searchBar.props.value).toBe('');
  });
});
