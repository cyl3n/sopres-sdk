import { cms, REVALIDATE } from "@/lib/cms";
import type { Page } from "@sopres/sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Blog Post Detail Page - Server Side Rendering (SSR)
 * Generates dynamic metadata for SEO
 */

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const response = await cms.content.getBySlug(params.slug);
    const page = response.data;

    return {
      title: page.seoTitle ?? page.title,
      description: page.seoDescription ?? page.excerpt,
      keywords: page.seoKeywords?.join(", "),
      openGraph: {
        title: page.seoTitle ?? page.title,
        description: page.seoDescription ?? page.excerpt,
        type: "article",
        publishedTime: page.publishedAt ?? page.createdAt.toString(),
        images: page.ogImage ? [{ url: page.ogImage }] : [],
      },
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let page: Page | null = null;

  try {
    const response = await cms.content.getBySlug(params.slug);
    page = response.data;
  } catch (err) {
    console.error("Error fetching blog post:", err);
    notFound();
  }

  if (!page) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <time className="text-sm text-gray-500">
          {new Date(page.publishedAt ?? page.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          )}
        </time>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
          {page.title}
        </h1>
        {page.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {page.excerpt}
          </p>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />

      <footer className="mt-12 pt-8 border-t">
        <a
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          ← Back to blog
        </a>
      </footer>
    </article>
  );
}

export const revalidate = REVALIDATE.BLOG_POST;

/**
 * Generate static params for all published blog posts at build time
 */
export async function generateStaticParams() {
  try {
    const response = await cms.content.list({
      status: "PUBLISHED",
      limit: 100,
    });

    return response.data.map((page) => ({
      slug: page.slug,
    }));
  } catch (err) {
    console.error("Error generating static params:", err);
    return [];
  }
}
