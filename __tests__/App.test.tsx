import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

test('SnapShot', () => {
  const {toJSON} = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});
