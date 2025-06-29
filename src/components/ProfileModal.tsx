import React, { useState } from 'react';
import { X, User, Settings, Save, Camera, MapPin, Globe, Building, Mail, Upload, Link, Calendar, Users, Star, GitFork, Book } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';

const ProfileModal = () => {
  const { profile, settings, updateProfile, updateSettings, isProfileOpen, setIsProfileOpen } = useProfile();
  const [activeTab, setActiveTab] = useState<'overview' | 'repositories' | 'projects' | 'packages' | 'stars'>('overview');
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  if (!isProfileOpen) return null;

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProfile(editedProfile);
    setSaveStatus('saved');
    setEditMode(false);
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleClose = () => {
    setIsProfileOpen(false);
    setEditedProfile(profile);
    setSaveStatus('idle');
    setEditMode(false);
  };

  const handleAvatarUpload = () => {
    const newAvatar = `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`;
    setEditedProfile(prev => ({ ...prev, avatar: newAvatar }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'repositories', label: 'Repositories', count: profile.publicRepos },
    { id: 'projects', label: 'Projects', count: 8 },
    { id: 'packages', label: 'Packages', count: 3 },
    { id: 'stars', label: 'Stars', count: profile.starredRepos.length }
  ];

  const mockRepositories = [
    { name: 'awesome-project', description: 'A really awesome project built with React and TypeScript', language: 'TypeScript', stars: 234, forks: 45, updated: '2 days ago', isPrivate: false },
    { name: 'my-portfolio', description: 'Personal portfolio website', language: 'JavaScript', stars: 12, forks: 3, updated: '1 week ago', isPrivate: false },
    { name: 'secret-project', description: 'Top secret development project', language: 'Python', stars: 0, forks: 0, updated: '3 days ago', isPrivate: true },
    { name: 'learning-rust', description: 'Learning Rust programming language', language: 'Rust', stars: 5, forks: 1, updated: '5 days ago', isPrivate: false }
  ];

  // Generate contribution data for the past year
  const generateContributionData = () => {
    const data = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // 365 days including today

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      data.push({
        date: new Date(date),
        count: Math.floor(Math.random() * 5),
        day: date.getDay()
      });
    }
    return data;
  };

  const contributionData = generateContributionData();

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count === 1) return 'bg-green-200 dark:bg-green-900/50';
    if (count === 2) return 'bg-green-300 dark:bg-green-700/70';
    if (count === 3) return 'bg-green-400 dark:bg-green-600';
    return 'bg-green-500 dark:bg-green-500';
  };

  // Group contribution data by weeks
  const getContributionWeeks = () => {
    const weeks = [];
    let currentWeek = [];
    
    contributionData.forEach((day, index) => {
      currentWeek.push(day);
      
      // If it's Sunday (day 0) or the last day, complete the week
      if (day.day === 0 || index === contributionData.length - 1) {
        // Pad the first week if it doesn't start on Sunday
        if (weeks.length === 0 && currentWeek[0].day !== 0) {
          const padding = Array(currentWeek[0].day).fill(null);
          currentWeek = [...padding, ...currentWeek];
        }
        
        // Pad the last week if it doesn't end on Saturday
        if (index === contributionData.length - 1 && day.day !== 6) {
          const padding = Array(6 - day.day).fill(null);
          currentWeek = [...currentWeek, ...padding];
        }
        
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const contributionWeeks = getContributionWeeks();

  // Get month labels for the contribution graph
  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        name: date.toLocaleDateString('en-US', { month: 'short' }),
        index: 11 - i
      });
    }
    
    return months;
  };

  const monthLabels = getMonthLabels();
  const totalContributions = contributionData.reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editMode ? 'Edit Profile' : profile.name}
          </h2>
          <div className="flex items-center gap-2">
            {saveStatus === 'saved' && (
              <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>
            )}
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Profile Sidebar */}
          <div className="lg:w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-y-auto">
            <div className="p-6">
              {/* Avatar and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={editMode ? editedProfile.avatar : profile.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                  {editMode && (
                    <button 
                      onClick={handleAvatarUpload}
                      className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {editMode ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full text-xl font-bold text-center bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={editedProfile.username}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full text-lg text-center bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="@username"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">@{profile.username}</p>
                  </>
                )}
              </div>

              {/* Bio */}
              <div className="mb-6">
                {editMode ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    maxLength={160}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                {editMode ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={editedProfile.company}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                        placeholder="Company"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                        placeholder="Location"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <input
                        type="url"
                        value={editedProfile.website}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                        className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                        placeholder="Website"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {profile.company && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Building className="h-4 w-4 flex-shrink-0" />
                        <span>{profile.company}</span>
                      </div>
                    )}
                    {profile.location && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile.email && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                    {profile.website && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Link className="h-4 w-4 flex-shrink-0" />
                        <a href={profile.website} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {profile.website}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>Joined March 2020</span>
                    </div>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{profile.followers}</span>
                  <span className="text-gray-600 dark:text-gray-400">followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-white">{profile.following}</span>
                  <span className="text-gray-600 dark:text-gray-400">following</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {editMode ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saveStatus === 'saving'}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors min-h-[36px]"
                    >
                      <Save className="h-4 w-4" />
                      {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedProfile(profile);
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[36px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[36px]"
                  >
                    Edit profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
              <nav className="flex px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-4 px-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== null && (
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Contribution Graph */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {totalContributions} contributions in the last year
                        </h3>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <div className="min-w-[700px]">
                          {/* Month labels */}
                          <div className="flex justify-start text-xs text-gray-500 dark:text-gray-400 mb-2 ml-8">
                            {monthLabels.map((month, index) => (
                              <div key={index} className="w-[13px] text-left" style={{ marginRight: '1px' }}>
                                {index % 2 === 0 ? month.name : ''}
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex">
                            {/* Day labels */}
                            <div className="flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2 h-[91px]">
                              <span className="leading-3">Mon</span>
                              <span className="leading-3">Wed</span>
                              <span className="leading-3">Fri</span>
                            </div>
                            
                            {/* Contribution grid */}
                            <div className="flex gap-[1px]">
                              {contributionWeeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-[1px]">
                                  {week.map((day, dayIndex) => (
                                    <div
                                      key={dayIndex}
                                      className={`w-[11px] h-[11px] rounded-sm ${
                                        day ? getContributionColor(day.count) : 'bg-transparent'
                                      }`}
                                      title={
                                        day 
                                          ? `${day.count} contributions on ${day.date.toDateString()}`
                                          : ''
                                      }
                                    />
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Legend */}
                          <div className="flex items-center justify-between mt-4">
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                              Learn how we count contributions
                            </button>
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>Less</span>
                              <div className="flex items-center gap-[1px]">
                                <div className="w-[11px] h-[11px] bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
                                <div className="w-[11px] h-[11px] bg-green-200 dark:bg-green-900/50 rounded-sm"></div>
                                <div className="w-[11px] h-[11px] bg-green-300 dark:bg-green-700/70 rounded-sm"></div>
                                <div className="w-[11px] h-[11px] bg-green-400 dark:bg-green-600 rounded-sm"></div>
                                <div className="w-[11px] h-[11px] bg-green-500 dark:bg-green-500 rounded-sm"></div>
                              </div>
                              <span>More</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Popular Repositories */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Popular repositories
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockRepositories.slice(0, 4).map((repo, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {repo.name}
                              </h4>
                              {repo.isPrivate && (
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                  Private
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{repo.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                {repo.language}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {repo.stars}
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="h-3 w-3" />
                                {repo.forks}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'repositories' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {profile.publicRepos} repositories
                      </h3>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors min-h-[36px]">
                        New
                      </button>
                    </div>
                    
                    {mockRepositories.map((repo, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                              {repo.name}
                            </h4>
                            {repo.isPrivate && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded border">
                                Private
                              </span>
                            )}
                          </div>
                          <button className="flex items-center justify-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-[60px]">
                            <Star className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{repo.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            {repo.language}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {repo.stars}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            {repo.forks}
                          </div>
                          <span>Updated {repo.updated}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="text-center py-12">
                    <Book className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">Projects help you organize and track your work.</p>
                  </div>
                )}

                {activeTab === 'packages' && (
                  <div className="text-center py-12">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No packages published</h3>
                    <p className="text-gray-600 dark:text-gray-400">Packages help you share and reuse code.</p>
                  </div>
                )}

                {activeTab === 'stars' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {profile.starredRepos.length} starred repositories
                    </h3>
                    
                    {profile.starredRepos.length > 0 ? (
                      profile.starredRepos.map((repoName, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                          <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer mb-2">
                            {repoName}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">Repository description would go here</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                              JavaScript
                            </div>
                            <span>Starred recently</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Star className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No starred repositories</h3>
                        <p className="text-gray-600 dark:text-gray-400">Star repositories to keep track of projects you find interesting.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;