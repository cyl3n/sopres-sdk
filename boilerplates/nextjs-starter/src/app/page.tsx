import { cms, REVALIDATE } from "@/lib/cms";
import type { Page } from "@sopres/sdk";

/**
 * Homepage - Static Site Generation (SSG)
 * Fetches published content at build time and revalidates periodically
 */
export default async function HomePage() {
  let pages: Page[] = [];
  let error: string | null = null;

  try {
    const response = await cms.content.list({
      status: "PUBLISHED",
      limit: 6,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    pages = response.data;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch content";
    console.error("Error fetching homepage content:", err);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to soPres</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern headless CMS built with Next.js 14 and TypeScript. Get
          started by editing this page.
        </p>
      </section>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          <p className="font-medium">Error loading content</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <section>
          <h2 className="text-3xl font-bold mb-8">Latest Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <article
                key={page.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">
                  <a href={`/blog/${page.slug}`} className="hover:underline">
                    {page.title}
                  </a>
                </h3>
                {page.excerpt && (
                  <p className="text-gray-600 mb-4">{page.excerpt}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(page.createdAt).toLocaleDateString()}</span>
                  <a
                    href={`/blog/${page.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {pages.length === 0 && !error && (
            <p className="text-center text-gray-500 py-12">
              No content available yet. Start creating content in your soPres
              backend.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

export const revalidate = REVALIDATE.HOMEPAGE;
