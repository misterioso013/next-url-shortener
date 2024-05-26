import { router, publicProcedure } from './trpc';
import * as z from 'zod';
import { db } from '@/lib/db';
import { Urls, urls } from '@/lib/schema';
import { eq } from 'drizzle-orm';

const urlSchema = z.object({
    url: z.string({
      required_error: 'URL is required',
    }).url({
      message: 'Invalid URL',
    }).min(3).max(2048),
    ads: z.boolean().optional().default(false),
    });

export const appRouter = router({
  short: publicProcedure.input(urlSchema).mutation(async (opts) => {

    const { url, ads } = opts.input;
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(url)) {
      throw new Error('Invalid URL');
    }
    const slug = Math.random().toString(36).substring(2, 7);
    const existingUrl = await db.select({
      url: urls.url,
      slug: urls.slug,
    }).from(urls).where(eq(urls.url, url));

    if (existingUrl.length) {
      return {
        success: true,
        slug: existingUrl[0].slug,
        url: process.env.BASE_URL + "/" + existingUrl[0].slug,
        longUrl: existingUrl[0].url,
      };
    }
    const newUrl: Urls[] = await db.insert(urls).values({
      url,
      slug,
      ads,
    }).returning();
    return {
      success: true,
      slug: newUrl[0].slug,
      url: process.env.BASE_URL + "/" + newUrl[0].slug,
      longUrl: newUrl[0].url,
    };
}),
url: publicProcedure.input(
  z.object({
    slug: z.string({
      required_error: 'Slug is required',
    }),
  }),
).query(async (opts) => {
  const { slug } = opts.input;
  const url = await db.select(
    {
      url: urls.url,
    },
  ).from(urls).where(eq(urls.slug, slug));
  if (!url.length) {
    throw new Error('URL not found');
  }
  return url[0].url;
}),
addVisit: publicProcedure.input(
  z.object({
    slug: z.string({
      required_error: 'Slug is required',
    }),
  }),
).mutation(async (opts) => {
  const { slug } = opts.input;
  const url = await db.select(
    {
      url: urls.url,
      slug: urls.slug,
      clicks: urls.clicks,
    },
  ).from(urls).where(eq(urls.slug, slug));
  if (!url.length) {
    throw new Error('URL not found');
  }
  await db.update(urls).set({
    clicks: Number(url[0].clicks) + 1,
  }).where(eq(urls.slug, slug));
  return {
    success: true,
  };
}),

});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;