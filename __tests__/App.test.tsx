import React from 'react';
import renderer, {act} from 'react-test-renderer'; // Import 'act' from 'react-test-renderer'
import {Provider} from 'react-redux';
import App from '../App'; // Path to your App component

import {store} from '../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

// Mock the NavigationContainer
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    NavigationContainer: ({children}) => <>{children}</>, // Render children directly
  };
});

// Mock the NativeStackNavigator
jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: () => {
      return {
        Navigator: ({children}) => <>{children}</>, // Render children directly
        Screen: ({children}) => <>{children}</>, // Render children directly
      };
    },
  };
});

describe('App Snapshot Test', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
