import {SearchBarProps} from '@src/constants/types';
import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({
    placeholder = 'Search',
    onCancel = () => {},
    onChangeText = () => {},
    value = '',
    onFocus = () => {},
    onBlur = () => {},
    searchIconSize = 24,
    crossIconSize = 24,
    searchIconColor = 'gray',
    crossIconColor = 'gray',
    cancelText = 'Cancel',
    cancelTextColor = 'blue',
    inputStyle = {},
    containerStyle = {},
    testID,
    clearTestID,
  }) => {
    const [searchText, setSearchText] = useState(value);
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      onFocus();
    }, [onFocus]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      onBlur();
    }, [onBlur]);

    const handleCancel = useCallback(() => {
      setSearchText('');
      onCancel();
      onChangeText('');
      Keyboard.dismiss();
      inputRef.current?.blur();
    }, [onCancel, onChangeText]);

    const handleClear = useCallback(() => {
      setSearchText('');
      onChangeText('');
    }, [onChangeText]);

    const handleChangeText = useCallback(
      (text: string) => {
        setSearchText(text);
        onChangeText(text);
      },
      [onChangeText],
    );

    return (
      <View testID={testID} style={[styles.container, containerStyle]}>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="search"
            size={searchIconSize}
            color={searchIconColor}
          />
          <TextInput
            ref={inputRef}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            value={searchText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity testID={clearTestID} onPress={handleClear}>
              <MaterialIcons
                name="close"
                size={crossIconSize}
                color={crossIconColor}
              />
            </TouchableOpacity>
          )}
        </View>

        {(isFocused || searchText.length > 0) && (
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={[styles.cancelText, {color: cancelTextColor}]}>
              {cancelText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10, // Optional: add some space between input and cancel button
  },
  cancelText: {
    fontSize: 16,
  },
});

export default SearchBar;
