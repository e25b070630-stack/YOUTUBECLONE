import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

function App() {
  // Theme state: 0 for Light, 1 for Dark
  const [theme, setTheme] = useState(0);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection state for video player
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Toggle theme using XOR operator
  const toggleTheme = () => {
    setTheme(prev => prev ^ 1);
  };

  // Update theme on body for CSS styling
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 0 ? 'light' : 'dark');
  }, [theme]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedVideo(null); // Go back to grid when searching
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleBack = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="app-container">
      <Navbar theme={theme} toggleTheme={toggleTheme} onSearch={handleSearch} />
      
      <main className="main-content">
        <Sidebar theme={theme} />
        {selectedVideo ? (
          <VideoPlayer video={selectedVideo} onBack={handleBack} onVideoSelect={handleVideoSelect} />
        ) : (
          <VideoGrid searchQuery={searchQuery} onVideoSelect={handleVideoSelect} />
        )}
      </main>
    </div>
  );
}

export default App;
