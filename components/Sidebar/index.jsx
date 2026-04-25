import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Film, Gamepad2, Trophy, Flame } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mainItems = [
    { icon: <Home size={22} />, label: 'Home', active: true, route: '/' },
    { icon: <Compass size={22} />, label: 'Explore', route: '/' },
    { icon: <PlaySquare size={22} />, label: 'Subscriptions', route: '/subscriptions' },
  ];

  const libraryItems = [
    { icon: <History size={22} />, label: 'History', route: '/history' },
    { icon: <Clock size={22} />, label: 'Watch later', route: '/watch-later' },
    { icon: <ThumbsUp size={22} />, label: 'Liked videos', route: '/liked' },
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
          <div 
            key={index} 
            className={`sidebar-item ${
              (item.route !== '/' && location.pathname === item.route) || 
              (location.pathname === '/' && selectedCategory === item.label) ? 'active' : ''
            }`}
            onClick={() => {
              if (item.route && item.route !== '/') {
                navigate(item.route);
              } else {
                navigate('/');
                onSelectCategory(item.label);
              }
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="sidebar-divider"></div>
      
      <div className="sidebar-section">
        {libraryItems.map((item, index) => (
          <div 
            key={index} 
            className={`sidebar-item ${location.pathname === item.route ? 'active' : ''}`}
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        <h4 style={{ padding: '0 24px 8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Explore</h4>
        {trendingItems.map((item, index) => (
          <div 
            key={index} 
            className={`sidebar-item ${location.pathname === '/' && selectedCategory === item.label ? 'active' : ''}`}
            onClick={() => {
              navigate('/');
              onSelectCategory(item.label);
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
