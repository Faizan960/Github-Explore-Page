import React, { useState } from 'react';
import { ArrowLeft, Star, GitFork, Eye, Download, Code, Book, Shield, Users, Calendar, ExternalLink } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

interface RepositoryPageProps {
  repoName: string;
  onBack: () => void;
}

const RepositoryPage: React.FC<RepositoryPageProps> = ({ repoName, onBack }) => {
  const { starRepo, unstarRepo, isStarred } = useProfile();
  const [activeTab, setActiveTab] = useState('code');

  // Mock repository data - in a real app, this would come from an API
  const repoData = {
    'microsoft/vscode': {
      name: 'microsoft/vscode',
      description: 'Visual Studio Code',
      fullDescription: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages and runtimes.',
      stars: 162000,
      forks: 28500,
      watchers: 3200,
      language: 'TypeScript',
      languages: { TypeScript: 45, JavaScript: 25, CSS: 15, HTML: 10, Other: 5 },
      license: 'MIT',
      lastUpdated: '2 hours ago',
      size: '245 MB',
      topics: ['editor', 'ide', 'typescript', 'javascript', 'electron'],
      contributors: 1847,
      releases: 156,
      issues: 5234,
      pullRequests: 234
    },
    'vercel/next.js': {
      name: 'vercel/next.js',
      description: 'The React Framework',
      fullDescription: 'Next.js is a React framework that gives you building blocks to create web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.',
      stars: 124000,
      forks: 26400,
      watchers: 2100,
      language: 'JavaScript',
      languages: { JavaScript: 55, TypeScript: 30, CSS: 8, HTML: 5, Other: 2 },
      license: 'MIT',
      lastUpdated: '4 hours ago',
      size: '189 MB',
      topics: ['react', 'framework', 'nextjs', 'vercel', 'ssr'],
      contributors: 2156,
      releases: 89,
      issues: 1876,
      pullRequests: 156
    },
    'openai/whisper': {
      name: 'openai/whisper',
      description: 'Robust Speech Recognition',
      fullDescription: 'Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.',
      stars: 67000,
      forks: 7800,
      watchers: 1200,
      language: 'Python',
      languages: { Python: 85, Jupyter: 10, Shell: 3, Other: 2 },
      license: 'MIT',
      lastUpdated: '1 day ago',
      size: '156 MB',
      topics: ['ai', 'speech', 'recognition', 'openai', 'machine-learning'],
      contributors: 89,
      releases: 12,
      issues: 456,
      pullRequests: 67
    }
  };

  const repo = repoData[repoName as keyof typeof repoData] || repoData['microsoft/vscode'];

  const handleStarClick = () => {
    if (isStarred(repoName)) {
      unstarRepo(repoName);
    } else {
      starRepo(repoName);
    }
  };

  const handleForkClick = () => {
    alert(`Forking ${repoName}...`);
  };

  const handleWatchClick = () => {
    alert(`Now watching ${repoName}`);
  };

  const handleDownloadClick = () => {
    alert(`Downloading ${repoName}...`);
  };

  const tabs = [
    { id: 'code', label: 'Code', icon: Code },
    { id: 'issues', label: `Issues (${repo.issues})`, icon: Shield },
    { id: 'pulls', label: `Pull requests (${repo.pullRequests})`, icon: GitFork },
    { id: 'wiki', label: 'Wiki', icon: Book }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{repo.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{repo.fullDescription}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  {repo.language}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {(repo.stars / 1000).toFixed(0)}k stars
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  {(repo.forks / 1000).toFixed(1)}k forks
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {(repo.watchers / 1000).toFixed(1)}k watching
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Updated {repo.lastUpdated}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-6">
              <button
                onClick={handleWatchClick}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors min-w-[90px]"
              >
                <Eye className="h-4 w-4" />
                Watch
              </button>
              
              <button
                onClick={handleForkClick}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors min-w-[90px]"
              >
                <GitFork className="h-4 w-4" />
                Fork
              </button>
              
              <button
                onClick={handleStarClick}
                className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors min-w-[90px] ${
                  isStarred(repoName)
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}
              >
                <Star className={`h-4 w-4 ${isStarred(repoName) ? 'fill-current' : ''}`} />
                {isStarred(repoName) ? 'Starred' : 'Star'}
              </button>

              <button
                onClick={handleDownloadClick}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors min-w-[90px]"
              >
                <Download className="h-4 w-4" />
                Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">README.md</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                      {repo.fullDescription}
                    </p>
                    <h4 className="text-gray-900 dark:text-white mt-6 mb-3">Features</h4>
                    <ul className="text-gray-600 dark:text-gray-400">
                      <li>IntelliSense code completion</li>
                      <li>Built-in Git integration</li>
                      <li>Extensive extension marketplace</li>
                      <li>Integrated terminal</li>
                      <li>Debugging support</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'issues' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Issues</h3>
                <p className="text-gray-600 dark:text-gray-400">Issues functionality would be implemented here.</p>
              </div>
            )}

            {activeTab === 'pulls' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pull Requests</h3>
                <p className="text-gray-600 dark:text-gray-400">Pull requests functionality would be implemented here.</p>
              </div>
            )}

            {activeTab === 'wiki' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Wiki</h3>
                <p className="text-gray-600 dark:text-gray-400">Wiki functionality would be implemented here.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{repo.description}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">License</span>
                  <span className="text-gray-900 dark:text-white">{repo.license}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Size</span>
                  <span className="text-gray-900 dark:text-white">{repo.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Contributors</span>
                  <span className="text-gray-900 dark:text-white">{repo.contributors}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Releases</span>
                  <span className="text-gray-900 dark:text-white">{repo.releases}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
              <div className="space-y-2">
                {Object.entries(repo.languages).map(([lang, percentage]) => (
                  <div key={lang} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{lang}</span>
                    <span className="text-gray-900 dark:text-white">{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Links</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Homepage
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryPage;