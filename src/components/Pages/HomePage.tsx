import React from 'react';
import { Feather, TrendingUp } from 'lucide-react';
import { SubscribeBox } from '../SubscribeBox';
import { Article } from '../../types';
import { ArticleCard } from '../Cards/ArticleCard';
import { Sidebar } from '../Layout/Sidebar';

interface HomePageProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ articles, onArticleClick, onNavigate }) => {
  const trendingArticles = articles.filter(article => article.trending).slice(0, 3);
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Feather size={48} className="mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: 'Bookman Old Style, serif' }}>RAWSPILL</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            <span style={{ fontFamily: 'Merriweather, Georgia, serif', fontWeight: 500 }}>
              Building stronger minds, deeper lives, and wider horizons.
            </span>
          </p>
          <button 
            onClick={() => onNavigate('articles')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Explore Articles
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Trending Articles */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="text-blue-600" size={28} />
                <h2 className="text-3xl font-bold text-gray-900">Trending Articles</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {trendingArticles.map((article) => (
                  <ArticleCard 
                    key={article.id}
                    article={article}
                    onClick={onArticleClick}
                    variant="trending"
                  />
                ))}
              </div>
            </section>

            {/* Latest Articles */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
                <button 
                  onClick={() => onNavigate('articles')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestArticles.map((article) => (
                  <ArticleCard 
                    key={article.id}
                    article={article}
                    onClick={onArticleClick}
                  />
                ))}
              </div>
              {/* Subscription Box placed below Latest Articles */}
              <SubscribeBox />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar 
              articles={articles} 
              onArticleClick={onArticleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};