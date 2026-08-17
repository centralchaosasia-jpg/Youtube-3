import axios from 'axios';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Danh sách ID của hàng loạt kênh YouTube lớn nhất thế giới hiện nay
const TOP_CHANNEL_IDS = [
  // Top Siêu Kênh
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
  "UCpDJl2x257Uu26b1g0344gg", // Eminem
  "UC0p5jTmjiX754O1E1S7bUug", // Ed Sheeran
  "UCbW18jz5qZEZ53A-Agp2iWA", // Ariana Grande
  "UC2XdaAVUannp6vAgX1de8Rw", // Dude Perfect
  "UC9CoOnJkIBMdeijd9lYoT_g", // Marshmello
  "UCYfdidRxbB8Qhf0Nx7ioOYw", // Alan Walker
  "UCY30JRSgdt31ERvqVIi_9CA", // Katy Perry
  "UCfM3zsQsOnfWNUppiycmBuw", // Mark Rober
  "UCso27yOBy6_H1S62P0y41qg", // Bright Side
  "UC_aEa8K-EOJ3D6gOs7HcyNg", // NoCopyrightSounds
  "UCsooa4yRKGN_zEE8iknghZA", // TED-Ed
  "UC56gL3f2cE2p3e-vW05S3gA", // Badabun
  "UCa10ninUBCNyGSZX4-f25Lg", // Whinderssonnunes
  
  // Các kênh giải trí & âm nhạc lớn khác
  "UCG8rbF3g2AMX70yOdEZpdHA", // Wave Music
  "UCk8GzjMOrta8yxDCkfylJYw", // Toys and Colors
  "UC9KhB_oZ4kC_4u608y6u6Cg", // Zee TV
  "UCB_qr75GzE31p4B76P36j5w", // BillionSurpriseFarms
  "UC3gNmTGu-QCMhRQIeX3yK1A", // Get Movies
  "UCk2_Xy6e0S5O-PZ258Y5Ewg", // Pinkfong Baby Shark
  "UCUp2XpP2R744X7jFqWk4R9A", // Movieclips
  "UCF_f5j89i0C4eS5C347W57g", // Shakira
  "UC3g0D98R1mN8x36pUaXyM_Q", // Selena Gomez
  "UC0A73YI_T1f3v9g309_7vGA", // Rihanna
  "UCXzp4E948BqS94I5tW98XkQ", // Bruno Mars
  "UCpko_-a4R4v_R6G9O-F6VvQ", // WWE Music
  "UCg_C3nO3uI0i3-XqU45aI7g", // Speed Records
  "UC0K2s_w-sD1o_M8g8Xz4mDA", // Shemaroo Filmi Gaane
  "UCf3C60L46B18G56_P7B73cA", // ChuChu TV
];

// Hàm chia nhỏ mảng ID thành từng nhóm 50 ID (giới hạn tối đa của YouTube API)
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const fetchTopChannels = async () => {
  try {
    // Chia danh sách ID thành các nhóm 50
    const idBatches = chunkArray(TOP_CHANNEL_IDS, 50);
    let allChannels = [];

    // Gọi API cho từng nhóm (mỗi nhóm tốn đúng 1 point)
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

    // Tự động sắp xếp các kênh theo số lượng đăng ký từ cao xuống thấp
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

const youtubeAPI = {
  fetchTopChannels,
  fetchChannelStats,
};

export default youtubeAPI;
