import React from 'react';
import {render} from '@testing-library/react-native';
import GifCard from '../../src/components/GifCard';

describe('GifCard Component', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(
      <GifCard title="Test Title" url="https://example.com/image.gif" />,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('https://example.com/image.gif')).toBeTruthy();
  });

  it('displays the correct age restriction', () => {
    const {getByText} = render(
      <GifCard
        title="Test Title"
        url="https://example.com/image.gif"
        ageRestriction={21}
      />,
    );
    expect(getByText('21+')).toBeTruthy();
  });
});
