import React from 'react';
import { TrendingUp, Clock, Folder } from 'lucide-react';
import { Article } from '../../types';

interface SidebarProps {
  articles: Article[];
  onTagClick?: (tag: string) => void;
  onCategoryClick?: (category: string) => void;
  onArticleClick?: (article: Article) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  articles, 
  onTagClick, 
  onCategoryClick, 
  onArticleClick 
}) => {
  // Get trending tags
  const allTags = articles.flatMap(article => article.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const trendingTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag);

  // Get recent posts
  const recentPosts = [...articles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 5);

  // Get popular categories
  const categories = [...new Set(articles.map(article => article.category))];

  return (
    <div className="space-y-8">
      {/* Trending Keywords */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Trending Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => onTagClick?.(tag)}
              className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full hover:bg-blue-100 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
        </div>
        <div className="space-y-4">
          {recentPosts.map((article) => (
            <div 
              key={article.id}
              className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => onArticleClick?.(article)}
            >
              <img 
                src={article.image} 
                alt={article.title}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {new Date(article.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Folder className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        </div>
        <div className="space-y-2">
          {categories.map((category) => {
            const count = articles.filter(article => article.category === category).length;
            return (
              <button
                key={category}
                onClick={() => onCategoryClick?.(category)}
                className="flex items-center justify-between w-full px-3 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors"
              >
                <span className="text-gray-700">{category}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};