import axios from 'axios';
import { API_KEY } from 'react-native-dotenv';

export const fetchRandomGif = () => {
  return axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
};

export const fetchSearchGifs = (query: string) => {
  return axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}`);
};