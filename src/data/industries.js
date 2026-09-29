// Industry landing pages: /industries/<slug>/ (SEO Fix Spec T16).
//
// Each page lists the regulations the industry works under, the XGRC®
// modules that address them, and a customer case study. While `draft: true`,
// a page builds only at /preview/industries/<slug>/ (noindex, unlinked, not in
// the sitemap). Set `draft: false` to publish. Anything unconfirmed is written
// "[CONFIRM: ...]", and the build fails if a published page still contains it.
//
// Before publishing /industries/mining/, agree how it differs from
// /mining-esg-compliance-software-africa/ (which already ranks), so the two
// pages don't compete. Suggested split: this page targets mine safety and
// operational compliance; the existing page keeps ESG.

export const industries = [
  {
    slug: 'manufacturing',
    draft: true,
    name: 'Manufacturing',
    title: 'Manufacturing Compliance Software South Africa | XGRC®',
    metaDescription: 'Safety, quality, environmental and supplier compliance software for South African manufacturers: OHS Act, ISO 9001, 14001 and 45001 on one platform.',
    h1: 'Compliance software for South African manufacturers',
    intro: 'Manufacturers answer to safety inspectors, environmental regulators, certification auditors and customers, often in the same month. XGRC® brings safety, quality, environmental and supplier compliance onto one platform, so every site works from the same records and every audit draws on the same evidence.',
    regulations: [
      { name: 'Occupational Health and Safety Act 85 of 1993', detail: 'Including the General Safety Regulations, the Driven Machinery Regulations 2015 and the Hazardous Chemical Agents Regulations 2021.' },
      { name: 'National Environmental Management Act 107 of 1998', detail: 'With the Waste Act 59 of 2008 and, for listed activities, atmospheric emission licences under the Air Quality Act 39 of 2004.' },
      { name: 'ISO 9001, ISO 14001 and ISO 45001', detail: 'Quality, environmental and health and safety management systems, often run as one integrated system.', href: '/use-cases/iso-compliance/' },
      { name: 'Protection of Personal Information Act 4 of 2013', detail: 'For employee, customer and supplier information held across the business.', href: '/use-cases/popia-compliance/' },
      { name: 'B-BBEE Act 53 of 2003', detail: 'Supplier verification for preferential procurement.', href: '/insights/vendor-compliance-management/' },
    ],
    modules: [
      { slug: 'sheqx', name: 'SHEQX®', why: 'Incidents, hazard identification, inspections and safety actions across every plant.' },
      { slug: 'msx', name: 'MSX®', why: 'ISO 9001 quality management and one integrated management system across standards.' },
      { slug: 'envirx', name: 'ENVIRX®', why: 'Environmental monitoring, licence conditions and obligations.' },
      { slug: 'compliance-hub', name: 'Compliance Hub', why: 'Supplier and contractor documents, from B-BBEE to COID and safety files.' },
      { slug: 'erm', name: 'ERM', why: 'Operational and enterprise risk, linked to controls and actions.' },
    ],
    caseStudies: ['vican-manufacturing', 'tn-ceramics'],
    faqs: [
      { q: 'What compliance software do manufacturers need?', a: 'Most manufacturers need to manage health and safety under the OHS Act, quality to ISO 9001, environmental obligations under NEMA and supplier compliance. A single platform avoids running separate systems for each, so incidents, non-conformances, audits and actions share one set of records.' },
      { q: 'Can XGRC® run ISO 9001, 14001 and 45001 together?', a: 'Yes. MSX® runs them as one integrated management system, following the approach described in PAS 99, with shared document control, internal audits, corrective actions and management review.' },
    ],
  },
  {
    slug: 'mining',
    draft: true,
    name: 'Mining',
    title: 'Mine Safety & Compliance Software South Africa | XGRC®',
    metaDescription: 'Mine safety and compliance software for South Africa: Mine Health and Safety Act, MPRDA, NEMA and water use licence obligations on one auditable platform.',
    h1: 'Mine safety and compliance software for South Africa',
    intro: 'Mines carry some of the heaviest compliance loads of any industry, from mine health and safety duties to environmental authorisations, water use licences and social and labour plans. XGRC® gives mining operations and their contractors one auditable platform for those obligations.',
    regulations: [
      { name: 'Mine Health and Safety Act 29 of 1996', detail: 'Risk assessments, codes of practice, incident reporting and the duties of employers and contractors on mines.' },
      { name: 'Mineral and Petroleum Resources Development Act 28 of 2002', detail: 'Social and labour plan commitments and Mining Charter reporting.' },
      { name: 'National Environmental Management Act 107 of 1998', detail: 'Environmental authorisations and their conditions.' },
      { name: 'National Water Act 36 of 1998', detail: 'Water use licence conditions and monitoring.' },
      { name: 'King V and ESG disclosure', detail: 'Board-level governance and sustainability reporting.', href: '/mining-esg-compliance-software-africa/' },
    ],
    modules: [
      { slug: 'sheqx', name: 'SHEQX®', why: 'Incidents, risk assessments, inspections and contractor safety across every shaft and site.' },
      { slug: 'envirx', name: 'ENVIRX®', why: 'Environmental and water monitoring against licence conditions.' },
      { slug: 'esg', name: 'ESG', why: 'Environmental, social and governance disclosure for investors and lenders.' },
      { slug: 'compliance-hub', name: 'Compliance Hub', why: 'Contractor documents, COID and safety files before anyone goes on site.' },
      { slug: 'erm', name: 'ERM', why: 'Operational and enterprise risk, linked to controls and assurance.' },
    ],
    caseStudies: ['sandton-plant-hire'],
    faqs: [
      { q: 'What is mine safety compliance software?', a: 'It is a system for managing the obligations of the Mine Health and Safety Act and related law, including risk assessments, codes of practice, incidents, inspections and contractor safety, with owners, evidence and an audit trail in one place.' },
      { q: 'Does XGRC® cover contractors on mines?', a: 'Yes. Compliance Hub collects and verifies contractor documents such as COID letters and safety files before work starts, and SHEQX® manages contractor incidents and inspections on site.' },
    ],
  },
];

export const publishedIndustries = industries.filter((i) => !i.draft);
export const draftIndustries = industries.filter((i) => i.draft);

for (const i of publishedIndustries) {
  if (JSON.stringify(i).includes('[CONFIRM')) {
    throw new Error(`Industry page ${i.slug} is published (draft: false) but still contains [CONFIRM] placeholders`);
  }
}
