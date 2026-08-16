import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchFilter from '../components/SearchFilter';
import ChannelTable from '../components/ChannelTable';
import Charts from '../components/Charts';
import { fetchTopChannels } from '../api/youtubeAPI';
import { loadChannelData, saveChannelData } from '../utils/storage';

const Dashboard = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriberRange, setSubscriberRange] = useState([0, 1000000000]);
  const [viewRange, setViewRange] = useState([0, 1000000000]);
  const [selectedChannels, setSelectedChannels] = useState([]);

  // Load data on mount
  useEffect(() => {
    const savedData = loadChannelData();
    if (savedData) {
      setChannels(savedData.channels || []);
      setLastUpdate(savedData.lastUpdate);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...channels];

    // Filter by country
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(ch => ch.country === selectedCountry);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(ch =>
        ch.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subscriber range
    filtered = filtered.filter(ch =>
      ch.subscriberCount >= subscriberRange[0] &&
      ch.subscriberCount <= subscriberRange[1]
    );

    // Filter by view range
    filtered = filtered.filter(ch =>
      ch.viewCount >= viewRange[0] &&
      ch.viewCount <= viewRange[1]
    );

    setFilteredChannels(filtered);
  }, [channels, selectedCountry, searchTerm, subscriberRange, viewRange]);

  const handleUpdateData = async () => {
    setLoading(true);
    try {
      const newChannels = await fetchTopChannels();
      const savedData = loadChannelData() || {};
      const dataToSave = {
        channels: newChannels,
        lastUpdate: new Date().toISOString(),
        history: (savedData.history || []).concat([{
          timestamp: new Date().toISOString(),
          channels: newChannels
        }])
      };
      saveChannelData(dataToSave);
      setChannels(newChannels);
      setLastUpdate(dataToSave.lastUpdate);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Lỗi khi cập nhật dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header lastUpdate={lastUpdate} onUpdate={handleUpdateData} loading={loading} />
      
      <div className="container mx-auto px-4 py-8">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          subscriberRange={subscriberRange}
          setSubscriberRange={setSubscriberRange}
          viewRange={viewRange}
          setViewRange={setViewRange}
          countries={['all', 'VN', 'US', 'JP', 'KR', 'IN', 'BR', 'RU', 'MX', 'ID']}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <ChannelTable
            channels={filteredChannels}
            title="Top Channels - Subscribers"
            sortBy="subscribers"
            selectedChannels={selectedChannels}
            setSelectedChannels={setSelectedChannels}
          />
          <ChannelTable
            channels={filteredChannels}
            title="Top Channels - Views"
            sortBy="views"
            selectedChannels={selectedChannels}
            setSelectedChannels={setSelectedChannels}
          />
        </div>

        {selectedChannels.length === 2 && (
          <Charts
            channel1={selectedChannels[0]}
            channel2={selectedChannels[1]}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
