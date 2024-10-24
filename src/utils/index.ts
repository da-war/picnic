import { Gif } from "@src/constants/types";

// Utility function to map the API response to Gif type
export const mapApiToGif = (data: any): Gif => ({
  id: data.id,
  url: data.url,
  rating: data.rating,
  title: data.title,
  // Use the non-animated version of the image
    image: data.images.original.url, // Fallback to webp if fixed_height_small is not available
  stillImage:data.images.fixed_height_still.url || data.images.fixed_height_small_still.url
});

