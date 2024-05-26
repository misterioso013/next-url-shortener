import {
  pgTable,
  serial,
  text,
  bigint,
  boolean,
  timestamp
} from 'drizzle-orm/pg-core';

// Define a table
export const urls = pgTable('urls', {
    id: serial('id').primaryKey(),
    url: text('name').unique().notNull(),
    slug: text('slug').unique().notNull(),
    ads: boolean('ads').default(false),
    clicks: bigint('clicks', { mode: 'number'}).default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Urls = typeof urls.$inferSelect;