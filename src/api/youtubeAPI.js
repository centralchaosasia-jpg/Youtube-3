import axios from 'axios';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Danh sách ID của các kênh YouTube hàng đầu thế giới (T-Series, MrBeast, Cocomelon, SET India, PewDiePie, v.v.)
const TOP_CHANNEL_IDS = [
  'UCq-Fj5jknLsUf-MWSy4_brA', // T-Series
  'UCX6OQ3DkcsbYNE6H8uQQuVA', // MrBeast
  'UCbCmjCuTUZos6Inko4uUUpQ', // Cocomelon
  'UCpEhnqL0yE2UyccvfE5p3SA', // SET India
  'UC148CjNu4-s3A_xU5h0eGmA', // Kids Diana Show
  'UCsTCErX_B09RneT_g0BvBqQ', // Like Nastya
  'UC-lHJZR3Gqxm24_Vd_AJ5Yw', // PewDiePie
  'UCffDXn7fcJR8647MVM8hIBQ', // Vlad and Niki
  'UC3IZKseVpdzPSBaWxBxundA', // BTS (BANGTANTV)
  'UCb_sYA1bQS3Y2_82E4D8e3A', // Zee Music Company
  'UCp0hYYBW6IMayGgR-WeoCvQ', // BLACKPINK
  'UCpDJl2EmP7Oh9Oeqm1d3kVA', // WWE
  'UC4-79UOlP48-QNGgCvv5S3A', // Goldmines
  'UC0C-w0YjGpqDXGB8IHb662A', // Sony SAB
  'UC295-P4MCELpOrF3E0Xz1pA', // 5-Minute Crafts
];

// Hàm lấy chi tiết danh sách kênh theo tập hợp ID (Tối đa 50 ID mỗi lần gọi)
export const fetchTopChannels = async () => {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/channels`, {
      params: {
        part: 'statistics,snippet,brandingSettings',
        id: TOP_CHANNEL_IDS.join(','),
        key: YOUTUBE_API_KEY,
      },
    });

    if (!response.data.items) return [];

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

    // Sắp xếp theo số lượng đăng ký giảm dần
    return channels.sort((a, b) => b.subscriberCount - a.subscriberCount);
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

const youtubeAPI = {
  fetchTopChannels,
  fetchChannelStats,
};

export default youtubeAPI;
