import React, { useState, useEffect } from 'react';
import { Save, X, Upload } from 'lucide-react';
import { Article } from '../../types';
import { generateId } from '../../utils/storage';

interface ArticleEditorProps {
  article?: Article;
  onSave: (article: Article) => void;
  onCancel: () => void;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({ article, onSave, onCancel }) => {
  const [form, setForm] = useState<Omit<Article, 'id'>>({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    author: 'Syed Nayer Ahtisham',
    publishDate: new Date().toISOString().split('T')[0],
    tags: [],
    category: '',
    type: 'article',
    trending: false
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (article) {
      setForm({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        image: article.image,
        author: article.author,
        publishDate: article.publishDate,
        tags: article.tags,
        category: article.category,
        type: article.type,
        trending: article.trending || false
      });
    }
  }, [article]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.content.trim()) newErrors.content = 'Content is required';
    if (!form.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!form.image.trim()) newErrors.image = 'Image URL is required';
    if (!form.category.trim()) newErrors.category = 'Category is required';
    if (form.tags.length === 0) newErrors.tags = 'At least one tag is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const articleToSave: Article = {
        ...form,
        id: article?.id || generateId(),
        content: form.content.replace(/\n/g, '<br>')
      };
      
      onSave(articleToSave);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {article ? 'Edit Article' : 'Create New Article'}
            </h1>
            <button
              onClick={onCancel}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Article title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value as 'article' | 'blog' }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="article">Article</option>
                  <option value="blog">Blog Post</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Technology, Design"
                />
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date *
                </label>
                <input
                  type="date"
                  value={form.publishDate}
                  onChange={(e) => setForm(prev => ({ ...prev, publishDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              {form.image && (
                <div className="mt-2">
                  <img src={form.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description of the article (100-150 characters)"
              />
              {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
              <p className="mt-1 text-sm text-gray-500">{form.excerpt.length}/150 characters</p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                rows={12}
                value={form.content}
                onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Write your article content here. You can use basic HTML tags like <h2>, <p>, <strong>, <em>, etc."
              />
              {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag and press Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Add
                </button>
              </div>
              {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
            </div>

            {/* Trending */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="trending"
                checked={form.trending}
                onChange={(e) => setForm(prev => ({ ...prev, trending: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="trending" className="text-sm font-medium text-gray-700">
                Mark as trending
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={18} />
                {article ? 'Update' : 'Create'} Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};