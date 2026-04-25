import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const SubscribeButton = ({ channelId, channelTitle, channelAvatar }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    const exists = subscriptions.some(sub => sub.channelId === channelId);
    setIsSubscribed(exists);
  }, [channelId]);

  const toggleSubscription = () => {
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    
    if (isSubscribed) {
      // Unsubscribe
      subscriptions = subscriptions.filter(sub => sub.channelId !== channelId);
    } else {
      // Subscribe
      subscriptions.push({
        channelId,
        channelTitle,
        channelAvatar: channelAvatar || `https://i.pravatar.cc/150?u=${channelTitle}`,
        subscribedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button 
        onClick={toggleSubscription}
        style={{
          background: isSubscribed ? 'var(--bg-secondary)' : '#cc0000',
          color: isSubscribed ? 'var(--text-primary)' : '#ffffff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '20px',
          fontWeight: '500',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </button>
      
      {isSubscribed && (
        <button className="icon-btn" style={{ background: 'var(--bg-secondary)', borderRadius: '50%', padding: '10px' }}>
          <Bell size={20} fill="currentColor" />
        </button>
      )}
    </div>
  );
};

export default SubscribeButton;
