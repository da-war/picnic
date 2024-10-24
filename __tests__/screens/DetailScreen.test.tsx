import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import DetailScreen from '../../src/screens/DetailScreen'; // Adjust the path as needed
import {useRoute} from '@react-navigation/native';

// Mock the navigation ref
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'), // Retain original exports
    useRoute: jest.fn(), // Mock the useRoute function
  };
});

describe('DetailScreen', () => {
  const mockItem = {
    image: 'https://example.com/image.gif',
    rating: 'pg',
    title: 'Example GIF',
    url: 'https://example.com',
  };

  beforeEach(() => {
    // Mock the useRoute return value
    (useRoute as jest.Mock).mockReturnValue({
      params: {item: mockItem},
    });
  });

  it('renders GifCard with correct data', () => {
    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <DetailScreen />
      </NavigationContainer>,
    );

    // Check if GifCard is rendered with the correct data
    const gifCard = getByTestId('gif-card');
    expect(gifCard).toBeTruthy();

    // Check the title and URL are rendered correctly
    expect(getByText(mockItem.title)).toBeTruthy();
    expect(getByText(mockItem.url)).toBeTruthy();
  });

  it('renders the image correctly', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <DetailScreen />
      </NavigationContainer>,
    );

    // Check if the image is rendered correctly
    const image = getByTestId('gif-card-test-id-image');
    expect(image.props.source.uri).toEqual(mockItem.image);
  });
});
