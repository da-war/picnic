import { ParamListBase } from "@react-navigation/native";

declare interface Gif{
    id?: string;
    url: string;
    rating: string;
    title: string;
    testID?: string;
    image?: string;
    stillImage?:string
}

declare interface RootStackParamList extends ParamListBase { // Extend ParamListBase
  Home: undefined; // No parameters for Home
  Detail: { item: Gif }; 
}

declare interface SearchBarProps  {
  placeholder?: string;
  onCancel?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  searchIconSize?: number;
  crossIconSize?: number;
  searchIconColor?: string;
  crossIconColor?: string;
  cancelText?: string;
  cancelTextColor?: string;
  inputStyle?: object;
  containerStyle?: object;
  testID?: string;
  clearTestID?: string;
};

declare interface GifItemProps{
  item: Gif;
  onPress: () => void;
}

// Define the types for the random GIF state
declare interface RandomGifState {
  gif: Gif | null; // Change to Gif type or null
  loading: boolean;
  error: string | null;
}

// Define the types for the search GIF state
declare interface SearchGifState {
  results: Gif[] | null; // Change to array of Gif or null
  loading: boolean;
  error: string | null;
}
