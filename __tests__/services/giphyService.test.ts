// giphyService.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchRandomGif, fetchSearchGifs } from '@services/giphyService';
import { API_KEY } from 'react-native-dotenv';
import { AxiosError } from 'axios';

describe('giphyService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // Create a new instance of the mock adapter for each test
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    // Reset the mock after each test
    mock.reset();
  });

  describe('fetchRandomGif', () => {
    it('should fetch a random GIF successfully', async () => {
      // Mock the response from the Giphy API
      const mockResponse = {
        data: {
          id: '123',
          url: 'https://giphy.com/gifs/sample',
          title: 'Sample GIF',
        },
      };

      // Mock the GET request to the Giphy random endpoint
      mock.onGet(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`).reply(200, mockResponse);

      // Call the fetchRandomGif function
      const response = await fetchRandomGif();

      // Assert that the response matches the mock data
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle errors when fetching random GIFs', async () => {
      // Mock the GET request to fail
      mock.onGet(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`).reply(500);

      try {
        // Call the fetchRandomGif function, which should throw an error
        await fetchRandomGif();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Assert that an error was thrown and it contains a response with status code
          expect(error.response?.status).toBe(500);
        } else {
          // Fail the test if the error is not an AxiosError
          throw new Error('Expected an Axios error');
        }
      }
    });
  });

  describe('fetchSearchGifs', () => {
    it('should fetch search results for GIFs successfully', async () => {
      const query = 'funny cats';

      // Mock the response from the Giphy search API
      const mockResponse = {
        data: {
          data: [
            {
              id: '456',
              url: 'https://giphy.com/gifs/funny-cat',
              title: 'Funny Cat GIF',
            },
          ],
        },
      };

      // Mock the GET request to the Giphy search endpoint
      mock.onGet(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          q: query,
          api_key: API_KEY,
          limit: 15,
        },
      }).reply(200, mockResponse);

      // Call the fetchSearchGifs function
      const response = await fetchSearchGifs(query);

      // Assert that the response matches the mock data
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle errors when searching for GIFs', async () => {
      const query = 'funny cats';

      // Mock the GET request to fail
      mock.onGet(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          q: query,
          api_key: API_KEY,
          limit: 15,
        },
      }).reply(500);

      try {
        // Call the fetchSearchGifs function, which should throw an error
        await fetchSearchGifs(query);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Assert that an error was thrown and it contains a response with status code
          expect(error.response?.status).toBe(500);
        } else {
          // Fail the test if the error is not an AxiosError
          throw new Error('Expected an Axios error');
        }
      }
    });
  });
});
