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
  { label: 'Solutions', href: '/solutions' },
  { label: 'Use Cases', href: '/use-cases' },
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
  { sector: 'Mining & infrastructure', names: ['Fraser Alexander', 'Gap Infrastructure Corporation', 'Sandton Plant Hire', 'African Rainbow Minerals', 'Rosh Pinah Zinc Corporation', 'Siyanda Bakgatla Platinum Mine'] },
  { sector: 'Manufacturing & industrial', names: ['Trident S.A.', 'PG Bison', 'PG Glass', 'Pandrol', 'Helukabel', 'Astec Industries'] },
  { sector: 'Steel manufacturing & supply', names: ['Trident Steel', 'Scaw Metals Group', 'Isilo Steel', 'Qinisa Steel Solutions', 'Steel & Pipes for Africa'] },
  { sector: 'Holding & investment groups', names: ['KAP Ltd', 'African Rainbow Minerals', 'Mesure Holdings', 'Commercial Cold Holdings', 'Motseng Holdings'] },
  { sector: 'Facilities, pharma & waste', names: ['Servest', 'Bidvest Steiner', 'Tsebo Solutions Group', 'Interwaste Holdings', 'Supercare by Empact Group', 'The Pple Group', 'Avacare Health Group'] },
  { sector: 'Food & agriculture', names: ['RCL Foods', 'Woodlands Dairy', 'AFGRI', 'Overberg Agri', 'Meze Foods', 'ADM'] },
  { sector: 'Wine & fruit production', names: ['Spier Wine Farm', 'Lutzville Vineyards', "L'Ormarins Estate", 'Stellenbosch Hills', 'Letaba African Realty Trust'] },
  { sector: 'Logistics & distribution', names: ['Unitrans', 'Value Logistics', 'Kintetsu World Express', 'Hazmat Global', 'SPAR Distribution Centres', 'Morgan Cargo', 'Toyota South Africa'] },
  { sector: 'Lubricants, oil & gas', names: ['FUCHS Lubricants', 'Puregas', 'Petro Hyper', 'Vula Oils', 'OilTech Namibia'] },
  { sector: 'Science, IT & telecoms', names: ['CSIR', 'WhiteSci', 'MTC Namibia', 'Mustek', 'INHANCE Technology', 'Clinglobal'] }
];

export const caseStudies = [
  { title: 'Vican Manufacturing: Excellence in Safety, Quality, and Compliance', summary: 'A leading South African paint producer enhanced operational capability through SHEQX® and ISO 9001.', solution: 'SHEQX®' },
  { title: 'GRC Link and Maverick Holding Company collaboration', summary: 'Partner collaboration extending XGRC® reach across the GRC market.', solution: 'Partnership' }
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
