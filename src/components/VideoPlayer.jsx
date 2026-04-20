import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { fetchRelatedVideos } from '../services/youtubeService';
import VideoCard from './VideoCard';

const VideoPlayer = ({ video, onBack, onVideoSelect }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const videoId = video.id?.videoId || video.id;
  const { title, description, channelTitle } = video.snippet;

  useEffect(() => {
    const getRelated = async () => {
      const data = await fetchRelatedVideos(videoId);
      // Filter out current video
      setRelatedVideos(data.filter(item => (item.id?.videoId || item.id) !== videoId));
    };
    getRelated();
    
    // Automatically scroll to the top of the player when a new video is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [videoId]);

  const handleVideoClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    onVideoSelect(item);
  };

  return (
    <div className="video-player-view">
      <div className="video-player-left">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} /> Back to results
        </button>

        <div className="video-aspect-ratio">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-player-info">
          <h1 className="video-player-title">{title}</h1>
          <div className="video-player-channel">
            <img
              src={`https://i.pravatar.cc/150?u=${channelTitle}`}
              alt={channelTitle}
              className="channel-avatar"
            />
            <span className="channel-name">{channelTitle}</span>
          </div>
          <div className="sidebar-divider"></div>
          <p className="video-description">{description}</p>
        </div>
      </div>

      <div className="video-player-right">
        <h4 className="more-videos-heading">Recommended videos</h4>
        <div className="related-videos-list">
          {relatedVideos.map((item) => (
            <div 
              key={item.id?.videoId || item.id} 
              onClick={(e) => handleVideoClick(e, item)}
              className="related-video-item"
            >
              <VideoCard video={item} layout="sidebar" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
