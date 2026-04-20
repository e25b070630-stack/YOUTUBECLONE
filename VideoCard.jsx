import React from 'react';

const VideoCard = ({ video, layout, active }) => {
  const { snippet, statistics } = video;
  const { title, channelTitle, thumbnails } = snippet;
  
  // View count formatting
  const viewCount = statistics?.viewCount 
    ? (parseInt(statistics.viewCount) >= 1000000 
      ? (parseInt(statistics.viewCount) / 1000000).toFixed(1) + 'M' 
      : (parseInt(statistics.viewCount) / 1000).toFixed(0) + 'K') 
    : (Math.floor(Math.random() * 900) + 100) + 'K';

  return (
    <div className={`video-card ${layout === 'sidebar' ? 'sidebar' : ''} ${active ? 'active' : ''}`}>
      <div className="thumbnail-container">
        <img 
          src={thumbnails.medium.url} 
          alt={title} 
          className="thumbnail" 
        />
      </div>
      <div className="video-info">
        {layout !== 'sidebar' && (
          <img 
            src={`https://i.pravatar.cc/150?u=${channelTitle}`} 
            alt={channelTitle} 
            className="channel-avatar" 
          />
        )}
        <div className="video-details">
          <h3 className="video-title">{title}</h3>
          <p className="channel-name">{channelTitle}</p>
          <p className="video-stats">{viewCount} views • Just now</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
