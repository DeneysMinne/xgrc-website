// HTML case study pages (SEO Fix Spec T16). The PDF stays available as a download.
//
// Content is taken from the published case study PDFs in public/case-studies/.
// While `draft: true`, a page builds only at /preview/case-studies/<slug>/
// (noindex, unlinked, not in the sitemap). Set `draft: false` to publish at
// /case-studies/<slug>/. Anything unconfirmed is written "[CONFIRM: ...]", and
// the build fails if a published page still contains it.
//
// Company name, sector and summary come from `caseStudies` in site.js.

export const caseStudyPages = [
  {
    slug: 'tn-ceramics',
    draft: false,
    datePublished: '2026-09-29',
    title: 'TN Ceramics Case Study: SHEQ, Quality and Risk | XGRC®',
    metaDescription: 'How TN Ceramics, a South African ceramics manufacturer, runs safety, quality, environment and enterprise risk on XGRC®, with GRC Link.',
    headline: 'TN Ceramics: safety, quality, environment and risk on one platform',
    location: 'South Africa',
    partner: 'GRC Link',
    solutions: [
      { name: 'SHEQX®', href: '/sheqx/' },
      { name: 'ENVIRX®', href: '/envirx/' },
      { name: 'ERM', href: '/erm/' },
      { name: 'ISO 9001 quality management', href: '/use-cases/iso-9001-readiness/' },
    ],
    about: 'Founded in 1998, TN Ceramics manufactures fire-assay crucibles, cupels and fluxes for major mining companies across Southern Africa, serving the gold and platinum sectors. Its annual output exceeds 2 million units.',
    challenges: [
      'Fragmented, manual data management processes',
      'Difficulty tracking safety incidents, quality issues and environmental metrics in real time',
      'Complex and time-consuming audit and compliance reporting',
      'Inefficient management of product quality assurance and ISO 9001 compliance',
      'Little visibility of enterprise-wide risks',
    ],
    solution: 'TN Ceramics implemented SHEQX®, ENVIRX®, ERM and an ISO 9001 quality management system on the XGRC® platform, with implementation by GRC Link. The platform brings safety incident management, environmental compliance, enterprise risk oversight and quality control into one system.',
    highlights: [
      'One cloud-based system for safety, health, environment, risk and quality',
      'Real-time incident reporting through the mobile apps',
      'Automated audit, inspection and quality assurance management',
      'Environmental monitoring and compliance reporting',
      'Enterprise risk management with live risk registers',
      'An integrated ISO 9001 quality management module',
    ],
    results: [
      { figure: '30%', label: 'fewer safety incidents', detail: 'with a 50% increase in proactive near-miss reporting' },
      { figure: '40%', label: 'fewer product non-conformances', detail: 'and ISO 9001 certification achieved' },
      { figure: '40%', label: 'fewer high-priority enterprise risks', detail: 'through proactive mitigation' },
      { figure: '70%', label: 'less time on compliance reporting', detail: 'with 100% compliance in environmental monitoring and reporting, and 15% lower energy use' },
    ],
    quote: {
      text: 'Implementing XGRC solutions with GRC Link transformed our approach. We now manage compliance and quality proactively, enhancing our operational excellence significantly.',
      name: 'Herford Dennis',
      role: 'Managing Director, TN Ceramics',
    },
    outlook: 'TN Ceramics plans to expand its use of XGRC®, adding predictive analytics and further sustainability modules, with GRC Link continuing to support its ISO 9001 quality objectives.',
  },
  {
    slug: 'vican-manufacturing',
    draft: false,
    datePublished: '2026-09-29',
    title: 'Vican Manufacturing Case Study: SHEQX® and ISO 9001 | XGRC®',
    metaDescription: 'How Vican Manufacturing, a South African paint producer, uses SHEQX® and ISO 9001 quality management on XGRC®, with GRC Link.',
    headline: 'Vican Manufacturing: safety, quality and compliance with SHEQX® and ISO 9001',
    location: 'South Africa',
    partner: 'GRC Link',
    solutions: [
      { name: 'SHEQX®', href: '/sheqx/' },
      { name: 'ISO 9001 quality management', href: '/use-cases/iso-9001-readiness/' },
    ],
    about: 'Vican Manufacturing produces automotive, industrial and commercial paints, with services including colour matching, white-labelling and strategic support for its customers.',
    challenges: [
      'Fragmented, manual management of safety incidents, quality data and compliance reporting',
      'Keeping product quality consistent across diverse product lines',
      'Growing regulatory pressure on environmental and occupational safety standards',
      'Slow, time-consuming preparation for quality and compliance audits',
      'Limited visibility of enterprise-wide risks',
    ],
    solution: 'Vican Manufacturing deployed SHEQX® with integrated ISO 9001 quality management, implemented by GRC Link and tailored to its operations.',
    highlights: [
      'One cloud-based system for SHEQ, quality and risk data',
      'Real-time incident and quality issue reporting through the mobile apps',
      'An ISO 9001 quality management module that keeps processes consistent',
      'Automated audit scheduling and compliance checks',
      'Risk management tools with real-time visibility of operational risks',
    ],
    results: [
      { figure: '40%', label: 'fewer product non-conformances', detail: 'and ISO 9001 certification achieved' },
      { figure: '30%', label: 'fewer safety incidents', detail: 'with more proactive incident reporting' },
      { figure: '40%', label: 'fewer high-priority enterprise risks', detail: 'through effective mitigation' },
      { figure: '70%', label: 'less audit preparation time', detail: 'significantly reducing administrative workload' },
    ],
    quote: {
      text: 'With the SHEQX® platform and ISO 9001 integration, supported by GRC Link, our operational processes have become streamlined and transparent, directly contributing to customer trust and operational efficiency.',
      name: 'Ryan Palmer',
      role: 'Operations Manager, Vican Manufacturing',
    },
    outlook: 'Vican Manufacturing plans to expand its use of SHEQX®, adding predictive analytics and further sustainability reporting, with GRC Link supporting continuous improvement.',
  },
  {
    slug: 'commercial-cold-holdings',
    draft: false,
    datePublished: '2026-11-03',
    title: 'Commercial Cold Holdings Case Study: SHEQX® | XGRC®',
    metaDescription: 'How Commercial Cold Holdings, one of the world\'s 25 largest cold storage groups, digitised SHEQ with SHEQX®, implemented by OSA International.',
    headline: 'Commercial Cold Holdings: group-wide SHEQ visibility with SHEQX®',
    location: 'South Africa, Namibia and Mozambique',
    partner: 'OSA International',
    partnerUrl: 'https://osa-int.cloud/',
    companyUrl: 'https://www.cchcold.com/',
    solutions: [
      { name: 'SHEQX®', href: '/sheqx/' },
    ],
    about: 'Commercial Cold Holdings (CCH) is Southern Africa\'s leading cold storage and logistics provider, committed to reducing food waste, enhancing food security and supporting economic growth across the continent. With facilities in South Africa, Namibia and Mozambique, CCH serves a broad range of industries including agriculture, fishing, fruit exports, retail and food services. As one of the 25 largest refrigerated warehousing providers globally, CCH operates in a highly regulated environment where food safety, quality assurance and environmental compliance are non-negotiable.',
    challenges: [
      'Fragmented SHEQ data across business units',
      'Manual compliance tracking and limited audit traceability',
      'Poor visibility into compliance risks, expiry dates and corrective actions',
      'Time-consuming incident and non-conformance reporting (NCR) processes',
    ],
    solution: 'In partnership with OSA International, CCH implemented SHEQX®, a centralised, cloud-based compliance platform from XGRC® Software. SHEQX® was selected for its ability to digitally transform the way SHEQ is monitored, reported and managed across CCH\'s network. The platform allows CCH to unify its approach to workplace safety, environmental stewardship and food quality management, ensuring alignment with ISO 22000, ISO 14001 and ISO 45001.',
    highlights: [
      'Real-time incident, audit and inspection capture via mobile devices',
      'A centralised, auditable database for all SHEQ documentation and data',
      'Automated compliance tracking across sites, certifications and legal registers',
      'Smart notifications and escalations for incidents, actions and document expiries',
      'Live dashboards for compliance performance monitoring and decision support',
    ],
    results: [
      { figure: 'Top 25', label: 'cold storage group globally', detail: 'among the largest refrigerated warehousing providers in the world' },
      { figure: '3', label: 'countries', detail: 'South Africa, Namibia and Mozambique' },
      { figure: '6', label: 'SHEQX® modules', detail: 'implemented in the initial rollout' },
      { figure: '1 Aug 2024', label: 'group-wide go-live', detail: 'after a phased implementation led by OSA International' },
    ],
    implementation: {
      intro: 'The rollout began in mid-2024 and followed a phased, well-governed implementation plan led by OSA International.',
      steps: [
        'Core system configuration and document migration',
        'Setup of employee profiles and training paths',
        'Two focused training sessions for super users and administrators in July',
        'Group-wide go-live on 1 August 2024',
      ],
      modules: ['Profile Management', 'Document Manager', 'Action Manager', 'Inspection and NCR Management', 'Incident Management', 'Mobile Application Access'],
      note: 'The initial rollout covered major CCH facilities including Paarden Eiland, Duncan Dock, Epping, Walvis Bay, Midrand, Keystone, Richmond, Aeroton and Greenbushes, laying the foundation for group-wide standardisation.',
    },
    resultsIntro: 'Since the go-live, CCH has seen meaningful improvements in both compliance capability and operational confidence. By consolidating SHEQ data into a single platform, CCH has unlocked better reporting, faster decision-making and a more responsive compliance culture.',
    resultsList: [
      'Group-wide, real-time SHEQ visibility across all operations',
      'Faster incident response and trend identification',
      'Improved audit readiness and ISO alignment',
      'Reduced manual effort and fewer data errors',
      'Greater assurance in maintaining export-critical certifications (FSSC 22000, PPECB, DALRRD, HACCP)',
    ],
    lessons: [
      'Early stakeholder engagement drives smoother adoption',
      'Super user training is key to building internal capability',
      'SHEQ digitisation should be seen as an enabler, not an overhead, for performance, food safety and customer trust',
    ],
    quotes: [
      { text: 'Implementing SHEQX® has been a turning point in our compliance journey. We have not only digitised key processes but also gained real-time visibility into SHEQ performance across the group.', name: 'Larna Jodamus', role: 'Group Compliance Manager, CCH' },
      { text: 'SHEQX® empowers our teams to manage risk proactively. With better data and mobile functionality, we have created a safer, smarter operating environment.', name: 'Jurie Schoeman', role: 'Chief Operations Officer, CCH' },
    ],
    conclusion: 'Through its partnership with OSA International and the adoption of SHEQX®, CCH has strengthened its position as a compliance-first, food safety-driven cold chain leader. The digitisation of SHEQ has enabled CCH to meet international expectations, support sustainable growth and build confidence with both regulators and customers.',
  },
];

export const publishedCaseStudyPages = caseStudyPages.filter((c) => !c.draft);
export const draftCaseStudyPages = caseStudyPages.filter((c) => c.draft);

for (const c of publishedCaseStudyPages) {
  if (JSON.stringify(c).includes('[CONFIRM')) {
    throw new Error(`Case study ${c.slug} is published (draft: false) but still contains [CONFIRM] placeholders`);
  }
}
