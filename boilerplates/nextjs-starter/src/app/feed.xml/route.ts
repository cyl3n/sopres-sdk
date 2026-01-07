import { cms } from "@/lib/cms";
import { NextResponse } from "next/server";

/**
 * RSS Feed Generator
 * Generates an RSS feed from published blog posts
 */
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const response = await cms.content.list({
      status: "PUBLISHED",
      limit: 50,
      sortBy: "publishedAt",
      sortOrder: "desc",
    });

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>soPres Blog</title>
    <link>${siteUrl}</link>
    <description>Latest articles and updates</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${response.data
      .map(
        (page) => `
    <item>
      <title><![CDATA[${page.title}]]></title>
      <link>${siteUrl}/blog/${page.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${page.slug}</guid>
      <description><![CDATA[${page.excerpt ?? ""}]]></description>
      <pubDate>${new Date(page.publishedAt ?? page.createdAt).toUTCString()}</pubDate>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("Error generating RSS feed:", err);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
