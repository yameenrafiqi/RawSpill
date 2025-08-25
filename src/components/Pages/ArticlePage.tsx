import React from 'react';
import { Calendar, User, ArrowLeft, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Article } from '../../types';
import { ArticleCard } from '../Cards/ArticleCard';

interface ArticlePageProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ 
  article, 
  relatedArticles, 
  onBack, 
  onArticleClick 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${article.title}`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
  };

  const shareOnLinkedIn = () => {
    window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
  };

  const shareOnFacebook = () => {
    window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to {article.type}s</span>
        </button>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="aspect-video overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            {/* Meta Information */}
            <div className="flex items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(article.publishDate)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share Buttons */}
            <div className="border-t pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 size={20} className="text-gray-600" />
                  <span className="text-gray-600 font-medium">Share this article</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={shareOnTwitter}
                    className="p-2 text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                    title="Share on Facebook"
                  >
                    <Facebook size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard 
                  key={relatedArticle.id}
                  article={relatedArticle}
                  onClick={onArticleClick}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};