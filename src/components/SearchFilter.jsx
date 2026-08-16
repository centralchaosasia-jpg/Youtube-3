import React from 'react';

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  subscriberRange,
  setSubscriberRange,
  viewRange,
  setViewRange,
  countries
}) => {
  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Tìm kiếm kênh
        </label>
        <input
          type="text"
          placeholder="Nhập tên kênh..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Quốc gia
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {countries.map(country => (
            <option key={country} value={country}>
              {country === 'all' ? 'Tất cả' : country}
            </option>
          ))}
        </select>
      </div>

      {/* Subscriber Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Range subscribers: {formatNumber(subscriberRange[0])} - {formatNumber(subscriberRange[1])}
        </label>
        <input
          type="range"
          min="0"
          max="1000000000"
          value={subscriberRange[1]}
          onChange={(e) => setSubscriberRange([subscriberRange[0], parseInt(e.target.value)])}
          className="w-full cursor-pointer"
        />
      </div>

      {/* View Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Range views: {formatNumber(viewRange[0])} - {formatNumber(viewRange[1])}
        </label>
        <input
          type="range"
          min="0"
          max="100000000000"
          value={viewRange[1]}
          onChange={(e) => setViewRange([viewRange[0], parseInt(e.target.value)])}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
