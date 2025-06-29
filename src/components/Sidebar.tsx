import React from 'react';
import { Hash, TrendingUp } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

const Sidebar = () => {
  const { followUser, unfollowUser, isFollowing } = useProfile();
  
  const trendingTopics = [
    { name: 'artificial-intelligence', repos: '2.3k' },
    { name: 'react', repos: '890k' },
    { name: 'typescript', repos: '456k' },
    { name: 'python', repos: '1.2M' },
    { name: 'machine-learning', repos: '678k' }
  ];

  const suggestions = [
    {
      name: 'Alex Johnson',
      handle: 'alexjohnson',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      reason: 'Popular in AI'
    },
    {
      name: 'Sarah Chen',
      handle: 'sarahchen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      reason: 'JavaScript expert'
    },
    {
      name: 'Mike Davis',
      handle: 'mikedavis',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      reason: 'Python developer'
    }
  ];

  const handleTopicClick = (topic: string) => {
    alert(`Exploring topic: ${topic}`);
  };

  const handleFollowClick = (handle: string) => {
    if (isFollowing(handle)) {
      unfollowUser(handle);
    } else {
      followUser(handle);
    }
  };

  const handleProfileClick = (handle: string) => {
    alert(`Opening profile: @${handle}`);
  };

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-6 space-y-8 hidden lg:block transition-colors duration-200">
      {/* Trending Topics */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Trending Topics</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 cursor-pointer group transition-colors duration-200"
              onClick={() => handleTopicClick(topic.name)}
            >
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{topic.name}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{topic.repos}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Follow Suggestions */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Who to Follow</h3>
        <div className="space-y-4">
          {suggestions.map((user, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all flex-shrink-0"
                onClick={() => handleProfileClick(user.handle)}
              />
              <div className="flex-1 min-w-0">
                <p 
                  className="text-sm font-medium text-gray-900 dark:text-white truncate cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => handleProfileClick(user.handle)}
                >
                  {user.name}
                </p>
                <p 
                  className="text-xs text-gray-500 dark:text-gray-400 truncate cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => handleProfileClick(user.handle)}
                >
                  @{user.handle}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{user.reason}</p>
              </div>
              <button 
                onClick={() => handleFollowClick(user.handle)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 min-w-[80px] flex items-center justify-center flex-shrink-0 ${
                  isFollowing(user.handle)
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isFollowing(user.handle) ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;