import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchTrendingVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 20,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    return [];
  }
};

export const searchVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 20,
        type: 'video',
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

export const fetchRelatedVideos = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        relatedToVideoId: videoId,
        type: 'video',
        maxResults: 15,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching related videos:', error);
    return [];
  }
};
