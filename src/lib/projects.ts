import { getCollection, type CollectionEntry } from 'astro:content';
import type { ProjectListItem } from '../components/ProjectList.astro';

export type Project = CollectionEntry<'projects'>;

export const KIND_LABEL: Record<Project['data']['kind'], string> = {
  'open-source': 'Open source',
  client: 'Client work',
  experiment: 'Experiment',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;

export function hrefFor(project: Project) {
  return `/work/${project.id}`;
}

/** "21 Sep 2026" from an ISO date. Returns null rather than guessing. */
function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return `${String(parsed.getUTCDate()).padStart(2, '0')} ${MONTHS[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
}

/**
 * The "date · category" line, built from whichever parts are documented.
 * Client work has no public repository, so it leads with the kind instead of
 * a date that cannot be verified.
 */
export function metaLineFor(project: Project): string | null {
  const { date, category, year, kind } = project.data;
  const stamp = formatDate(date) ?? (year ? String(year) : null);
  const lead = stamp ?? (kind === 'client' ? KIND_LABEL.client : null);
  return [lead, category].filter(Boolean).join(' · ') || null;
}

export function toListItem(project: Project): ProjectListItem {
  const { title, summary, date, stack } = project.data;
  return {
    title,
    summary,
    href: hrefFor(project),
    date,
    meta: metaLineFor(project),
    tech: stack.join(' · ') || null,
  };
}

/** All case studies, in display order. */
export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects')).sort(byOrder);
}

/** The subset shown on the home page. */
export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.data.featured);
}
