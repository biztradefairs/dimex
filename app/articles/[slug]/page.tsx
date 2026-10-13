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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
}