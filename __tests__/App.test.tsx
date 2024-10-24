import React from 'react';
import renderer from 'react-test-renderer'; // Import 'act' from 'react-test-renderer' is not needed here
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {store} from '@src/redux/store';
import App from 'App';

// Mock the NavigationContainer
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    NavigationContainer: ({children}: {children: React.ReactNode}) => (
      <>{children}</>
    ), // Explicitly type 'children'
  };
});

// Mock the NativeStackNavigator
jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: () => {
      return {
        Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>, // Explicitly type 'children'
        Screen: ({children}: {children: React.ReactNode}) => <>{children}</>, // Explicitly type 'children'
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
