import React from 'react';
import { Users, MapPin } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

const DeveloperSpotlight = () => {
  const { followUser, unfollowUser, isFollowing } = useProfile();
  
  const developers = [
    {
      name: 'Linus Torvalds',
      handle: 'torvalds',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'Portland, OR',
      followers: '156k',
      bio: 'Creator of Linux and Git'
    },
    {
      name: 'Dan Abramov',
      handle: 'gaearon',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'London, UK',
      followers: '245k',
      bio: 'React core team member'
    },
    {
      name: 'Sindre Sorhus',
      handle: 'sindresorhus',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'Stockholm, Sweden',
      followers: '89k',
      bio: 'Open source maintainer'
    }
  ];

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
    <section className="py-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Developer Spotlight</h2>
          <p className="text-gray-600 dark:text-gray-400">Developers making a difference in the community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group text-center bg-white dark:bg-gray-900"
            >
              <img
                src={dev.avatar}
                alt={dev.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                onClick={() => handleProfileClick(dev.handle)}
              />
              
              <h3 
                className="font-semibold text-gray-900 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => handleProfileClick(dev.handle)}
              >
                {dev.name}
              </h3>
              <p 
                className="text-sm text-gray-600 dark:text-gray-400 mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => handleProfileClick(dev.handle)}
              >
                @{dev.handle}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{dev.bio}</p>
              
              <div className="flex items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {dev.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {dev.followers}
                </div>
              </div>
              
              <button 
                onClick={() => handleFollowClick(dev.handle)}
                className={`w-full py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-200 min-h-[36px] flex items-center justify-center ${
                  isFollowing(dev.handle)
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isFollowing(dev.handle) ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperSpotlight;