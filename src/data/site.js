// =============================================================================
// XGRC Software — site content.
// Edit copy here once and it flows through every page.
// Sourced from the live xgrcsoftware.com scrape (June 2026).
// =============================================================================

export const brand = {
  name: 'XGRC Software',
  tagline: 'Synergy in Assurance, Strength in Compliance®',
  promise: 'Driving Compliance® within your organisation',
  email: 'info@xgrcsoftware.com',
  phone: '+27 (0)87 802 0179'
};

// Primary navigation. Strategix is an external link to the group site.
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'GRC Software', href: '/grc-software' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Customers', href: '/customers' },
  { label: 'Resources', href: '/resources' },
  { label: 'Insights', href: '/insights' },
  { label: 'Legal Hub', href: '/legal-hub' },
  { label: 'About Us', href: '/about' },
  { label: 'Strategix', href: 'https://www.strategix.co.za', external: true }
];

export const pillars = [
  { name: 'Governance', body: 'The management processes that enable effective decision making to ensure an organisation achieves its goals.' },
  { name: 'Risk', body: 'Setting acceptable enterprise risk thresholds, then analysing, tracking, and mitigating potential issues to ensure the appropriate risk level is met.' },
  { name: 'Compliance', body: 'Conforming with external rules and regulations and internally defined directives and standards.' },
  { name: 'Sustainability', body: 'A robust, proactive approach to corporate sustainability with effective monitoring of the latest legislation and regulations.' }
];

// The real public solution suite (OCCX, BCMX, PIX retired / not in use).
export const solutions = [
  { name: 'MSX®', slug: 'msx', tag: 'Management system', blurb: 'A flexible, integrated hub that unifies multiple XGRC® disciplines into one coordinated management system.' },
  { name: 'MSXCyber', slug: 'msxcyber', tag: 'Information security', blurb: 'ISMS support aligned to ISO 27001, with governance, risk management, and audit-ready evidence for cybersecurity programmes.' },
  { name: 'ESG', slug: 'esg', tag: 'Sustainability', blurb: 'Management of ESG data and governance processes for consistent reporting, traceability, and assurance across sustainability initiatives.' },
  { name: 'SHEQX®', slug: 'sheqx', tag: 'Safety & quality', blurb: 'Management of SHEQ risks, incidents, audits, actions and compliance aligned to ISO 9001, ISO 14001 and ISO 45001.' },
  { name: 'Enterprise Risk Management', slug: 'erm', tag: 'Risk', blurb: 'A structured, auditable approach to enterprise, operational, and project risk aligned to ISO 31000 and COSO.' },
  { name: 'Integrated Assurance', slug: 'integrated-assurance', tag: 'Assurance', blurb: 'Coordination of internal audit and combined assurance, linked directly to risks, controls, and actions.' },
  { name: 'ENVIRX®', slug: 'envirx', tag: 'Environmental', blurb: 'Environmental compliance and performance monitoring with auditable environmental records.' },
  { name: 'XGRC® Compliance Hub', slug: 'compliance-hub', tag: 'Third-party', blurb: 'Supplier, contractor, and third-party compliance through structured onboarding, vetting, and ongoing assurance.' },
  { name: 'XLOGIC®', slug: 'xlogic', tag: 'Supplier', blurb: 'Structured onboarding, vetting and ongoing compliance management of suppliers and contractors.' },
  { name: 'MAIA', slug: 'maia', tag: 'Governed AI', blurb: 'Master Artificial Intelligence Archetype. Governed AI for GRC, combining business intelligence, data views and intelligent agents.' },
  { name: 'Libryo', slug: 'libryo', tag: 'Partner', blurb: 'Jurisdiction-specific regulatory intelligence embedded directly within XGRC®.', partner: true },
  { name: 'Hakware', slug: 'hakware', tag: 'Partner', blurb: 'Behavioural cyber-risk and awareness insight into the human element of security.', partner: true }
];

// Customer roster grouped by industry.
export const customerGroups = [
  {
    id: 'mining', sector: 'Mining & infrastructure', chip: 'Mining',
    customers: [
      { name: 'Fraser Alexander',             logo: 'Fraser-Alexander.jpg' },
      { name: 'Gap Infrastructure Corporation', logo: 'GIC.jpg' },
      { name: 'Sandton Plant Hire',            logo: 'Sandton-Plant-Hire.jpg' },
      { name: 'African Rainbow Minerals',      logo: 'ARM.jpg' },
      { name: 'Rosh Pinah Zinc Corporation',   logo: 'Rosh-Pinah-Zinc.jpg' },
      { name: 'Siyanda Bakgatla Platinum Mine', logo: 'SBPM.jpg' },
    ]
  },
  {
    id: 'manufacturing', sector: 'Manufacturing & industrial', chip: 'Manufacturing',
    customers: [
      { name: 'Trident S.A.',    logo: 'TRIDENTSA.jpg' },
      { name: 'PG Bison',        logo: 'PG-Bison.jpg' },
      { name: 'PG Glass',        logo: 'PG-Glass.jpg' },
      { name: 'Pandrol' },
      { name: 'Helukabel',       logo: 'HELUKABEL.jpg' },
      { name: 'Astec Industries', logo: 'ASTEC.jpg' },
    ]
  },
  {
    id: 'steel', sector: 'Steel manufacturing & supply', chip: 'Steel',
    customers: [
      { name: 'Trident Steel',         logo: 'TRIDENTSTEEL.png' },
      { name: 'Scaw Metals Group',      logo: 'SCAW.png' },
      { name: 'Isilo Steel' },
      { name: 'Qinisa Steel Solutions' },
      { name: 'Steel & Pipes for Africa' },
    ]
  },
  {
    id: 'holding', sector: 'Holding & investment groups', chip: 'Holding',
    customers: [
      { name: 'KAP Ltd',                  logo: 'KAP.png' },
      { name: 'African Rainbow Minerals', logo: 'ARM.jpg' },
      { name: 'Mesure Holdings',          logo: 'MESURE.png' },
      { name: 'Commercial Cold Holdings', logo: 'CCH.jpg' },
      { name: 'Motseng Holdings' },
    ]
  },
  {
    id: 'facilities', sector: 'Facilities, pharma & waste', chip: 'Facilities',
    customers: [
      { name: 'Servest',                    logo: 'SERVEST.jpg' },
      { name: 'Bidvest Steiner' },
      { name: 'Tsebo Solutions Group',       logo: 'TSEBO.jpg' },
      { name: 'Interwaste Holdings',         logo: 'INTERWASTE.jpg' },
      { name: 'Supercare by Empact Group',   logo: 'SUPERCARE.jpg' },
      { name: 'The Pple Group',              logo: 'PPLE.png' },
      { name: 'Avacare Health Group' },
    ]
  },
  {
    id: 'food', sector: 'Food & agriculture', chip: 'Food & Agri',
    customers: [
      { name: 'RCL Foods',       logo: 'RCL-FOODS.jpg' },
      { name: 'Woodlands Dairy', logo: 'WOODLANDS.jpg' },
      { name: 'AFGRI',           logo: 'AFGRI.jpg' },
      { name: 'Overberg Agri',   logo: 'OVERBERG.jpg' },
      { name: 'Meze Foods',      logo: 'MEZE.png' },
      { name: 'ADM',             logo: 'ADM.jpg' },
    ]
  },
  {
    id: 'wine', sector: 'Wine & fruit production', chip: 'Wine & Fruit',
    customers: [
      { name: 'Spier Wine Farm',          logo: 'SPIER.png' },
      { name: 'Lutzville Vineyards' },
      { name: "L'Ormarins Estate",        logo: 'LOMARAIS.png' },
      { name: 'Stellenbosch Hills' },
      { name: 'Letaba African Realty Trust' },
    ]
  },
  {
    id: 'logistics', sector: 'Logistics & distribution', chip: 'Logistics',
    customers: [
      { name: 'Unitrans',                 logo: 'UNITRANS.png' },
      { name: 'Value Logistics' },
      { name: 'Kintetsu World Express',   logo: 'KWE.png' },
      { name: 'Hazmat Global' },
      { name: 'SPAR Distribution Centres', logo: 'SPAR.png' },
      { name: 'Morgan Cargo' },
      { name: 'Toyota South Africa',      logo: 'Toyota.png' },
    ]
  },
  {
    id: 'energy', sector: 'Lubricants, oil & gas', chip: 'Oil & Gas',
    customers: [
      { name: 'FUCHS Lubricants', logo: 'FUCHS.png' },
      { name: 'Puregas' },
      { name: 'Petro Hyper' },
      { name: 'Vula Oils' },
      { name: 'OilTech Namibia' },
    ]
  },
  {
    id: 'technology', sector: 'Science, IT & telecoms', chip: 'Technology',
    customers: [
      { name: 'CSIR',              logo: 'CSIR.png' },
      { name: 'WhiteSci' },
      { name: 'MTC Namibia' },
      { name: 'Mustek',            logo: 'MUSTEK.png' },
      { name: 'INHANCE Technology' },
      { name: 'Clinglobal',        logo: 'CLINGLOBAL.png' },
    ]
  },
];

// pdf: false = no PDF yet. Set pdf: true once you upload /public/case-studies/{slug}.pdf
export const caseStudies = [
  {
    slug: 'vican-manufacturing',
    company: 'Vican Manufacturing',
    sector: 'Manufacturing',
    solution: 'SHEQX®',
    summary: 'A South African paint producer became an industry benchmark for safety, quality, and regulatory compliance through SHEQX® and ISO 9001 implementation.',
    pdf: false,
  },
  {
    slug: 'sandton-plant-hire',
    company: 'Sandton Plant Hire',
    sector: 'Plant hire & mining',
    solution: 'SHEQX®',
    summary: 'Replaced disconnected spreadsheets with SHEQX® — delivering faster SHEQ response times, accurate reporting, and the ability to scale operations without increasing risk exposure.',
    pdf: false,
  },
  {
    slug: 'commercial-cold-holdings',
    company: 'Commercial Cold Holdings',
    sector: 'Cold chain logistics',
    solution: 'SHEQX®',
    summary: 'One of the 25 largest refrigerated warehousing providers globally digitised SHEQ workflows to strengthen food safety, product integrity, and compliance with international export protocols.',
    pdf: false,
  },
  {
    slug: 'interwaste',
    company: 'Interwaste',
    sector: 'Waste management',
    solution: 'SHEQX®',
    summary: 'Unified SHEQ processes across multiple regions — significantly reducing reporting effort, accelerating safety action closure, and increasing near-miss reporting volumes.',
    pdf: false,
  },
  {
    slug: 'pple-group',
    company: 'Pple Group',
    sector: 'Human capital',
    solution: 'SHEQX®',
    summary: 'Elevated operational standards across the group through ISO 9001 and SHEQX®, improving quality management and compliance visibility.',
    pdf: false,
  },
  {
    slug: 'tn-ceramics',
    company: 'TN Ceramics',
    sector: 'Mining & materials',
    solution: 'XGRC®',
    summary: 'A specialist ceramics supplier to major Southern African mining companies adopted XGRC® to strengthen governance, compliance, and operational oversight.',
    pdf: false,
  },
  {
    slug: 'servest',
    company: 'Servest',
    sector: 'Facilities management',
    solution: 'SHEQX® + ENVIRX®',
    summary: 'Digitised SHEQ processes since 2019, reducing administrative burden and achieving renewed ISO 9001, 14001, and 45001 certifications in October 2024.',
    pdf: false,
  },
];

export const articles = [
  'ESG Reporting Is Evolving: Why Spreadsheets Are No Longer Enough',
  'The Cost of Fragmented Compliance: Why Visibility Matters More Than Ever',
  'GRC vs Risk Management Software: Why the Difference Matters',
  'ERM Software vs Traditional Risk Tools: Why Spreadsheets Create Risk',
  'What Is SHEQ Software? A Complete Guide to Modern SHEQ Management Systems',
  'ISO 31000 vs COSO: Key ERM Framework Differences',
  'Integrated Management System Software for Modern Compliance',
  'Environmental Compliance Software for Regulatory Management',
  'Double Materiality in ESG',
  'Streamlining ISO 27001 Compliance Digitally',
  'Simplifying ESG Reporting Through Centralised Environmental Data',
  'From Compliance to Zero Harm: Transforming Mine Safety Digitally',
  'Strengthening HACCP and ISO 22000 Through Digital Food Safety Governance',
  'How XGRC® GRC Solutions Support Mining Indaba 2026 Objectives',
  'Building a Cyber Aware Culture: Addressing the Human Element of Cyber'
];

export const resources = [
  { type: 'Booklet', title: 'SHEQX® Booklet', note: 'PDF overview of the SHEQ management solution.' },
  { type: 'Brochure', title: 'Integrated Assurance Brochure', note: 'Combined assurance and four lines of defence.' },
  { type: 'Infographic', title: 'Product infographics', note: 'One-page summaries for SHEQX, ENVIRX, MSXCyber, ERM, MAIA, ESG, Compliance Hub, Cyber Security and Hakware.' },
  { type: 'Release notes', title: 'Platform release notes', note: 'Latest feature and security updates across the XGRC® platform.' }
];

// About — vertical timeline. Founded 2015. Fill in the real milestones.
export const milestones = [
  { year: '2015', title: 'XGRC Software founded', body: 'Strategix launches XGRC® to unify governance, risk and compliance on one auditable platform.' },
  { year: '2017', title: 'Milestone to add', body: 'Placeholder. Add a milestone for these years.' },
  { year: '2019', title: 'Milestone to add', body: 'Placeholder. Add a milestone for these years.' },
  { year: '2021', title: 'Milestone to add', body: 'Placeholder. Add a milestone for these years.' },
  { year: '2023', title: 'ISO 27001:2022 certification', body: 'The XGRC® platform certified to ISO 27001:2022 for information security management.' },
  { year: '2025', title: 'Milestone to add', body: 'Placeholder. Add a recent milestone.' },
  { year: '2026', title: 'Milestone to add', body: 'Placeholder for the latest chapter.' }
];

// About — "humans behind the code". 21 people, name + superpower.
// Replace names and superpowers when ready.
export const people = Array.from({ length: 21 }, (_, i) => ({
  name: 'Team Member ' + String(i + 1).padStart(2, '0'),
  superpower: 'Superpower to add'
}));

export const offices = [
  { city: 'Johannesburg', address: 'First Floor, York House, Tybalt Place, Waterfall Park, Bekker Rd, Midrand, 1685', phone: '+27 (0)87 802 0179' },
  { city: 'Cape Town', address: '7th Floor, The Cliffs, Niagara Road, Tyger Falls, Off Carl Cronje Drive, Tygervalley, Cape Town, 7530', phone: 'Deneys +27 82 336 9915 / Craig +27 84 660 6699' },
  { city: 'United Kingdom', address: 'Regus Milton Keynes, Atterbury Lakes, Fairbourne Drive, Milton Keynes, MK10 9RG', phone: '+44 161 706 1345' }
];
