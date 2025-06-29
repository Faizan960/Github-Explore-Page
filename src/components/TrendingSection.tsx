import React, { useState } from 'react';
import { Star, GitFork, TrendingUp, Eye } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

interface TrendingSectionProps {
  onRepoClick: (repoName: string) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ onRepoClick }) => {
  const [activeFilter, setActiveFilter] = useState('daily');
  const { starRepo, unstarRepo, isStarred } = useProfile();
  
  const filters = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' }
  ];

  // Different trending repos for each time period
  const trendingData = {
    daily: [
      {
        name: 'microsoft/copilot',
        description: 'Your AI pair programmer',
        stars: 89000,
        forks: 12000,
        language: 'Python',
        trend: '+1,234 stars today'
      },
      {
        name: 'facebook/react',
        description: 'The library for web and native user interfaces',
        stars: 228000,
        forks: 46000,
        language: 'JavaScript',
        trend: '+892 stars today'
      },
      {
        name: 'pytorch/pytorch',
        description: 'Tensors and Dynamic neural networks in Python',
        stars: 82000,
        forks: 22000,
        language: 'C++',
        trend: '+756 stars today'
      },
      {
        name: 'tailwindlabs/tailwindcss',
        description: 'A utility-first CSS framework',
        stars: 82000,
        forks: 4100,
        language: 'CSS',
        trend: '+634 stars today'
      }
    ],
    weekly: [
      {
        name: 'openai/chatgpt',
        description: 'Official ChatGPT API wrapper',
        stars: 156000,
        forks: 18000,
        language: 'Python',
        trend: '+8,456 stars this week'
      },
      {
        name: 'vercel/next.js',
        description: 'The React Framework for Production',
        stars: 124000,
        forks: 26400,
        language: 'JavaScript',
        trend: '+5,234 stars this week'
      },
      {
        name: 'microsoft/vscode',
        description: 'Visual Studio Code',
        stars: 162000,
        forks: 28500,
        language: 'TypeScript',
        trend: '+4,567 stars this week'
      },
      {
        name: 'tensorflow/tensorflow',
        description: 'An Open Source Machine Learning Framework',
        stars: 185000,
        forks: 74000,
        language: 'C++',
        trend: '+3,890 stars this week'
      }
    ],
    monthly: [
      {
        name: 'microsoft/playwright',
        description: 'Playwright is a framework for Web Testing and Automation',
        stars: 65000,
        forks: 3500,
        language: 'TypeScript',
        trend: '+12,345 stars this month'
      },
      {
        name: 'denoland/deno',
        description: 'A modern runtime for JavaScript and TypeScript',
        stars: 94000,
        forks: 5200,
        language: 'Rust',
        trend: '+9,876 stars this month'
      },
      {
        name: 'vitejs/vite',
        description: 'Next generation frontend tooling',
        stars: 67000,
        forks: 6000,
        language: 'TypeScript',
        trend: '+8,234 stars this month'
      },
      {
        name: 'supabase/supabase',
        description: 'The open source Firebase alternative',
        stars: 72000,
        forks: 6900,
        language: 'TypeScript',
        trend: '+7,123 stars this month'
      }
    ]
  };

  // Get repos based on active filter
  const trendingRepos = trendingData[activeFilter as keyof typeof trendingData];

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

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Trending Repositories</h2>
            <p className="text-gray-600 dark:text-gray-400">See what the GitHub community is most excited about {activeFilter}</p>
          </div>
          
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {trendingRepos.map((repo, index) => (
            <div
              key={`${activeFilter}-${index}`}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 group cursor-pointer hover:shadow-md"
              onClick={() => onRepoClick(repo.name)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {repo.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      {repo.language}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{repo.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <button
                      onClick={(e) => handleStarClick(repo.name, e)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors min-w-[80px] justify-center ${
                        isStarred(repo.name)
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${isStarred(repo.name) ? 'fill-current' : ''}`} />
                      {(repo.stars / 1000).toFixed(0)}k
                    </button>
                    <button
                      onClick={(e) => handleForkClick(repo.name, e)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-300 dark:border-gray-600 min-w-[80px] justify-center"
                    >
                      <GitFork className="h-4 w-4" />
                      {(repo.forks / 1000).toFixed(1)}k
                    </button>
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                      <TrendingUp className="h-4 w-4" />
                      {repo.trend}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleWatchClick(repo.name, e)}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors min-w-[80px]"
                    >
                      <Eye className="h-3 w-3" />
                      Watch
                    </button>
                    <button
                      onClick={(e) => handleForkClick(repo.name, e)}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors min-w-[80px]"
                    >
                      <GitFork className="h-3 w-3" />
                      Fork
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;