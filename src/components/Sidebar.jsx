import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Film, Gamepad2, Trophy, Flame } from 'lucide-react';

const Sidebar = () => {
  const mainItems = [
    { icon: <Home size={22} />, label: 'Home', active: true },
    { icon: <Compass size={22} />, label: 'Explore' },
    { icon: <PlaySquare size={22} />, label: 'Subscriptions' },
  ];

  const libraryItems = [
    { icon: <History size={22} />, label: 'History' },
    { icon: <Clock size={22} />, label: 'Watch later' },
    { icon: <ThumbsUp size={22} />, label: 'Liked videos' },
  ];

  const trendingItems = [
    { icon: <Flame size={22} />, label: 'Trending' },
    { icon: <Film size={22} />, label: 'Movies' },
    { icon: <Gamepad2 size={22} />, label: 'Gaming' },
    { icon: <Trophy size={22} />, label: 'Sports' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        {mainItems.map((item, index) => (
          <div key={index} className={`sidebar-item ${item.active ? 'active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="sidebar-divider"></div>
      
      <div className="sidebar-section">
        {libraryItems.map((item, index) => (
          <div key={index} className="sidebar-item">
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        <h4 style={{ padding: '0 24px 8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Explore</h4>
        {trendingItems.map((item, index) => (
          <div key={index} className="sidebar-item">
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
