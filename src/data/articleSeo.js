// Insights article -> SEO overrides (metaDescription, seoTitle) used by
// insights/[slug].astro ahead of the article's own fields in site.js.
// Kept separate from site.js for the same reason as articleChecklists.js:
// the October 2026 posts are scheduled as cherry-picks onto site.js, so
// fixing them here avoids touching that chain. Slugs for articles not yet
// published are harmless until they exist.
// Added 2026-10-10: the excerpts double as meta descriptions and ran to
// 185-238 characters (limit 160), failing the SEO check-in on each publish.
// Keep descriptions 120-160 characters and full titles (with suffix) <= 70.
export const articleSeo = {
  'ai-agent-security-api-keys': {
    metaDescription: 'AI agents need access, not your real API keys. How stolen keys and manipulated agents differ, and how to build an access boundary the agent cannot rewrite.',
  },
  'building-a-culture-of-cyber-resilience': {
    metaDescription: 'Cyber resilience goes beyond awareness. How to identify, protect, detect, respond and recover through clear accountability, AI guardrails and ISO 27001.',
  },
  'what-would-an-ai-sheq-agent-actually-do': {
    metaDescription: 'What an AI SHEQ agent could do for incidents, risk identification and corrective actions, where MAIA® fits today, and why human oversight stays central.',
  },
  'why-integrated-assurance-matters-in-the-age-of-ai': {
    metaDescription: 'AI governance sets the guardrails; assurance proves they work. How connected risks, controls, evidence and findings strengthen oversight as AI use grows.',
  },
  'iso-42001-implementation-ai-governance': {
    metaDescription: 'How to implement and maintain ISO/IEC 42001: scope real AI use, assess risks and impacts, select controls, keep evidence current and prepare for certification.',
  },
  'iso-27001-mandatory-documents': {
    seoTitle: 'ISO 27001 Mandatory Documents: 2022 Requirements | XGRC® Insights',
    metaDescription: 'What ISO/IEC 27001:2022 actually requires in clauses 4 to 10, where Annex A adds more, what auditors expect anyway, and the myths that create extra work.',
  },
  'iso-42001-vs-iso-27001': {
    seoTitle: 'ISO 42001 vs ISO 27001: What\'s the Difference? | XGRC®',
    metaDescription: 'ISO 42001 vs ISO 27001: how an AI management system differs from an ISMS, where the two standards overlap, and why a connected approach to both makes sense.',
  },
  'king-v-and-the-rise-of-ai-governance': {
    metaDescription: 'King V covers financial years from 1 January 2026. Why AI governance is now a board issue, and how accountability, human oversight and assurance make it real.',
  },
};
