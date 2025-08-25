import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
  variant?: 'default' | 'trending';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, variant = 'default' }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden ${
        variant === 'trending' ? 'border-l-4 border-l-blue-500' : ''
      }`}
      onClick={() => onClick(article)}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{formatDate(article.publishDate)}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
            <span className="text-sm">Read More</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
