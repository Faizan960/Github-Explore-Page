import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProfileProvider } from './contexts/ProfileContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrendingSection from './components/TrendingSection';
import DeveloperSpotlight from './components/DeveloperSpotlight';
import CategoryFilters from './components/CategoryFilters';
import Sidebar from './components/Sidebar';
import ProfileModal from './components/ProfileModal';
import RepositoryPage from './components/RepositoryPage';

function App() {
  const [currentView, setCurrentView] = useState<'explore' | 'repository'>('explore');
  const [selectedRepo, setSelectedRepo] = useState<string>('');

  const handleRepoClick = (repoName: string) => {
    setSelectedRepo(repoName);
    setCurrentView('repository');
  };

  const handleBackToExplore = () => {
    setCurrentView('explore');
    setSelectedRepo('');
  };

  return (
    <ThemeProvider>
      <ProfileProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter transition-colors duration-200">
          {currentView === 'explore' ? (
            <>
              <Navbar />
              
              <div className="flex">
                {/* Main Content */}
                <main className="flex-1">
                  <HeroSection onRepoClick={handleRepoClick} />
                  <CategoryFilters />
                  <TrendingSection onRepoClick={handleRepoClick} />
                  <DeveloperSpotlight />
                </main>
                
                {/* Sidebar */}
                <Sidebar />
              </div>

              {/* Profile Modal */}
              <ProfileModal />
            </>
          ) : (
            <RepositoryPage repoName={selectedRepo} onBack={handleBackToExplore} />
          )}
        </div>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;