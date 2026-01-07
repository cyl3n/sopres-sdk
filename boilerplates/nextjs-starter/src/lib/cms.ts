/**
 * soPres SDK Client Configuration
 */

import { SopresClient } from "@sopres/sdk";

if (!process.env.NEXT_PUBLIC_SOPRES_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_SOPRES_API_URL is not defined. Please check your .env file.",
  );
}

export const cms = new SopresClient({
  apiUrl: process.env.NEXT_PUBLIC_SOPRES_API_URL,
  accessToken: process.env.SOPRES_ACCESS_TOKEN,
  refreshToken: process.env.SOPRES_REFRESH_TOKEN,
});

/**
 * Revalidation times (in seconds)
 */
export const REVALIDATE = {
  HOMEPAGE: Number(process.env.REVALIDATE_HOMEPAGE ?? 3600),
  BLOG_LIST: Number(process.env.REVALIDATE_BLOG_LIST ?? 60),
  BLOG_POST: Number(process.env.REVALIDATE_BLOG_POST ?? 3600),
} as const;
