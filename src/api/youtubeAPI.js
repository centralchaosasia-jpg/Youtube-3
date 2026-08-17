import axios from 'axios';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Popular categories
const CATEGORIES = [
  'Music', 'News & Politics', 'Gaming', 'Entertainment', 'Sports',
  'Education', 'Technology', 'How-to & Style', 'Travel', 'Pets & Animals',
  'Comedy', 'Film & Animation', 'Autos & Vehicles'
];

const fetchChannelStats = async (channelId) => {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/channels`, {
      params: {
        part: 'statistics,snippet,brandingSettings',
        id: channelId,
        key: YOUTUBE_API_KEY,
      },
    });

    if (response.data.items.length === 0) return null;

    const channel = response.data.items[0];
    const stats = channel.statistics;
    const snippet = channel.snippet;
    const branding = channel.brandingSettings;

    return {
      id: channelId,
      title: snippet.title,
      description: snippet.description || '',
      thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
      subscriberCount: parseInt(stats.subscriberCount) || 0,
      viewCount: parseInt(stats.viewCount) || 0,
      videoCount: parseInt(stats.videoCount) || 0,
      country: branding?.channel?.country || 'Unknown',
      publishedAt: snippet.publishedAt,
    };
  } catch (error) {
    console.error('Error fetching channel stats:', error.message);
    return null;
  }
};

const searchChannels = async (query, maxResults = 50) => {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'channel',
        maxResults: maxResults,
        key: YOUTUBE_API_KEY,
        order: 'viewCount',
      },
    });

    const channelIds = response.data.items.map(item => item.id.channelId);
    const channels = await Promise.all(
      channelIds.map(id => fetchChannelStats(id))
    );

    return channels.filter(ch => ch !== null);
  } catch (error) {
    console.error('Error searching channels:', error.message);
    return [];
  }
};

export const fetchTopChannels = async () => {
  try {
    const allChannels = [];

    // Fetch top channels from each category
    for (const category of CATEGORIES) {
      const channels = await searchChannels(category, 50);
      allChannels.push(...channels);
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Remove duplicates
    const uniqueChannels = Array.from(
      new Map(allChannels.map(ch => [ch.id, ch])).values()
    );

    // Sort by subscribers and return top 1000
    return uniqueChannels
      .sort((a, b) => b.subscriberCount - a.subscriberCount)
      .slice(0, 1000);
  } catch (error) {
    console.error('Error fetching top channels:', error);
    return [];
  }
};

const youtubeAPI {
  fetchTopChannels,
  fetchChannelStats,
  searchChannels,
}
export default youtubeAPI;
