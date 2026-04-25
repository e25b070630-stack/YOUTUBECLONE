import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../VideoCard';
import { fetchVideosByIds } from '../../services/youtubeService';

const LibraryPage = ({ title, storageKey }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      const storedIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      if (storedIds.length === 0) {
        setVideos([]);
        setLoading(false);
        return;
      }

      // Fetch the actual videos (limit to 50 due to API maxResults)
      const data = await fetchVideosByIds(storedIds.slice(0, 50));
      
      // Sort the returned videos in the same order as the stored IDs (most recent first)
      const sortedData = [];
      storedIds.forEach(id => {
        const video = data.find(v => (v.id?.videoId || v.id) === id);
        if (video) sortedData.push(video);
      });
      
      setVideos(sortedData);
      setLoading(false);
    };

    getVideos();
  }, [storageKey]);

  if (loading) {
    return (
      <div className="video-grid-container">
        <div className="video-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="video-card skeleton">
              <div className="thumbnail-container skeleton-box" style={{ paddingBottom: '56.25%', background: 'var(--border-color)', borderRadius: '12px' }}></div>
              <div className="video-info" style={{ display: 'flex', marginTop: '12px', gap: '12px' }}>
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

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h2 style={{ marginBottom: '24px', paddingLeft: '8px' }}>{title}</h2>
      {videos.length === 0 ? (
        <p style={{ paddingLeft: '8px', color: 'var(--text-secondary)' }}>No videos found in {title.toLowerCase()}.</p>
      ) : (
        <div className="video-grid">
          {videos.map(video => (
            <div key={video.id?.videoId || video.id} onClick={() => navigate(`/watch/${video.id?.videoId || video.id}`)} style={{ cursor: 'pointer' }}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryPage;
