import axios from 'axios';
import { Image } from './types';

interface ImgsHttpResponse {
  results: Image[];
}

export const fetchImgs = async (
  userQuery: string,
  currentPage: number
): Promise<Image[]> => {
  const response = await axios.get<ImgsHttpResponse>(
    'https://api.unsplash.com/search/photos',
    {
      params: {
        client_id: 'i5Dyl0HnrKakRDGlMXH9_9CdNl0KPaqwZ2iuDhzM494',
        query: userQuery,
        per_page: 12,
        page: currentPage,
      },
    }
  );
  return response.data.results;
};
