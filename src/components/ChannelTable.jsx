import React from 'react';

const ChannelTable = ({ channels, title, sortBy, selectedChannels, setSelectedChannels }) => {
  const handleSelect = (channel) => {
    if (selectedChannels.find(ch => ch.id === channel.id)) {
      setSelectedChannels(selectedChannels.filter(ch => ch.id !== channel.id));
    } else {
      if (selectedChannels.length < 2) {
        setSelectedChannels([...selectedChannels, channel]);
      }
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toString();
  };

  const sortedChannels = [...channels].sort((a, b) => {
    if (sortBy === 'subscribers') {
      return b.subscriberCount - a.subscriberCount;
    } else if (sortBy === 'views') {
      return b.viewCount - a.viewCount;
    }
    return 0;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 dark:bg-blue-800 text-white px-6 py-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Kênh</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                {sortBy === 'subscribers' ? 'Subscribers' : 'Views'}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Chọn</th>
            </tr>
          </thead>
          <tbody>
            {sortedChannels.slice(0, 100).map((channel, index) => (
              <tr
                key={channel.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-semibold">{index + 1}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={channel.thumbnail}
                      alt={channel.title}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                    />
                    <div className="truncate">
                      <p className="font-medium truncate">{channel.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{channel.country || 'N/A'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100 font-semibold">
                  {sortBy === 'subscribers'
                    ? formatNumber(channel.subscriberCount)
                    : formatNumber(channel.viewCount)
                  }
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedChannels.some(ch => ch.id === channel.id)}
                    onChange={() => handleSelect(channel)}
                    className="w-5 h-5 text-blue-600 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChannelTable;
