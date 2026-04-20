import React from 'react';
import { Menu, Search, Video, Bell, User, Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme, onSearch }) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="icon-btn">
          <Menu size={24} />
        </button>
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); onSearch(''); }}>
          <span>YouTube</span> Clone
        </a>
      </div>

      <form className="nav-center" onSubmit={handleSubmit}>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="search-button">
            <Search size={20} />
          </button>
        </div>
      </form>

      <div className="nav-right">
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 0 ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <button className="icon-btn">
          <Video size={24} />
        </button>
        <button className="icon-btn">
          <Bell size={24} />
        </button>
        <button className="icon-btn profile">
          <User size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
