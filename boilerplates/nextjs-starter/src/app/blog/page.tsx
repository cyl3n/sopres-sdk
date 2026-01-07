import { cms, REVALIDATE } from "@/lib/cms";
import type { Page } from "@sopres/sdk";

/**
 * Blog List Page - Incremental Static Regeneration (ISR)
 * Revalidates every 60 seconds to show fresh content
 */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page ?? 1);
  const limit = 12;

  let pages: Page[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    const response = await cms.content.list({
      status: "PUBLISHED",
      page: currentPage,
      limit,
      sortBy: "publishedAt",
      sortOrder: "desc",
    });

    pages = response.data;
    totalPages = response.meta?.totalPages ?? 1;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch blog posts";
    console.error("Error fetching blog posts:", err);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 text-lg">
          Latest articles and updates from our team
        </p>
      </header>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          <p className="font-medium">Error loading blog posts</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page) => (
              <article
                key={page.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <time className="text-sm text-gray-500">
                    {new Date(
                      page.publishedAt ?? page.createdAt,
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-2xl font-semibold mt-2 mb-3">
                    <a href={`/blog/${page.slug}`} className="hover:underline">
                      {page.title}
                    </a>
                  </h2>
                  {page.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {page.excerpt}
                    </p>
                  )}
                  <a
                    href={`/blog/${page.slug}`}
                    className="inline-flex items-center text-blue-600 hover:underline font-medium"
                  >
                    Read article →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {pages.length === 0 && !error && (
            <p className="text-center text-gray-500 py-12">
              No blog posts available yet.
            </p>
          )}

          {totalPages > 1 && (
            <nav className="flex justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <a
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  ← Previous
                </a>
              )}
              <span className="px-4 py-2 border rounded bg-blue-50">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <a
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Next →
                </a>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export const revalidate = REVALIDATE.BLOG_LIST;
