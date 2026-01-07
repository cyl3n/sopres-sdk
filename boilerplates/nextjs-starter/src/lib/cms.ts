/**
 * soPres SDK Client Configuration
 */

import { createsoPres } from "@sopres/sdk";

if (!process.env.NEXT_PUBLIC_VITECMS_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_VITECMS_API_URL is not defined. Please check your .env file.",
  );
}

export const cms = createsoPres({
  apiUrl: process.env.NEXT_PUBLIC_VITECMS_API_URL,
  accessToken: process.env.VITECMS_ACCESS_TOKEN,
  refreshToken: process.env.VITECMS_REFRESH_TOKEN,
});

/**
 * Revalidation times (in seconds)
 */
export const REVALIDATE = {
  HOMEPAGE: Number(process.env.REVALIDATE_HOMEPAGE ?? 3600),
  BLOG_LIST: Number(process.env.REVALIDATE_BLOG_LIST ?? 60),
  BLOG_POST: Number(process.env.REVALIDATE_BLOG_POST ?? 3600),
} as const;
