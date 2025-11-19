import { articles } from '@/data/articles';
import { NextResponse } from 'next/server';
import { Article } from '@/types';

// GET handler for fetching all articles
export async function GET() {
  return NextResponse.json(articles);
}

// POST handler for creating a new article
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.price || !body.category || !body.image || body.stock === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate a new ID (in a real app, this would be handled by the database)
    const newId = Math.max(...articles.map(article => article.id), 0) + 1;

    // Create the new article
    const newArticle: Article = {
      id: newId,
      title: body.title,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      image: body.image,
      stock: parseInt(body.stock),
      createdAt: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    // Add the new article to the array (in a real app, this would be saved to a database)
    articles.push(newArticle);

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
