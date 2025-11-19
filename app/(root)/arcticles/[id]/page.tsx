
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { EditButton, DeleteButton } from "@/components/ui/action-button";
import { Modal } from "@/components/ui/modal";
import ArticleForm from "@/components/ArticleForm";
import { useAuth } from "@/contexts/AuthContext";
import {articles} from "@/data/articles";

interface ArticleDetailProps {
  params: {
    id: string;
  };
}

const ArticleDetail = ({ params }: ArticleDetailProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';


  // 🔹 Récupération directe depuis le tableau local
  const fetchArticle = () => {
    setLoading(true);
    const id = parseInt(params.id);
    const found = articles.find(a => a.id === id) || null;

    if (!found) {
      setError("Article not found");
      setArticle(null);
    } else {
      setArticle(found);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [params.id]);

  const handleUpdateArticle = (formData: Partial<Article>) => {
    if (!article) return;

    setIsSubmitting(true);
    const index = articles.findIndex(a => a.id === article.id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...formData, id: article.id };
      setArticle(articles[index]);
    }
    setIsSubmitting(false);
    setIsEditModalOpen(false);
  };

  // 🔹 Suppression directe du tableau local
  const handleDeleteArticle = () => {
    if (!article) return;

    setIsSubmitting(true);
    const index = articles.findIndex(a => a.id === article.id);
    if (index !== -1) {
      articles.splice(index, 1);
      router.push("/arcticles"); // redirection après suppression
    }
    setIsSubmitting(false);
  };
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-10">Loading article details...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-10 text-red-500">
          {error || 'Article not found'}
        </div>
        <div className="text-center mt-4">
          <Link href="/arcticles" className="text-blue-500 hover:underline">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/arcticles" className="text-blue-500 hover:underline">
          ← Back to Articles
        </Link>

        {isAdmin && (
          <div className="flex space-x-2">
            <EditButton onClick={() => setIsEditModalOpen(true)} />
            <DeleteButton onClick={() => setIsDeleteModalOpen(true)} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-[400px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{article.title}</CardTitle>
            <CardDescription>Category: {article.category}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{article.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Price</h3>
                <p className="text-xl font-bold">${article.price.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="font-semibold">Stock</h3>
                <p className={`text-xl ${article.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                  {article.stock} units
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <div className="text-sm text-gray-500">
              Added on: {new Date(article.createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Edit Article Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Article"
      >
        <ArticleForm
          article={article}
          onSubmit={handleUpdateArticle}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Article"
      >
        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this article?</p>
          <p className="font-bold mb-6">{article.title}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteArticle}
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

export default ArticleDetail;
