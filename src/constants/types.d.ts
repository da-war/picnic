export interface Gif{
    id?: string;
    url: string;
    rating: 'g'|'pg'|'pg-13'|'r';
    title: string;
    testID?: string;
    image?: string;
    stillImage?:string
}