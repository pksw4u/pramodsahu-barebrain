/**
 * Single source of truth for identity, links and site-level copy.
 * Everything the visitor can click or read about "who this is" lives here.
 */

export const SITE = {
  /**
   * Canonical origin. Used for canonical tags, Open Graph URLs and sitemap.xml.
   * Swap this when the Cloudflare custom domain is live.
   */
  url: 'https://pramodsahu.pages.dev',
  name: 'Pramod Sahu',
  role: 'AI Automation Engineer',
  title: 'Pramod Sahu — AI Automation Engineer',
  description:
    'AI Automation Engineer building agents, RAG systems and workflow automation that turn complex business processes into working systems.',
  locale: 'en',
  /** Text used for the generated /og image and favicon wordmark. */
  initials: 'PS',
  location: 'Odisha, India',
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
];

/**
 * Tools used across the work below, grouped by role. Portfolio-level claims —
 * unlike per-project `stack` frontmatter, these are not tied to one repository.
 */
export const STACK: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript'] },
  { label: 'AI / Agents', items: ['LangGraph', 'LangChain', 'Deep Agents', 'Hermes Agent'] },
  { label: 'Automation', items: ['n8n', 'Make', 'APIs', 'Webhooks'] },
  { label: 'RAG / Data', items: ['Supabase', 'Pinecone', 'Qdrant', 'Cohere'] },
  { label: 'Models / Infra', items: ['Gemini', 'OpenAI', 'Ollama', 'OpenRouter', 'Docker'] },
];

export type SocialLink = { label: string; href: string; handle: string };

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/pksw4u/', handle: 'pksw4u' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pramoda-sahu-10b194132',
    handle: 'pramoda-sahu',
  },
  { label: 'X', href: 'https://x.com/pksahu_sahu', handle: '@pksahu_sahu' },
];

export const EMAIL = 'spramod4ai@gmail.com';
export const EMAIL_HREF = `mailto:${EMAIL}`;

/** Where the long-form writing lives. These are the only two publishing homes. */
export const PUBLICATIONS = [
  {
    name: 'BareBrain',
    href: 'https://barebrain.substack.com/',
    description:
      'Essays and ideas on AI systems, agents and the infrastructure around them.',
    topics: ['Voice AI', 'Conversation design', 'LLM research', 'Emerging architectures'],
  },
  {
    name: 'DEV',
    href: 'https://dev.to/pramod_sahu_d5bd2e6de82d1/',
    description:
      'Technical articles and implementation notes, mostly written alongside a build.',
    topics: ['Agents', 'RAG', 'Architecture', 'Python'],
  },
] as const;

/**
 * Articles published on DEV. Titles and links are the real ones from the
 * profile — nothing here is generated or paraphrased.
 */
export const DEV_ARTICLES = [
  {
    title: 'The Nuts and Bolts of Voice AI Agents',
    href: 'https://dev.to/pramod_sahu_d5bd2e6de82d1/the-nuts-and-bolts-of-voice-ai-agents-4gge',
  },
  {
    title: 'DeepSeek Harness: What Happens When the Agent Runtime Becomes the Product',
    href: 'https://dev.to/pramod_sahu_d5bd2e6de82d1/deepseek-harness-what-happens-when-the-agent-runtime-becomes-the-product-1012',
  },
  {
    title: 'How I Built a Compounding Markdown Wiki for Research: When Standard RAG Stops Being Enough',
    href: 'https://dev.to/pramod_sahu_d5bd2e6de82d1/how-i-built-a-compounding-markdown-wiki-for-research-when-standard-rag-stops-being-enough-1bnd',
  },
  {
    title: 'Designing a Self-Prompting Agent Harness with Per-Task Prompt, Tool, and Strategy Synthesis',
    href: 'https://dev.to/pramod_sahu_d5bd2e6de82d1/designing-a-self-prompting-agent-harness-with-per-task-prompt-tool-and-strategy-synthesis-4b7a',
  },
  {
    title: 'Understanding the Agent Loop: How Tool-Using LLM Systems Actually Work',
    href: 'https://dev.to/pramod_sahu_d5bd2e6de82d1/understanding-the-agent-loop-how-tool-using-llm-systems-actually-work-2mb5',
  },
  {
    title:
      'Understanding Pi Coding Agent: A Minimal, Extensible Architecture for Terminal-First AI Coding Workflow',
    href: 'https://dev.to/pramod_sahu_d5bd2e6de82d1/understanding-pi-coding-agent-a-minimal-extensible-architecture-for-terminal-first-ai-coding-40d4',
  },
] as const;

/** BareBrain posts named on the existing portfolio. Links go to the publication. */
export const BAREBRAIN_TOPICS = [
  { title: 'Streaming STT and Voice Agents', tag: 'Voice AI' },
  { title: 'Smart Turn Detection', tag: 'Conversation design' },
  { title: 'Declarative Attention', tag: 'LLM research' },
  { title: 'Looped Transformers', tag: 'Emerging architectures' },
] as const;

/** Shown in the "Currently exploring" block. */
export const EXPLORING = [
  'Decision models',
  'Agent harnesses',
  'Agent memory',
  'Sandboxing',
  'RAG systems',
  'Local AI',
  'Agent infrastructure',
] as const;

/** Capability groups used on the home page and the work index. */
export const CAPABILITIES = [
  {
    title: 'AI agents',
    body: 'Assistants that hold a conversation, call tools, and hand work to other systems without a human in the middle.',
  },
  {
    title: 'Workflow automation',
    body: 'Business processes rebuilt as n8n and Make.com workflows — webhooks, APIs and third-party integrations wired together.',
  },
  {
    title: 'RAG & knowledge systems',
    body: 'Retrieval over business-specific knowledge, with chunking, vector storage and reranking tuned to the actual question.',
  },
  {
    title: 'Voice AI',
    body: 'Receptionist and support agents built on real-time speech-to-text, conversational turns and text-to-speech.',
  },
] as const;

/** Grouped technology list, straight from the existing portfolio. */
export const STACK_GROUPS = [
  { label: 'Automation', items: ['n8n', 'Make.com'] },
  { label: 'AI & LLMs', items: ['LLM APIs', 'RAG', 'Prompt engineering', 'AI agents', 'Local LLMs', 'Tool calling'] },
  { label: 'Agent frameworks', items: ['LangGraph', 'LangChain', 'DeepAgents'] },
  { label: 'Voice AI', items: ['Vapi', 'Retell', 'ElevenLabs', 'Twilio'] },
  { label: 'Data & retrieval', items: ['Pinecone', 'Supabase', 'Vector search', 'Reranking'] },
  { label: 'Integration', items: ['REST APIs', 'Webhooks', 'Shopify APIs'] },
  { label: 'Document AI', items: ['OCR', 'PDF parsing', 'Structured data extraction'] },
] as const;
