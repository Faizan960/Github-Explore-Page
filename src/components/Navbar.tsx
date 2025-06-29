import React, { useState } from 'react';
import { Search, Github, User, Sun, Moon, Bell, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { setIsProfileOpen } = useProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger search functionality
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCreateNew = () => {
    alert('Create new repository functionality would open here');
  };

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
            <Github className="h-8 w-8 text-gray-900 dark:text-white" />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">GitHub</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search repositories, users, topics..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleCreateNew}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Create new"
            >
              <Plus className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white">New star on your repository</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white">Someone followed you</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            
            <button 
              onClick={handleProfileClick}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Open profile"
            >
              <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;