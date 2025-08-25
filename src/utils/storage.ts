import { Article } from '../types';

const STORAGE_KEY = 'blog-articles';

export const getStoredArticles = (): Article[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading articles from storage:', error);
    return [];
  }
};

export const saveArticles = (articles: Article[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (error) {
    console.error('Error saving articles to storage:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
