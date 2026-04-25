import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../VideoCard';
import { fetchTrendingVideos, searchVideos } from '../../services/youtubeService';

const VideoGrid = ({ searchQuery, selectedCategory }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (searchQuery) {
          data = await searchVideos(searchQuery);
        } else if (selectedCategory && selectedCategory !== 'Home') {
          const categoryMap = {
            'Gaming': '20',
            'Sports': '17',
            'Movies': '30',
            'Trending': ''
          };
          
          if (categoryMap[selectedCategory] !== undefined) {
            data = await fetchTrendingVideos(categoryMap[selectedCategory]);
          } else {
            data = await searchVideos(selectedCategory);
          }
        } else {
          data = await fetchTrendingVideos();
        }
        
        if (data && data.length > 0) {
          setVideos(data);
        } else {
          setError("No videos found (array was empty after filtering).");
        }
      } catch (err) {
        setError(`API Error: ${err.message || 'Unknown error occurred'}`);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, [searchQuery, selectedCategory]);

  const handleVideoSelect = (video) => {
    const videoId = video.id?.videoId || video.id;
    navigate(`/watch/${videoId}`);
  };

  if (loading) {
    return (
      <div className="video-grid-container">
        <div className="video-grid">
          {/* Skeleton UI */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="video-card skeleton">
              <div className="thumbnail-container skeleton-box" style={{ paddingBottom: '56.25%', background: 'var(--border-color)', borderRadius: '12px' }}></div>
              <div className="video-info" style={{ display: 'flex', marginTop: '12px', gap: '12px' }}>
                <div className="channel-avatar skeleton-box" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--border-color)', flexShrink: 0 }}></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton-box" style={{ height: '16px', background: 'var(--border-color)', borderRadius: '4px', marginBottom: '8px' }}></div>
                  <div className="skeleton-box" style={{ height: '14px', width: '60%', background: 'var(--border-color)', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-grid-container">
        <div className="error-state" style={{ color: 'var(--text-primary)', textAlign: 'center', marginTop: '40px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Oops!</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-grid-container">
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id?.videoId || video.id} onClick={() => handleVideoSelect(video)} style={{ cursor: 'pointer' }}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
