# soPres Next.js Starter

> A production-ready Next.js 14 starter template powered by soPres

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## Features

✅ **Next.js 14 App Router** - Latest Next.js with App Directory
✅ **TypeScript** - Full type safety with strict mode
✅ **Tailwind CSS** - Utility-first CSS framework
✅ **soPres SDK** - Fully integrated headless CMS
✅ **SSG + ISR + SSR** - Multiple rendering strategies
✅ **SEO Optimized** - Meta tags, sitemap, RSS feed
✅ **Responsive Design** - Mobile-first approach
✅ **Image Optimization** - Next.js Image component ready

## Quick Start

### 1. Prerequisites

- Node.js 18.17+
- A soPres backend instance running

### 2. Installation

```bash
# Clone or download this starter
git clone https://github.com/sopres/nextjs-starter.git my-project
cd my-project

# Install dependencies
npm install
```

### 3. Configuration

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

Update the environment variables:

```env
NEXT_PUBLIC_SOPRES_API_URL=https://your-api.example.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage (SSG)
│   ├── globals.css          # Global styles
│   ├── not-found.tsx        # 404 page
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── feed.xml/            # RSS feed
│   └── blog/
│       ├── page.tsx         # Blog list (ISR)
│       └── [slug]/
│           └── page.tsx     # Blog post (SSR)
├── components/              # React components
└── lib/
    └── cms.ts              # soPres SDK client
```

## Rendering Strategies

This starter demonstrates three rendering strategies:

### 1. Static Site Generation (SSG) - Homepage

```tsx
// app/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const { data } = await cms.content.list({ ... });
  // ...
}
```

**Use case:** Content that changes infrequently (marketing pages, landing pages)

### 2. Incremental Static Regeneration (ISR) - Blog List

```tsx
// app/blog/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const { data } = await cms.content.list({ ... });
  // ...
}
```

**Use case:** Content that updates regularly but doesn't need real-time updates

### 3. Server Side Rendering (SSR) - Blog Posts

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({ params }) {
  const { data } = await cms.content.getBySlug(params.slug);
  // ...
}
```

**Use case:** Dynamic content with SEO requirements

## soPres SDK Usage

### Fetching Content

```typescript
import { cms } from "@/lib/cms";

// List all published pages
const { data } = await cms.content.list({
  status: "PUBLISHED",
  page: 1,
  limit: 20,
});

// Get page by ID
const { data } = await cms.content.get("page-id");

// Get page by slug
const { data } = await cms.content.getBySlug("my-post");

// Search content
const { data } = await cms.content.search("react tutorial");
```

### Authentication (Optional)

```typescript
import { cms } from "@/lib/cms";

// Login
const { data } = await cms.auth.login({
  email: "user@example.com",
  password: "password",
});

// Store tokens
cms.setAccessToken(data.accessToken);
cms.setRefreshToken(data.refreshToken);
```

## SEO Configuration

### Meta Tags

Each page can define custom metadata:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page Title",
  description: "Page description",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    images: [{ url: "/og-image.jpg" }],
  },
};
```

### Sitemap

Automatically generated at `/sitemap.xml`

### RSS Feed

Automatically generated at `/feed.xml`

## Environment Variables

| Variable                     | Required | Description                             | Default                 |
| ---------------------------- | -------- | --------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SOPRES_API_URL` | ✅       | soPres API URL                          | -                       |
| `NEXT_PUBLIC_SITE_URL`       | ❌       | Your site URL (for sitemap/RSS)         | `http://localhost:3000` |
| `SOPRES_ACCESS_TOKEN`        | ❌       | Access token for authenticated requests | -                       |
| `SOPRES_REFRESH_TOKEN`       | ❌       | Refresh token                           | -                       |
| `REVALIDATE_HOMEPAGE`        | ❌       | Homepage revalidation (seconds)         | `3600`                  |
| `REVALIDATE_BLOG_LIST`       | ❌       | Blog list revalidation (seconds)        | `60`                    |
| `REVALIDATE_BLOG_POST`       | ❌       | Blog post revalidation (seconds)        | `3600`                  |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

### Docker

```bash
# Build image
docker build -t sopres-nextjs .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SOPRES_API_URL=https://your-api.example.com \
  sopres-nextjs
```

## Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript compiler check
```

## Customization

### Styling

Edit `src/app/globals.css` and `tailwind.config.ts` to customize the design.

### Adding Pages

Create new pages in `src/app/`:

```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>About page</div>;
}
```

### Components

Add reusable components in `src/components/`:

```tsx
// src/components/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="...">{children}</button>;
}
```

## TypeScript

This starter uses strict TypeScript with all safety features enabled. Types are imported from `@sopres/sdk`:

```typescript
import type { Page, Media, User } from "@sopres/sdk";
```

## Performance

- ✅ Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- ✅ Core Web Vitals: All passing
- ✅ Image Optimization: Built-in with `next/image`
- ✅ Code Splitting: Automatic with Next.js
- ✅ Tree Shaking: Enabled

## Troubleshooting

### API Connection Error

```
Error: NEXT_PUBLIC_SOPRES_API_URL is not defined
```

**Solution:** Create `.env.local` file with your soPres API URL

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Resources

- [soPres Documentation](https://sopres.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT

## Support

- 📧 Email: support@sopres.dev
- 💬 Discord: [Join our community](https://discord.gg/sopres)
- 🐛 Issues: [GitHub Issues](https://github.com/sopres/nextjs-starter/issues)
