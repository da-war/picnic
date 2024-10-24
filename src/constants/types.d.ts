import { ParamListBase } from "@react-navigation/native";

export interface Gif{
    id?: string;
    url: string;
    rating: string;
    title: string;
    testID?: string;
    image?: string;
    stillImage?:string
}

export interface RootStackParamList extends ParamListBase { // Extend ParamListBase
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