import React, { useState } from 'react';

const CategoryFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['ai']);
  
  const categories = [
    'AI', 'Web', 'Mobile', 'Game Dev', 'DevOps', 'Data Science', 
    'Machine Learning', 'Blockchain', 'Cloud', 'Security', 'Frontend', 'Backend'
  ];

  const toggleCategory = (category: string) => {
    const categoryLower = category.toLowerCase();
    setSelectedCategories(prev =>
      prev.includes(categoryLower)
        ? prev.filter(c => c !== categoryLower)
        : [...prev, categoryLower]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  const handleSelectAll = () => {
    setSelectedCategories(categories.map(cat => cat.toLowerCase()));
  };

  return (
    <section className="py-6 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by topic:</span>
          <div className="flex gap-2">
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={handleSelectAll}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Select all
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                selectedCategories.includes(category.toLowerCase())
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {selectedCategories.length > 0 && (
          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            {selectedCategories.length} topic{selectedCategories.length !== 1 ? 's' : ''} selected
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryFilters;