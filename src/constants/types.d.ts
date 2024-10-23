import { ParamListBase } from "@react-navigation/native";

export interface Gif{
    id?: string;
    url: string;
    rating: 'g'|'pg'|'pg-13'|'r';
    title: string;
    testID?: string;
    image?: string;
    stillImage?:string
}

export interface RootStackParamList extends ParamListBase { // Extend ParamListBase
  Home: undefined; // No parameters for Home
  Detail: { item: Gif }; // Expecting an object with item of type Gif
}