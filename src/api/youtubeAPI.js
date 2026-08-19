import axios from 'axios';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const TOP_CHANNEL_IDS = [
  "UCX6OQ3DkcsbYNE6H8uQQuVA", // MrBeast
  "UCq-Fj5jknLsUf-MWSy4_brA", // T-Series
  "UCbCmjCuTUZos6Inko4uObCA", // Cocomelon
  "UCpEhnqL0yE2UycKcEbOIPRA", // SET India
  "UC_wOBS46Vn2e_O7f11_3jbg", // Kids Diana Show
  "UCJplp5Sje-B16P8Ozbp452w", // Like Nastya
  "UCvlE1372DFUBNd87d460E3w", // Vlad and Niki
  "UC-lHJZR3Gqxm24_Vd_AJ5Yw", // PewDiePie
  "UCFFbwnve3yF6Kul42k5wUBA", // Zee Music Company
  "UCJ5v_MCY6GNUBTO8-D3XoAg", // WWE
  "UC3N9i_KvK6dcRhorg882c8g", // Goldmines
  "UC295-P4MCTJGSuyE6285BkA", // 5-Minute Crafts
  "UC16niRr50-MSBwiO3YDb3RA", // Sony SAB
  "UCOmHUn--16B90oW2L6FRR3A", // BLACKPINK
  "UC3IZKseVptid5gZsXtQ4ESQ", // HYBE LABELS
  "UC0C-w0YjGpqDXGB8IHb662A", // Justin Bieber
  "UCqECaJ8Gagnn7YCbPEzWH6g", // Taylor Swift
  "UCpDJl2EmP7Oh9Oeqm1d3kVA", // Eminem
  "UC0p5jTmjiX754O1E1S7bUug", // Ed Sheeran
  "UCbW18jz5qZEZ53A-Agp2iWA"  // Ariana Grande
];

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const fetchTopChannels = async () => {
  try {
    const idBatches = chunkArray(TOP_CHANNEL_IDS, 50);
    let allChannels = [];

    for (const batch of idBatches) {
      const response = await axios.get(`${YOUTUBE_BASE_URL}/channels`, {
        params: {
          part: 'statistics,snippet,brandingSettings',
          id: batch.join(','),
          key: YOUTUBE_API_KEY,
        },
      });

      if (response.data.items) {
        const channels = response.data.items.map((channel) => ({
          id: channel.id,
          title: channel.snippet.title,
          description: channel.snippet.description || '',
          thumbnail: channel.snippet.thumbnails?.medium?.url || channel.snippet.thumbnails?.default?.url,
          subscriberCount: parseInt(channel.statistics.subscriberCount) || 0,
          viewCount: parseInt(channel.statistics.viewCount) || 0,
          videoCount: parseInt(channel.statistics.videoCount) || 0,
          country: channel.brandingSettings?.channel?.country || 'Global',
          publishedAt: channel.snippet.publishedAt,
        }));
        allChannels.push(...channels);
      }
    }

    return allChannels.sort((a, b) => b.subscriberCount - a.subscriberCount);
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu kênh:', error.message);
    return [];
  }
};

export const fetchChannelStats = async (channelId) => {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/channels`, {
      params: {
        part: 'statistics,snippet,brandingSettings',
        id: channelId,
        key: YOUTUBE_API_KEY,
      },
    });

    if (!response.data.items || response.data.items.length === 0) return null;

    const channel = response.data.items[0];
    return {
      id: channelId,
      title: channel.snippet.title,
      description: channel.snippet.description || '',
      thumbnail: channel.snippet.thumbnails?.medium?.url || channel.snippet.thumbnails?.default?.url,
      subscriberCount: parseInt(channel.statistics.subscriberCount) || 0,
      viewCount: parseInt(channel.statistics.viewCount) || 0,
      videoCount: parseInt(channel.statistics.videoCount) || 0,
      country: channel.brandingSettings?.channel?.country || 'Global',
      publishedAt: channel.snippet.publishedAt,
    };
  } catch (error) {
    console.error('Lỗi khi tải chi tiết kênh:', error.message);
    return null;
  }
};

export const searchChannels = async (query) => {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'channel',
        maxResults: 20,
        key: YOUTUBE_API_KEY,
      },
    });
    return response.data.items || [];
  } catch (error) {
    console.error('Lỗi khi tìm kiếm:', error.message);
    return [];
  }
};

const youtubeAPI = {
  fetchTopChannels,
  fetchChannelStats,
  searchChannels,
};

export default youtubeAPI;
