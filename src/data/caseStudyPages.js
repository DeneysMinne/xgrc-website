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
];

export const publishedCaseStudyPages = caseStudyPages.filter((c) => !c.draft);
export const draftCaseStudyPages = caseStudyPages.filter((c) => c.draft);

for (const c of publishedCaseStudyPages) {
  if (JSON.stringify(c).includes('[CONFIRM')) {
    throw new Error(`Case study ${c.slug} is published (draft: false) but still contains [CONFIRM] placeholders`);
  }
}
