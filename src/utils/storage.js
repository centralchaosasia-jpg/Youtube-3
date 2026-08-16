// Local storage utility functions

const STORAGE_KEY = 'youtube3_channels';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const saveChannelData = (data) => {
  try {
    const serialized = JSON.stringify(data);
    const size = new Blob([serialized]).size;

    if (size > MAX_STORAGE_SIZE) {
      console.warn('Data size exceeds maximum storage size, trimming history');
      // Keep only recent history
      const trimmedData = {
        ...data,
        history: (data.history || []).slice(-Math.floor((data.history || []).length / 2)),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedData));
    } else {
      localStorage.setItem(STORAGE_KEY, serialized);
    }
  } catch (error) {
    console.error('Error saving channel data:', error);
  }
};

export const loadChannelData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading channel data:', error);
    return null;
  }
};

export const clearChannelData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing channel data:', error);
  }
};

export const getChannelHistory = (channelId) => {
  try {
    const data = loadChannelData();
    if (!data || !data.history) return [];

    return data.history
      .map(entry => ({
        timestamp: entry.timestamp,
        channel: entry.channels.find(ch => ch.id === channelId),
      }))
      .filter(entry => entry.channel);
  } catch (error) {
    console.error('Error getting channel history:', error);
    return [];
  }
};

export const getStorageStats = () => {
  try {
    const data = loadChannelData();
    const serialized = JSON.stringify(data);
    const size = new Blob([serialized]).size;
    return {
      size: size,
      sizeInMB: (size / (1024 * 1024)).toFixed(2),
      channelsCount: data?.channels?.length || 0,
      historyEntries: data?.history?.length || 0,
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return null;
  }
};
