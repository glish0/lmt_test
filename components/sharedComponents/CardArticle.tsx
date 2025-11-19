"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Article } from "@/types";
import { EditButton, DeleteButton } from "@/components/ui/action-button";
import { useAuth } from "@/contexts/AuthContext";

interface CardArticleProps {
    article: Article;
    onEdit?: (article: Article) => void;
    onDelete?: (article: Article) => void;
}

export default function CardArticle({ article, onEdit, onDelete }: CardArticleProps) {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEdit) onEdit(article);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) onDelete(article);
    };

    return (
        <Link href={`/arcticles/${article.id}`} key={article.id}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
                {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex space-x-2">
                        <EditButton onClick={handleEdit} size="sm" />
                        <DeleteButton onClick={handleDelete} size="sm" />
                    </div>
                )}

                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                    {loading && <div className="text-gray-400">Loading image...</div>}

                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className={`object-cover rounded transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
                        onLoadingComplete={() => setLoading(false)}
                    />
                </div>

                <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.category}</CardDescription>
                </CardHeader>

                <CardContent>
                    <p className="line-clamp-2">{article.description}</p>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <div className="font-bold">${article.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Stock: {article.stock}</div>
                </CardFooter>
            </Card>
        </Link>
    );
}
