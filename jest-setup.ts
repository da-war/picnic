import "@testing-library/react-native/extend-expect"
import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
