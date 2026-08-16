# YouTube 3 - Channel Statistics Dashboard

Dashboard theo dõi thống kê 1000 kênh YouTube hàng đầu với biểu đồ và tính năng lọc/tìm kiếm.

## Tính năng

- ✅ Theo dõi 1000 channels YouTube hàng đầu
- ✅ Hiển thị subscribers & views (2 bảng riêng)
- ✅ Xếp hạng từ cao xuống thấp
- ✅ Tìm kiếm & lọc (tên, quốc gia, range subscribers/views)
- ✅ Dropdown lọc theo quốc gia
- ✅ Bar chart so sánh 2 channels
- ✅ Line chart tăng trưởng subscribers & views
- ✅ Dark/Light mode
- ✅ Lưu lịch sử 1 năm (JSON)
- ✅ Update mỗi 10 phút
- ✅ Tối ưu tốc độ & tài nguyên

## Tech Stack

- **Frontend:** React + Tailwind CSS
- **Charts:** Chart.js
- **API:** YouTube API v3
- **Database:** JSON (localStorage)
- **Hosting:** Vercel

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/centralchaosasia-jpg/Youtube-3.git
cd Youtube-3
npm install
```

### 2. Setup .env.local
```
REACT_APP_YOUTUBE_API_KEY=AIzaSyDSprZfNZYLhmOVRBcDADtjk1AQpi17f0E
```

### 3. Run
```bash
npm start
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Folder Structure

```
Youtube-3/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── ChannelTable.jsx
│   │   ├── Charts.jsx
│   │   └── DarkMode.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── api/
│   │   └── youtubeAPI.js
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .env.local
├── package.json
└── tailwind.config.js
```

## License

MIT
