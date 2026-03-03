// app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticleSlugs } from "../data";
import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// If you want fully static generation, you can set:
// export const dynamicParams = false;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // In some Next.js versions, params may be a promise
  const resolvedParams = await params; // <- Await it
  const slug = resolvedParams.slug;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
}