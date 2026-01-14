// app/articles/[slug]/page.tsx - SERVER COMPONENT
import { notFound } from 'next/navigation';
import { mockArticles } from '../data';
import ArticleClient from './ArticleClient'; // Import from separate file

// This is a server component that handles static generation
export async function generateStaticParams() {
  const slugs = Object.keys(mockArticles);
  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

// Main server component
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    // Validate slug exists
    if (!slug || typeof slug !== 'string') {
      console.error('Invalid slug parameter:', slug);
      notFound();
    }
    
    const article = mockArticles[slug];

    if (!article) {
      console.error(`Article with slug "${slug}" not found`);
      notFound();
    }

    // Pass data to client component
    return <ArticleClient article={article} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}