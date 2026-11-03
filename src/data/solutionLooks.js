// Per-solution look used by the feature-standard pages: accent colour,
// dashboard screenshot (public/assets/screenshots/) and product icon.
export const solutionLooks = {
  'sheqx': { acc: '#fbbf24', shot: 'sheqx-dashboard.webp' },
  'envirx': { acc: '#34d399', shot: 'envirx-dashboard.webp' },
  'esg': { acc: '#3ecf8e', shot: 'esg-dashboard.webp' },
  'erm': { acc: '#fb923c', shot: 'erm-dashboard-new.webp' },
  'msx': { acc: '#30e2f4', shot: 'msx-dashboard.webp' },
  'msxcyber': { acc: '#a78bfa', shot: 'msxcyber-dashboard.webp' },
  'integrated-assurance': { acc: '#60a5fa', shot: 'integrated-assurance-dashboard.webp' },
  'compliance-hub': { acc: '#f472b6', shot: 'compliance-hub-dashboard-v2.webp' },
  'xlogic': { acc: '#2dd4bf', shot: 'xlogic-dashboard.webp' },
  'maia': { acc: '#c084fc', shot: 'maia-dashboard-v2.webp' },
  'ai-governance': { acc: '#60a5fa', shot: 'ai-governance-dashboard-register.webp' },
  'xrm': { acc: '#38bdf8', shot: 'xrm-dashboard.png' },
  'libryo': { acc: '#22d3ee', shot: 'compliance-hub-dashboard-v2.webp' },
  'hakware': { acc: '#f87171', shot: 'msxcyber-dashboard.webp' },
};

const ICONS = ['msx', 'msxcyber', 'esg', 'sheqx', 'erm', 'integrated-assurance', 'envirx', 'compliance-hub', 'xlogic', 'maia', 'xrm'];
export const lookFor = (slug) => solutionLooks[slug] || solutionLooks.msx;
export const solutionIcon = (slug) => (ICONS.includes(slug) ? `/assets/logos/solutions/icons/${slug}.png` : null);
