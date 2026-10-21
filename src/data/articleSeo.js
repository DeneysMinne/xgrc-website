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
  // 2026-10-12: ranks 4.5 for "sheq meaning" (656 impressions/28d) and 7.2
  // for "sheq" but drew 2 clicks. Lead with the meaning searchers type and
  // promise more than the one-line definition Google already shows.
  'what-is-sheq': {
    seoTitle: 'SHEQ Meaning: What SHEQ Stands For (vs HSE, SHERQ) | XGRC®',
    metaDescription: 'SHEQ stands for safety, health, environment and quality. How it differs from HSE and SHERQ, what a SHEQ system includes, plus a free checklist.',
  },
  // 2026-10-12: ranks 4.2 for "iso 14001 software" and 4.6 for "iso14001
  // software" (buyer searches) with 0 clicks; the old title never named the
  // standards the article covers in depth.
  'integrated-management-system-software-for-modern-compliance': {
    seoTitle: 'ISO 14001, 45001 & 9001 Software: One Integrated System | XGRC®',
    metaDescription: 'ISO 14001, ISO 45001 and ISO 9001 software on one platform: one risk register, one audit trail and no duplicated effort across your management systems.',
  },
  'king-v-and-the-rise-of-ai-governance': {
    metaDescription: 'King V covers financial years from 1 January 2026. Why AI governance is now a board issue, and how accountability, human oversight and assurance make it real.',
  },
  // 2026-10-21: November 2026 to January 2027 series (Connected Governance. Measurable
  // Confidence.), scheduled from 3 Nov; harmless until each post is published.
  'connected-governance-from-fragmented-systems': {
    seoTitle: 'Connected Governance: From Fragmented Systems to Control | XGRC®',
    metaDescription: 'What connected governance means, why fragmented GRC systems create risk, and five practical steps to link risks, controls, findings and actions.',
  },
  'why-compliance-alone-is-no-longer-enough': {
    seoTitle: 'Beyond Compliance: Why Compliance Alone Is Not Enough | XGRC®',
    metaDescription: 'Going beyond compliance means proving your controls work every day. See where compliance-only approaches fail and how integrated management systems help.',
  },
  'hidden-cost-of-disconnected-risk-management': {
    seoTitle: 'Integrated Risk Management: Hidden Cost of Silos | XGRC®',
    metaDescription: 'Disconnected risk registers cost more than you think. Four hidden costs of siloed risk processes and how integrated risk management removes them.',
  },
  'risk-visibility-executive-decision-making': {
    seoTitle: 'Risk Reporting to the Board: Visibility for Executives | XGRC®',
    metaDescription: 'What good risk reporting to the board includes: risk appetite, key risk indicators, control effectiveness and King V context, with a practical report structure.',
  },
  'sheq-accountability-operational-resilience': {
    seoTitle: 'SHEQ Accountability: Who Is Ultimately Accountable? | XGRC®',
    metaDescription: 'SHEQ accountability explained: who is ultimately accountable in an integrated SHEQ system, what OHS Act section 16 and ISO 45001 require, and how to embed it.',
  },
  'incident-reporting-to-continuous-improvement': {
    seoTitle: 'Incident Investigation and Corrective Action: Close the Loop | XGRC®',
    metaDescription: 'A practical guide to incident investigation and corrective action: find root causes, choose stronger controls, verify effectiveness and share the learning.',
  },
  'connected-compliance-controls-organisational-resilience': {
    seoTitle: 'Compliance Controls: Design, Test and Extend to Suppliers | XGRC®',
    metaDescription: 'How to design, own, test and evidence compliance controls, and why your suppliers\' and contractors\' controls are part of your own compliance.',
  },
  'cybersecurity-governance-beyond-technical-controls': {
    seoTitle: 'Cybersecurity Governance: Beyond Technical Controls | XGRC®',
    metaDescription: 'What cybersecurity governance means for boards: ISO 27001 leadership, King V, POPIA section 19, business risk ownership and combined assurance over cyber.',
  },
  'what-2026-taught-organisations-about-connected-grc': {
    seoTitle: 'GRC Lessons from 2026: What Connected Governance Taught Us | XGRC®',
    metaDescription: 'Five GRC lessons from 2026, from King V\'s first year to AI governance and POPIA enforcement, and how to carry them into a connected 2027.',
  },
  'annual-sheq-review': {
    seoTitle: 'Annual SHEQ Review: Turning a Year of Data into Decisions | XGRC®',
    metaDescription: 'How to run an annual SHEQ review: ISO 45001 clause 9.3 inputs, leading and lagging indicators, action effectiveness and decisions for 2027.',
  },
  'from-risk-registers-to-risk-intelligence': {
    seoTitle: 'Risk Register to Risk Intelligence: Building a Living Register | XGRC®',
    metaDescription: 'What makes a risk register useful for decisions: ownership, linked controls and evidence, KRIs and King V Principle 8, plus a year-end health check.',
  },
  'combined-assurance-2027-planning': {
    seoTitle: 'Combined Assurance: How to Plan Your 2027 Assurance Cycle | XGRC®',
    metaDescription: 'What combined assurance means under King V and the IIA Three Lines Model, and a five-step method to plan your 2027 assurance cycle.',
  },
  'cybersecurity-governance-year-end-review': {
    seoTitle: 'ISMS Management Review: A Year-End Guide to ISO 27001 9.3 | XGRC®',
    metaDescription: 'How to run a year-end ISMS management review under ISO/IEC 27001 clause 9.3: inputs, risk treatment, SoA, incident lessons and accountability.',
  },
  'environmental-compliance-2027-visibility-accountability': {
    seoTitle: 'Environmental Compliance Management: A Year-End Review | XGRC®',
    metaDescription: 'Environmental compliance management for 2027: review NEMA authorisations, AELs, WULs and waste licences condition by condition, with owners and evidence.',
  },
  'connected-compliance-management-2027': {
    seoTitle: 'Contractor Compliance Management: Preparing for 2027 | XGRC®',
    metaDescription: 'Contractor compliance management for 2027: re-vetting cycles, expiring documents, contractor safety files, POPIA operator agreements and clear ownership.',
  },
  'grc-strategy-2027': {
    seoTitle: 'GRC Strategy for 2027: Where to Begin and What to Prioritise | XGRC®',
    metaDescription: 'How to build a GRC strategy for 2027: an honest baseline, three priorities, a quarterly sequence, outcome measures and governed AI with MAIA®.',
  },
  'corporate-governance-framework-2027': {
    seoTitle: 'Corporate Governance Framework for 2027: Where to Begin | XGRC®',
    metaDescription: 'Build a corporate governance framework that works in 2027: start with decisions, assign accountability, connect risk to strategy and make evidence routine.',
  },
  'compliance-obligations-to-accountable-action': {
    seoTitle: 'Compliance Obligations Register: From List to Action | XGRC®',
    metaDescription: 'Build a compliance obligations register that links every requirement to an owner, a control, evidence and action, including obligations flowed to suppliers.',
  },
  'environmental-compliance-plan-2027': {
    seoTitle: 'Environmental Compliance Plan for 2027: Build Your Calendar | XGRC®',
    metaDescription: 'Build an environmental compliance plan for 2027: turn permit conditions into owned tasks, fix reporting deadlines, plan renewals and respond to exceedances.',
  },
  'enterprise-risk-management-strategic-decisions': {
    seoTitle: 'Strategic Risk Management: Connect ERM to Decisions | XGRC®',
    metaDescription: 'Strategic risk management puts risk in the room as strategy is set: objectives, risk appetite, scenarios and outcome-based treatment, per COSO and ISO 31000.',
  },
  'assurance-mapping-2027-governance-plan': {
    seoTitle: 'Assurance Mapping: Build Your 2027 Assurance Map | XGRC®',
    metaDescription: 'A practical guide to assurance mapping: plot material risks against every assurance provider, find gaps and overlaps, and track findings through to closure.',
  },
  'management-systems-continual-improvement': {
    seoTitle: 'Management System Continual Improvement: Close the Loop | XGRC®',
    metaDescription: 'How management system continual improvement works: Harmonized Structure clause 10, PDCA, corrective action effectiveness and a management review that decides.',
  },
  'cybersecurity-governance-2027-priorities': {
    seoTitle: 'ISMS Objectives for 2027: Setting Clause 6.2 Targets | XGRC®',
    metaDescription: 'How to set ISMS objectives for 2027 under ISO/IEC 27001 clause 6.2: measurable targets tied to risk, owners, supplier and AI security, POPIA and assurance.',
  },
  'proactive-sheq-management-strategy-2027': {
    seoTitle: 'Proactive SHEQ Management: A 2027 Strategy Guide | XGRC®',
    metaDescription: 'Build a proactive SHEQ management strategy for 2027: hazard identification, near-miss reporting, worker participation and leading indicators that predict harm.',
  },
};
