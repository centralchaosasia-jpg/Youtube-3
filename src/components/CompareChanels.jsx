import React, { useState } from 'react';

const CompareChannels = ({ channels = [] }) => {
  // Mặc định chọn kênh thứ 1 và kênh thứ 2 trong danh sách
  const [channel1Id, setChannel1Id] = useState(channels[0]?.id || '');
  const [channel2Id, setChannel2Id] = useState(channels[1]?.id || '');

  const ch1 = channels.find((c) => c.id === channel1Id) || channels[0];
  const ch2 = channels.find((c) => c.id === channel2Id) || channels[1];

  // Hàm định dạng số cho dễ đọc (ví dụ: 1000000 -> 1,000,000)
  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num || 0);
  };

  if (!channels || channels.length === 0) {
    return <p style={{ textAlign: 'center' }}>Đang tải danh sách kênh để so sánh...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚔️ So Sánh 2 Kênh YouTube</h2>

      {/* Thanh chọn 2 kênh */}
      <div style={styles.selectRow}>
        <div style={styles.selectBox}>
          <label style={styles.label}><b>Chọn Kênh 1:</b></label>
          <select
            value={channel1Id}
            onChange={(e) => setChannel1Id(e.target.value)}
            style={styles.select}
          >
            {channels.map((c) => (
              <option key={`ch1-${c.id}`} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.selectBox}>
          <label style={styles.label}><b>Chọn Kênh 2:</b></label>
          <select
            value={channel2Id}
            onChange={(e) => setChannel2Id(e.target.value)}
            style={styles.select}
          >
            {channels.map((c) => (
              <option key={`ch2-${c.id}`} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Khung hiển thị so sánh */}
      {ch1 && ch2 && (
        <div style={styles.compareGrid}>
          {/* Card Kênh 1 */}
          <div style={styles.card}>
            <img src={ch1.thumbnail} alt={ch1.title} style={styles.avatar} />
            <h3 style={styles.channelName}>{ch1.title}</h3>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Người đăng ký (Subscribers)</p>
              <p style={styles.statValue}>
                {formatNumber(ch1.subscriberCount)}{' '}
                {ch1.subscriberCount > ch2.subscriberCount && '👑'}
              </p>
            </div>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Tổng lượt xem (Views)</p>
              <p style={styles.statValue}>
                {formatNumber(ch1.viewCount)}{' '}
                {ch1.viewCount > ch2.viewCount && '👑'}
              </p>
            </div>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Tổng số Video</p>
              <p style={styles.statValue}>{formatNumber(ch1.videoCount)}</p>
            </div>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Quốc gia</p>
              <p style={styles.statValue}>{ch1.country}</p>
            </div>
          </div>

          {/* Card Kênh 2 */}
          <div style={styles.card}>
            <img src={ch2.thumbnail} alt={ch2.title} style={styles.avatar} />
            <h3 style={styles.channelName}>{ch2.title}</h3>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Người đăng ký (Subscribers)</p>
              <p style={styles.statValue}>
                {formatNumber(ch2.subscriberCount)}{' '}
                {ch2.subscriberCount > ch1.subscriberCount && '👑'}
              </p>
            </div>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Tổng lượt xem (Views)</p>
              <p style={styles.statValue}>
                {formatNumber(ch2.viewCount)}{' '}
                {ch2.viewCount > ch1.viewCount && '👑'}
              </p>
            </div>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Tổng số Video</p>
              <p style={styles.statValue}>{formatNumber(ch2.videoCount)}</p>
            </div>

            <div style={styles.statGroup}>
              <p style={styles.statLabel}>Quốc gia</p>
              <p style={styles.statValue}>{ch2.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Style trang trí đơn giản
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    margin: '20px auto',
    maxWidth: '900px',
  },
  title: {
    textAlign: 'center',
    color: '#ff0000',
    marginBottom: '20px',
  },
  selectRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  selectBox: {
    flex: 1,
    minWidth: '250px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  compareGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #eee',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#fafafa',
  },
  avatar: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  channelName: {
    margin: '10px 0 20px 0',
    fontSize: '18px',
  },
  statGroup: {
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px stroke #e5e5e5',
  },
  statLabel: {
    margin: 0,
    fontSize: '12px',
    color: '#666',
  },
  statValue: {
    margin: '4px 0 0 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#222',
  },
};

export default CompareChannels;
