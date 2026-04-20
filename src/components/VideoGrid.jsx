import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { fetchTrendingVideos, searchVideos } from '../services/youtubeService';

const VideoGrid = ({ searchQuery, onVideoSelect }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      let data;
      if (searchQuery) {
        data = await searchVideos(searchQuery);
      } else {
        data = await fetchTrendingVideos();
      }
      setVideos(data);
      setLoading(false);
    };

    getVideos();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="video-grid-container">
        <div className="loading-state" style={{ color: 'var(--text-primary)', textAlign: 'center', marginTop: '40px' }}>
          Loading videos...
        </div>
      </div>
    );
  }

  return (
    <div className="video-grid-container">
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id?.videoId || video.id} onClick={() => onVideoSelect(video)}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
