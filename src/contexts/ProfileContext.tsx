import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  avatar: string;
  company: string;
  publicRepos: number;
  followers: number;
  following: number;
  followedUsers: string[];
  starredRepos: string[];
}

interface ProfileSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showLocation: boolean;
  twoFactorAuth: boolean;
  language: string;
  timezone: string;
}

interface ProfileContextType {
  profile: UserProfile;
  settings: ProfileSettings;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSettings: (updates: Partial<ProfileSettings>) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  followUser: (username: string) => void;
  unfollowUser: (username: string) => void;
  starRepo: (repoName: string) => void;
  unstarRepo: (repoName: string) => void;
  isFollowing: (username: string) => boolean;
  isStarred: (repoName: string) => boolean;
}

const defaultProfile: UserProfile = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  bio: 'Full-stack developer passionate about open source',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  company: 'Tech Corp',
  publicRepos: 42,
  followers: 156,
  following: 89,
  followedUsers: [],
  starredRepos: []
};

const defaultSettings: ProfileSettings = {
  emailNotifications: true,
  pushNotifications: false,
  profileVisibility: 'public',
  showEmail: false,
  showLocation: true,
  twoFactorAuth: false,
  language: 'English',
  timezone: 'UTC-8 (Pacific Time)'
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        const parsedProfile = JSON.parse(saved);
        // Ensure followedUsers and starredRepos are always arrays
        return {
          ...defaultProfile,
          ...parsedProfile,
          followedUsers: Array.isArray(parsedProfile.followedUsers) ? parsedProfile.followedUsers : [],
          starredRepos: Array.isArray(parsedProfile.starredRepos) ? parsedProfile.starredRepos : []
        };
      } catch (error) {
        console.error('Error parsing saved profile:', error);
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  const [settings, setSettings] = useState<ProfileSettings>(() => {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        return { ...defaultSettings, ...parsedSettings };
      } catch (error) {
        console.error('Error parsing saved settings:', error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateSettings = (updates: Partial<ProfileSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const followUser = (username: string) => {
    setProfile(prev => ({
      ...prev,
      followedUsers: [...prev.followedUsers, username],
      following: prev.following + 1
    }));
  };

  const unfollowUser = (username: string) => {
    setProfile(prev => ({
      ...prev,
      followedUsers: prev.followedUsers.filter(user => user !== username),
      following: Math.max(0, prev.following - 1)
    }));
  };

  const starRepo = (repoName: string) => {
    setProfile(prev => ({
      ...prev,
      starredRepos: [...prev.starredRepos, repoName]
    }));
  };

  const unstarRepo = (repoName: string) => {
    setProfile(prev => ({
      ...prev,
      starredRepos: prev.starredRepos.filter(repo => repo !== repoName)
    }));
  };

  const isFollowing = (username: string) => {
    return profile.followedUsers.includes(username);
  };

  const isStarred = (repoName: string) => {
    return profile.starredRepos.includes(repoName);
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      settings,
      updateProfile,
      updateSettings,
      isProfileOpen,
      setIsProfileOpen,
      followUser,
      unfollowUser,
      starRepo,
      unstarRepo,
      isFollowing,
      isStarred
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};