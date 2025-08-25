import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Layout/Navigation';
import { HomePage } from './components/Pages/HomePage';
import { ArticlesPage } from './components/Pages/ArticlesPage';
import { ArticlePage } from './components/Pages/ArticlePage';
import { AboutPage } from './components/Pages/AboutPage';
import { ContactPage } from './components/Pages/ContactPage';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ArticleEditor } from './components/Admin/ArticleEditor';
import { Article } from './types';
import { dummyArticles } from './data/dummyData';
import { getStoredArticles, saveArticles } from './utils/storage';

type PageType = 'home' | 'articles' | 'blogs' | 'about' | 'contact' | 'admin' | 'article' | 'editor';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Initialize articles from storage or dummy data
  useEffect(() => {
    const storedArticles = getStoredArticles();
    if (storedArticles.length === 0) {
      setArticles(dummyArticles);
      saveArticles(dummyArticles);
    } else {
      setArticles(storedArticles);
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedArticle(null);
    setEditingArticle(null);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage('article');
  };

  const handleBackFromArticle = () => {
    if (selectedArticle?.type === 'blog') {
      setCurrentPage('blogs');
    } else {
      setCurrentPage('articles');
    }
    setSelectedArticle(null);
  };

  const getRelatedArticles = (currentArticle: Article): Article[] => {
    return articles
      .filter(article => 
        article.id !== currentArticle.id && 
        (article.category === currentArticle.category || 
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  // Admin functions
  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleAddArticle = () => {
    setEditingArticle(null);
    setCurrentPage('editor');
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setCurrentPage('editor');
  };

  const handleSaveArticle = (article: Article) => {
    let updatedArticles;
    
    if (editingArticle) {
      // Update existing article
      updatedArticles = articles.map(a => a.id === article.id ? article : a);
    } else {
      // Add new article
      updatedArticles = [article, ...articles];
    }
    
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
    setEditingArticle(null);
    setCurrentPage('admin');
  };

  const handleDeleteArticle = (id: string) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            articles={articles}
            onArticleClick={handleArticleClick}
            onNavigate={handleNavigate}
          />
        );

      case 'articles':
        return (
          <ArticlesPage 
            articles={articles}
            onArticleClick={handleArticleClick}
            type="article"
          />
        );

      case 'blogs':
        return (
          <ArticlesPage 
            articles={articles}
            onArticleClick={handleArticleClick}
            type="blog"
          />
        );

      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactPage />;

      case 'admin':
        if (!isAdminAuthenticated) {
          return <AdminLogin onLogin={handleAdminLogin} />;
        }
        return (
          <AdminDashboard 
            articles={articles}
            onAddArticle={handleAddArticle}
            onEditArticle={handleEditArticle}
            onDeleteArticle={handleDeleteArticle}
            onViewArticle={handleArticleClick}
            onLogout={handleAdminLogout}
          />
        );

      case 'editor':
        return (
          <ArticleEditor 
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={() => setCurrentPage('admin')}
          />
        );

      case 'article':
        if (!selectedArticle) return null;
        return (
          <ArticlePage 
            article={selectedArticle}
            relatedArticles={getRelatedArticles(selectedArticle)}
            onBack={handleBackFromArticle}
            onArticleClick={handleArticleClick}
          />
        );

      default:
        return (
          <HomePage 
            articles={articles}
            onArticleClick={handleArticleClick}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="font-sans">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
