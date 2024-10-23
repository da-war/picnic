import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly with default props', () => {
    const {getByPlaceholderText} = render(<SearchBar placeholder="Search" />);

    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchBar placeholder="Search" onChangeText={onChangeTextMock} />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Test Search');

    expect(onChangeTextMock).toHaveBeenCalledWith('Test Search');
  });

  it('clears the input when cancel button is pressed', () => {
    const onCancelMock = jest.fn();
    const {getByPlaceholderText, getByText} = render(
      <SearchBar placeholder="Search" onCancel={onCancelMock} />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Test Search');

    // Simulate pressing the Cancel button
    fireEvent.press(getByText('Cancel'));

    expect(input.props.value).toBe(''); // Check if input is cleared
    expect(onCancelMock).toHaveBeenCalled(); // Ensure onCancel was called
  });
});
