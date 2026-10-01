import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Case studies live as MDX so the prose stays in the file, while the metadata
 * block rendered at the top of each page is validated here.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One line. Used in the project list and as the page meta description. */
    summary: z.string(),
    kind: z.enum(['open-source', 'client', 'experiment']),
    /** Shown on the home page project list. */
    order: z.number(),
    featured: z.boolean().default(false),
    /** Left blank when the date is not documented. Never guessed. */
    year: z.number().optional(),
    /**
     * Exact date the public repository was created, ISO format. Sourced from the
     * GitHub API, not estimated. Omitted for client work, which has no public repo.
     */
    date: z.string().optional(),
    /** Short topic label shown next to the date in content lists. */
    category: z.string().optional(),
    status: z.string().optional(),
    /** Named client, only where the existing portfolio already named one. */
    client: z.string().optional(),
    /** What I actually did. */
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects };
