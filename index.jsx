import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock } from 'lucide-react';
import { fetchRelatedVideos, fetchVideoDetails } from '../../services/youtubeService';
import VideoCard from '../VideoCard';
import LikeDislikeButtons from '../LikeDislikeButtons';
import SubscribeButton from '../SubscribeButton';

const WatchLaterButton = ({ videoId }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const watchLater = JSON.parse(localStorage.getItem('watch_later') || '[]');
    setIsSaved(watchLater.includes(videoId));
  }, [videoId]);

  const toggleSave = () => {
    let watchLater = JSON.parse(localStorage.getItem('watch_later') || '[]');
    if (isSaved) {
      watchLater = watchLater.filter(id => id !== videoId);
    } else {
      if (!watchLater.includes(videoId)) watchLater.unshift(videoId);
    }
    localStorage.setItem('watch_later', JSON.stringify(watchLater));
    setIsSaved(!isSaved);
  };

  return (
    <button onClick={toggleSave} className={`icon-btn ${isSaved ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', borderRadius: '24px', padding: '6px 12px', color: isSaved ? 'var(--text-primary)' : 'inherit' }}>
      <Clock size={20} fill={isSaved ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{isSaved ? 'Saved' : 'Save'}</span>
    </button>
  );
};

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideoData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!videoId) return;

        // Fetch the full details for the specific video
        try {
          const details = await fetchVideoDetails(videoId);
          setVideoDetails(details);

          // Add to watch history
          let history = JSON.parse(localStorage.getItem('watch_history') || '[]');
          history = history.filter(id => id !== videoId); // Remove if exists
          history.unshift(videoId); // Add to top
          localStorage.setItem('watch_history', JSON.stringify(history));

          // Fetch related videos based on channel (as YouTube API deprecated relatedToVideoId)
          const relatedData = await fetchRelatedVideos(details.snippet.channelId);
          const related = Array.isArray(relatedData) ? relatedData.filter(item => (item.id?.videoId || item.id) !== videoId) : [];
          setRelatedVideos(related);
        } catch (err) {
          setError(err.message || "Failed to load video details. Quota may be exceeded.");
        }
        
      } catch (err) {
        setError("Failed to load video data.");
      } finally {
        setLoading(false);
      }
    };

    getVideoData();

    // Automatically scroll to the top of the player when a new video is selected.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [videoId]);

  const handleVideoClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/watch/${item.id?.videoId || item.id}`);
  };

  if (loading) {
    return <div style={{ color: 'var(--text-primary)', padding: '20px' }}>Loading video...</div>;
  }

  if (error || !videoDetails) {
    return (
      <div style={{ color: 'var(--text-primary)', padding: '20px' }}>
        <h3>Oops!</h3>
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="back-btn" style={{ marginTop: '20px' }}>
          <ChevronLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  const { title, description, channelTitle, publishedAt } = videoDetails.snippet;
  const { viewCount, likeCount } = videoDetails.statistics;
  
  // Format dates and numbers safely
  const formattedViews = viewCount ? Number(viewCount).toLocaleString() + ' views' : '';
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  return (
    <div className="video-player-view">
      <div className="video-player-left">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Back
        </button>

        <div className="video-aspect-ratio">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-player-info">
          <h1 className="video-player-title">{title}</h1>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div className="video-player-channel" style={{ margin: 0 }}>
              <img
                src={`https://i.pravatar.cc/150?u=${channelTitle}`}
                alt={channelTitle}
                className="channel-avatar"
              />
              <div>
                <div className="channel-name" style={{ fontWeight: 'bold' }}>{channelTitle}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{/* Subscriber count would go here, but API doesn't return it directly without another call */}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <SubscribeButton channelId={videoDetails.snippet.channelId} channelTitle={channelTitle} channelAvatar={`https://i.pravatar.cc/150?u=${channelTitle}`} />
              <LikeDislikeButtons videoId={videoId} likeCount={likeCount} />
              <WatchLaterButton videoId={videoId} />
            </div>
          </div>
          
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '8px' }}>
              {formattedViews} &bull; {formattedDate}
            </div>
            <p className="video-description" style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
          </div>
        </div>
      </div>

      <div className="video-player-right">
        <h4 className="more-videos-heading">Recommended videos</h4>
        <div className="related-videos-list">
          {relatedVideos.length > 0 ? (
            relatedVideos.map((item) => (
              <div
                key={item.id?.videoId || item.id}
                onClick={(e) => handleVideoClick(e, item)}
                className="related-video-item"
              >
                <VideoCard video={item} layout="sidebar" />
              </div>
            ))
          ) : (
            <p className="no-related-text">No related videos available right now.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
