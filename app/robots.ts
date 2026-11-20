import type { MetadataRoute } from 'next'

// Private areas, kept out of every crawler's reach
const PRIVATE = ['/api/', '/admin/']

// AI crawlers, named so it is explicit that they are welcome: AI search and assistants
// (answering questions with a citation back to the site) and model training.
// A bot that matches its own group ignores the '*' group, so PRIVATE is repeated.
const AI_CRAWLERS = [
  // OpenAI
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  // Anthropic
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  // Perplexity
  'PerplexityBot', 'Perplexity-User',
  // Google (Gemini) and Apple (Apple Intelligence) AI use; their search crawlers follow '*'
  'Google-Extended', 'Applebot-Extended',
  // Others
  'CCBot', 'Amazonbot', 'meta-externalagent', 'DuckAssistBot', 'MistralAI-User', 'cohere-ai', 'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: 'https://candron.com/sitemap.xml',
  }
}
