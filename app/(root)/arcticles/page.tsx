
"use client";

import { useEffect, useState } from "react";
import { Article } from "@/types";
import CardArticle from "@/components/sharedComponents/CardArticle";
import { AddButton } from "@/components/ui/action-button";
import { Modal } from "@/components/ui/modal";
import ArticleForm from "@/components/ArticleForm";
import { useAuth } from "@/contexts/AuthContext";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles');

      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError('Error loading articles. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAddArticle = async (formData: Partial<Article>) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add article');
      }

      // Refresh the articles list
      await fetchArticles();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error adding article:', err);
      alert('Failed to add article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsEditModalOpen(true);
  };

  const handleUpdateArticle = async (formData: Partial<Article>) => {
    if (!currentArticle) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/articles/${currentArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      // Refresh the articles list
      await fetchArticles();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating article:', err);
      alert('Failed to update article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteArticle = async () => {
    if (!currentArticle) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/articles/${currentArticle.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      // Refresh the articles list
      await fetchArticles();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('Failed to delete article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && articles.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Articles</h1>
        <div className="text-center py-10">Loading articles...</div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Articles</h1>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        {isAdmin && (
          <AddButton onClick={() => setIsAddModalOpen(true)} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <CardArticle 
            key={article.id} 
            article={article} 
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        ))}
      </div>

      {/* Add Article Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Article"
      >
        <ArticleForm
          onSubmit={handleAddArticle}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Edit Article Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Article"
      >
        {currentArticle && (
          <ArticleForm
            article={currentArticle}
            onSubmit={handleUpdateArticle}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={isSubmitting}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Article"
      >
        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this article?</p>
          <p className="font-bold mb-6">{currentArticle?.title}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteArticle}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Articles;
