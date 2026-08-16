import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ channel1, channel2 }) => {
  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toString();
  };

  // Line Chart Data
  const lineChartData = {
    labels: ['Hôm qua', 'Hôm nay'],
    datasets: [
      {
        label: `${channel1.title} - Subscribers`,
        data: [channel1.subscriberCount * 0.98, channel1.subscriberCount],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: `${channel2.title} - Subscribers`,
        data: [channel2.subscriberCount * 0.98, channel2.subscriberCount],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: [`${channel1.title.substring(0, 15)}...`, `${channel2.title.substring(0, 15)}...`],
    datasets: [
      {
        label: 'Subscribers',
        data: [channel1.subscriberCount, channel2.subscriberCount],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Views',
        data: [channel1.viewCount, channel2.viewCount],
        backgroundColor: '#10B981',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6B7280',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
    },
  };

  return (
    <div className="mt-8 space-y-8">
      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tăng trưởng Subscribers</h3>
        <div className="h-80">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">So sánh 2 Channels</h3>
        <div className="h-80">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
          <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">{channel1.title}</h4>
          <div className="space-y-2 text-sm">
            <p className="text-blue-800 dark:text-blue-200"><span className="font-semibold">Subscribers:</span> {formatNumber(channel1.subscriberCount)}</p>
            <p className="text-blue-800 dark:text-blue-200"><span className="font-semibold">Views:</span> {formatNumber(channel1.viewCount)}</p>
            <p className="text-blue-800 dark:text-blue-200"><span className="font-semibold">Videos:</span> {formatNumber(channel1.videoCount)}</p>
            <p className="text-blue-800 dark:text-blue-200"><span className="font-semibold">Country:</span> {channel1.country || 'N/A'}</p>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900 rounded-lg p-6">
          <h4 className="text-lg font-bold text-red-900 dark:text-red-100 mb-4">{channel2.title}</h4>
          <div className="space-y-2 text-sm">
            <p className="text-red-800 dark:text-red-200"><span className="font-semibold">Subscribers:</span> {formatNumber(channel2.subscriberCount)}</p>
            <p className="text-red-800 dark:text-red-200"><span className="font-semibold">Views:</span> {formatNumber(channel2.viewCount)}</p>
            <p className="text-red-800 dark:text-red-200"><span className="font-semibold">Videos:</span> {formatNumber(channel2.videoCount)}</p>
            <p className="text-red-800 dark:text-red-200"><span className="font-semibold">Country:</span> {channel2.country || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
