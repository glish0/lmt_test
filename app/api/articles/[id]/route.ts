import { articles } from '@/data/articles';
import { NextRequest, NextResponse } from 'next/server';



// PUT handler for updating an article
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const articleIndex = articles.findIndex(article => article.id === id);

    if (articleIndex === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const updatedArticle = {
      ...articles[articleIndex],
      ...body,
      id: id
    };

    articles[articleIndex] = updatedArticle;

    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// DELETE handler for removing an article
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const articleIndex = articles.findIndex(article => article.id === id);

  if (articleIndex === -1) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  const deletedArticle = articles[articleIndex];
  articles.splice(articleIndex, 1);

  return NextResponse.json({ message: 'Article deleted successfully', article: deletedArticle });
}
