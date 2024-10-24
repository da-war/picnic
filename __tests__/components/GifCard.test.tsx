// GifCard.test.tsx
import React from 'react';
import {render} from '@testing-library/react-native';

import GifCard from '../../src/components/GifCard';

// Mock FastImage to prevent issues during tests
jest.mock('react-native-fast-image', () => {
  const {View} = require('react-native');
  return {
    ...jest.requireActual('react-native-fast-image'),
    default: (props: any) => <View {...props} />, // Mock implementation
  };
});

describe('GifCard', () => {
  const mockGif = {
    title: 'Test Gif',
    url: 'https://example.com/test.gif',
    testID: 'test-gif-card',
    rating: 'g',
    image: 'https://example.com/test.webp',
  };

  it('renders title and URL correctly', () => {
    const {getByTestId} = render(<GifCard {...mockGif} />);

    expect(getByTestId('test-gif-card-title').props.children).toEqual(
      mockGif.title,
    );
    expect(getByTestId('test-gif-card-url').props.children).toEqual(
      mockGif.url,
    );
  });

  it('displays the correct age and background color based on the rating', () => {
    const {getByTestId} = render(<GifCard {...mockGif} />);

    const ageContainer = getByTestId('test-gif-card-age-container');
    const ageText = getByTestId('test-gif-card-age');

    expect(ageText.props.children).toEqual(9); // Expect the age as a number
    expect(ageContainer.props.style[1].backgroundColor).toBe('green'); // Background color for rating 'g'
  });

  it('defaults to "N/A" for unknown ratings', () => {
    const unknownRatingGif = {
      ...mockGif,
      rating: 'unknown',
    };
    const {getByTestId} = render(<GifCard {...unknownRatingGif} />);

    const ageText = getByTestId('test-gif-card-age');
    const ageContainer = getByTestId('test-gif-card-age-container');

    expect(ageText.props.children).toEqual('N/A');
    expect(ageContainer.props.style[1].backgroundColor).toBe('gray'); // Default background color for unknown ratings
  });
});
