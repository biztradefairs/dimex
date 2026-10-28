// app/articles/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticleSlugs } from "../data";
import ArticleClient from "./ArticleClient";
import { pageMeta } from "@/lib/pageMetadata";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | DIEMEX 2027",
    };
  }

  if (slug === "ev-die-casting-and-tooling-in-india-key-trends") {
    return pageMeta(
      "EV Die Casting and Tooling in India: Key Trends",
      "How EV growth is reshaping die casting and tooling in India: giga-casting, new capacity in Pune, and what toolmakers need. See it at DIEMEX 2027.",
      `/articles/${slug}`
    );
  }

  return pageMeta(
    `${article.attributes.Title} | DIEMEX 2027`,
    article.attributes.Excerpt,
    `/articles/${slug}`
  );
}

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