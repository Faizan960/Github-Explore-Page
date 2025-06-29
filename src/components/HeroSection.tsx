import React from 'react';
import { Star, GitFork, Eye } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

interface HeroSectionProps {
  onRepoClick: (repoName: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRepoClick }) => {
  const { starRepo, unstarRepo, isStarred } = useProfile();
  
  const recommendations = [
    {
      name: 'microsoft/vscode',
      stars: 162000,
      language: 'TypeScript',
      tags: ['editor', 'ide'],
      description: 'Visual Studio Code'
    },
    {
      name: 'vercel/next.js',
      stars: 124000,
      language: 'JavaScript',
      tags: ['react', 'framework'],
      description: 'The React Framework'
    },
    {
      name: 'openai/whisper',
      stars: 67000,
      language: 'Python',
      tags: ['ai', 'speech'],
      description: 'Robust Speech Recognition'
    }
  ];

  const handleStarClick = (repoName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isStarred(repoName)) {
      unstarRepo(repoName);
    } else {
      starRepo(repoName);
    }
  };

  const handleForkClick = (repoName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Forking repository: ${repoName}`);
  };

  const handleWatchClick = (repoName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Watching repository: ${repoName}`);
  };

  return (
    <section className="py-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Recommended for You</h2>
          <p className="text-gray-600 dark:text-gray-400">Curated repositories based on your interests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((repo, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group bg-white dark:bg-gray-900 cursor-pointer"
              onClick={() => onRepoClick(repo.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {repo.name}
                </h3>
                <button
                  onClick={(e) => handleStarClick(repo.name, e)}
                  className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-md font-medium transition-colors min-w-[70px] justify-center ${
                    isStarred(repo.name)
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Star className={`h-4 w-4 ${isStarred(repo.name) ? 'fill-current' : ''}`} />
                  {(repo.stars / 1000).toFixed(0)}k
                </button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{repo.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {repo.language}
                  </span>
                </div>
                <div className="flex gap-1">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => handleWatchClick(repo.name, e)}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors flex-1"
                >
                  <Eye className="h-3 w-3" />
                  Watch
                </button>
                <button
                  onClick={(e) => handleForkClick(repo.name, e)}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors flex-1"
                >
                  <GitFork className="h-3 w-3" />
                  Fork
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;