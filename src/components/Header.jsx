import React from 'react';

const Header = ({ lastUpdate, onUpdate, loading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold">YouTube 3</h1>
            <p className="text-blue-100 mt-2">Channel Statistics Dashboard</p>
          </div>
          <div className="text-right">
            <p className="text-sm mb-2">Cập nhật lúc: {formatDate(lastUpdate)}</p>
            <button
              onClick={onUpdate}
              disabled={loading}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật ngay'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
