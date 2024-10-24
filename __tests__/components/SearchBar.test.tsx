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

  it('displays the input value correctly when the value prop is provided', () => {
    const {getByPlaceholderText} = render(
      <SearchBar placeholder="Search" value="Initial Value" />,
    );

    const input = getByPlaceholderText('Search');
    expect(input.props.value).toBe('Initial Value'); // Ensure initial value is displayed
  });

  it('calls onFocus when the input is focused', () => {
    const onFocusMock = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchBar placeholder="Search" onFocus={onFocusMock} />,
    );

    const input = getByPlaceholderText('Search');

    // Simulate focusing the input
    fireEvent(input, 'focus');

    expect(onFocusMock).toHaveBeenCalled(); // Ensure onFocus was called
  });

  it('calls onBlur when the input is blurred', () => {
    const onBlurMock = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchBar placeholder="Search" onBlur={onBlurMock} />,
    );

    const input = getByPlaceholderText('Search');

    // Simulate focusing and then blurring the input
    fireEvent(input, 'focus');
    fireEvent(input, 'blur');

    expect(onBlurMock).toHaveBeenCalled(); // Ensure onBlur was called
  });

  it('clears the input when clear button is pressed', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText, getByText} = render(
      <SearchBar placeholder="Search" onChangeText={onChangeTextMock} />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Test Search');

    // Simulate pressing the clear button
    fireEvent.press(getByText('Cancel')); // Assuming 'Cancel' acts as the clear button

    expect(input.props.value).toBe(''); // Check if input is cleared
    expect(onChangeTextMock).toHaveBeenCalledWith(''); // Ensure onChangeText was called with empty string
  });
});
