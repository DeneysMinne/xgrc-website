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
  { label: 'GRC Platform', href: '/grc-software' },
  { label: 'Solutions', href: '/solutions' },
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

// Rich solution detail data — powers /solutions/[slug] pages.
export const solutionDetails = {
  sheqx: {
    logo: '/assets/logos/solutions/sheqx.png',
    icon: '/assets/logos/solutions/icons/sheqx.png',
    screenshot: '/assets/screenshots/sheqx-dashboard.png',
    name: 'SHEQX®',
    tag: 'Safety, Health, Environment & Quality',
    headline: 'SHEQ compliance that closes actions, not just spreadsheets.',
    lede: 'SHEQX® aggregates safety, health, environment, and quality data into one auditable platform — giving you the visibility to prevent incidents, close non-conformances, and sustain ISO certification without the administrative drag.',
    challenges: [
      { title: 'Incidents tracked in email', body: 'Safety events get logged then forgotten. No closure, no pattern analysis, no learning.' },
      { title: 'ISO audits reveal surprises', body: 'Compliance gaps stay invisible until an external audit makes them official findings with deadlines attached.' },
      { title: 'Permits expire unnoticed', body: 'Legal appointments, MSDSs, and operational permits lapse because nobody owns the expiry calendar.' },
      { title: 'Actions with no accountability', body: 'Corrective actions raised, assigned, then orphaned. Months later, the same issue recurs.' },
    ],
    overview: 'SHEQX® manages the complete SHEQ lifecycle — from hazard identification and incident capture through risk treatment, compliance monitoring, and ISO-aligned audit management — across every site and business unit on one platform.',
    stats: [
      { value: '24', label: 'Modules' },
      { value: 'ISO 9001', label: '14001 · 45001' },
      { value: 'Real-time', label: 'Action tracking' },
    ],
    moduleGroups: [
      { category: 'Risk & Safety', modules: ['Incident Management', 'Risk Management', 'Emergency Preparedness', 'PPE Management', 'Medical Surveillance', 'Occupational Job Profiles'] },
      { category: 'Compliance & Legal', modules: ['Legal Requirements', 'Legal Appointments', 'Permit Management', 'MSDS Management'] },
      { category: 'Quality & Operations', modules: ['Non-Conformance Management', 'Change Management', 'Calibration', 'Objectives & Targets', 'Strategy Management'] },
      { category: 'People & Training', modules: ['Training Records', 'Employee Management', 'Stakeholder Engagement', 'Suggestions'] },
      { category: 'Oversight', modules: ['Audit Management', 'Inspection Management', 'Document Manager', 'Meeting Management', 'Action Manager'] },
    ],
    standards: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
    related: ['msx', 'erm', 'envirx'],
  },

  msx: {
    logo: '/assets/logos/solutions/msx.png',
    icon: '/assets/logos/solutions/icons/msx.png',
    screenshot: '/assets/screenshots/msx-dashboard.png',
    name: 'MSX®',
    tag: 'Integrated Management System',
    headline: 'One management system. Every ISO standard. Zero duplication.',
    lede: 'MSX® merges your governance, risk, compliance, and operational systems into one common framework — eliminating conflicting responsibilities, removing duplicated effort, and giving leadership real-time visibility across all business activities.',
    challenges: [
      { title: 'Multiple systems, multiple truths', body: 'ISO 9001, ISO 14001, and ISO 45001 managed in separate tools. The same data entered three times, never reconciled.' },
      { title: 'Improvement programmes disconnected from risk', body: 'Continual improvement initiatives tracked in isolation — no link to the risks they are supposed to address.' },
      { title: 'Board reporting takes weeks', body: 'Management performance data lives across departments, systems, and spreadsheets. Consolidation consumes more resource than the analysis.' },
      { title: 'Certification gaps only surface at audit time', body: 'Without continuous monitoring across all ISO requirements, gaps accumulate silently between certification cycles.' },
    ],
    overview: 'MSX® is the integration layer that unifies multiple ISO management system disciplines into one coordinated programme — with consistent document control, governance workflows, audit management, and performance evaluation across the organisation.',
    stats: [
      { value: '25', label: 'Modules' },
      { value: 'Multi-ISO', label: 'In one system' },
      { value: 'Continual', label: 'Improvement built in' },
    ],
    moduleGroups: [
      { category: 'Leadership & Strategy', modules: ['Leadership', 'Governance', 'Strategy & Initiatives', 'Objectives & Targets', 'Planning'] },
      { category: 'Operations & Support', modules: ['Operations', 'Support', 'Change Management', 'Communication', 'Calibration'] },
      { category: 'Performance & Improvement', modules: ['Performance Evaluation', 'Improvement', 'Event Management', 'Non-conformances'] },
      { category: 'Compliance & Assurance', modules: ['Audit Management', 'Legal Compliance', 'Legal Appointments', 'Risk Assessment', 'Inspections Management'] },
      { category: 'People & Documentation', modules: ['Training', 'Stakeholder Engagement', 'Document Manager', 'Document Template Control', 'Meeting Manager'] },
    ],
    standards: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 22000'],
    related: ['sheqx', 'erm', 'integrated-assurance'],
  },

  msxcyber: {
    logo: '/assets/logos/solutions/msxcyber.png',
    icon: '/assets/logos/solutions/icons/msxcyber.png',
    screenshot: '/assets/screenshots/msxcyber-dashboard.png',
    name: 'MSXCyber',
    tag: 'Information Security Governance',
    headline: 'ISO 27001 compliance without the spreadsheet chaos.',
    lede: 'MSXCyber delivers a complete Information Security Management System aligned to ISO 27001:2022 — with governance, risk management, and audit-ready evidence built in from day one. The average South African data breach costs R32.36 million. Structured ISMS governance is no longer optional.',
    challenges: [
      { title: 'ISO 27001 gaps only found at audit', body: 'Without continuous monitoring, control weaknesses accumulate quietly between certification reviews.' },
      { title: 'Asset inventories in spreadsheets', body: 'Assets undocumented, risks unassessed. One security incident reveals just how fragile the inventory actually is.' },
      { title: 'No structured incident response', body: 'When a breach occurs, the response is improvised. Regulatory disclosure obligations are missed. Costs escalate.' },
      { title: 'GDPR and POPIA obligations untracked', body: 'Data protection compliance managed through email threads — no evidence trail, no audit readiness.' },
    ],
    overview: 'MSXCyber implements the full plan-do-check-act cycle for information security — from asset registration and risk assessment through control implementation, incident management, internal audit, and management review — on a single governed platform.',
    stats: [
      { value: 'R32.36m', label: 'Average SA breach cost' },
      { value: 'ISO 27001', label: ':2022 Certified' },
      { value: '20+', label: 'Modules' },
    ],
    moduleGroups: [
      { category: 'Security Operations', modules: ['Asset Register', 'Monitoring', 'Inspections', 'Broadcasting', 'Event Management'] },
      { category: 'Risk & Controls', modules: ['Risk Assessments', 'Non-Conformances', 'Change Management', 'Strategies'] },
      { category: 'Governance & Compliance', modules: ['Audits', 'Document Control', 'Legal Compliance', 'Objectives & Targets'] },
      { category: 'People & Communication', modules: ['Training', 'Stakeholder Management', 'Meeting Manager'] },
    ],
    standards: ['ISO 27001:2022', 'GDPR', 'POPIA', 'NIS Directive'],
    related: ['msx', 'erm', 'maia'],
  },

  erm: {
    logo: '/assets/logos/solutions/erm.png',
    icon: '/assets/logos/solutions/icons/erm.png',
    screenshot: '/assets/screenshots/erm-dashboard-new.png',
    name: 'Enterprise Risk Management',
    tag: 'Enterprise Risk Intelligence',
    headline: 'Risk managed at enterprise scale, not spreadsheet scale.',
    lede: 'A structured, auditable approach to enterprise, operational, and project risk — aligned to ISO 31000 and COSO ERM — with board-level dashboards, risk appetite monitoring, and corrective action tracking built in.',
    challenges: [
      { title: 'Risk registers nobody maintains', body: 'Annual reviews produce impressive registers that are outdated before they are presented. Residual risk is never re-assessed.' },
      { title: 'Risk appetite defined, but not enforced', body: 'The board sets appetite thresholds. Operational decisions ignore them. There is no mechanism to detect or escalate breaches.' },
      { title: 'KRIs reported in isolation', body: 'Key risk indicators tracked separately from the risks they monitor. Early warning signals go unnoticed until they become incidents.' },
      { title: 'Risk and assurance disconnected', body: 'The audit plan bears no relationship to the risk register. High-risk areas go unaudited. Low-risk areas receive excess coverage.' },
    ],
    overview: 'XGRC® ERM provides a complete enterprise risk management platform — from risk identification and appetite-setting through treatment planning, KRI monitoring, and board-level reporting — with every element linked to governance, controls, and assurance.',
    stats: [
      { value: 'ISO 31000', label: '& COSO ERM' },
      { value: 'Real-time', label: 'Board dashboards' },
      { value: 'Full', label: 'Assurance linkage' },
    ],
    moduleGroups: [
      { category: 'Risk Identification', modules: ['Risk Register', 'Risk Categorisation', 'Emerging Risk Tracking', 'Risk Event Capture'] },
      { category: 'Assessment & Appetite', modules: ['Likelihood & Impact Scoring', 'Risk Appetite Thresholds', 'Tolerance Monitoring', 'Heat Map Visualisation'] },
      { category: 'Treatment & Action', modules: ['Treatment Plans', 'Action Accountability', 'Escalation & Breach Alerts', 'Residual Risk Tracking'] },
      { category: 'Monitoring & Reporting', modules: ['KRI Monitoring', 'Board Dashboards', 'Management Reporting', 'Trend Analysis'] },
    ],
    standards: ['ISO 31000', 'COSO ERM', 'King V', 'IFRS'],
    related: ['integrated-assurance', 'msx', 'msxcyber'],
  },

  'integrated-assurance': {
    logo: '/assets/logos/solutions/integrated-assurance.png',
    icon: '/assets/logos/solutions/icons/integrated-assurance.png',
    screenshot: '/assets/screenshots/integrated-assurance-dashboard.png',
    name: 'Integrated Assurance',
    tag: 'Internal Audit & Combined Assurance',
    headline: 'One audit plan. Four lines of defence. Zero gaps.',
    lede: 'Coordinate internal audit and combined assurance across your organisation — linked directly to risks, controls, and corrective actions — so every line of defence operates from the same picture of what needs assurance.',
    challenges: [
      { title: 'Audit findings that do not close risks', body: 'Internal audit operates independently from the risk register. Findings are raised, management responds, risks stay open.' },
      { title: 'Combined assurance maps in PowerPoint', body: 'Outdated the moment they are presented. Nobody knows who is providing assurance over which risks until the board asks.' },
      { title: 'Coverage gaps and duplication', body: 'High-risk areas receive no audit attention. Low-risk areas audited three times by different lines. Nobody has a consolidated view.' },
      { title: 'Reactive audit planning', body: 'Annual plans built from intuition and last year\'s plan, not from the current risk landscape. Emerging risks go unaudited.' },
    ],
    overview: 'XGRC® Integrated Assurance manages the complete internal audit lifecycle — from risk-based planning and fieldwork through findings management, corrective actions, and board reporting — with a combined assurance matrix that maps every assurance provider to the risks they cover.',
    stats: [
      { value: '4', label: 'Lines of defence' },
      { value: 'Risk-based', label: 'Audit planning' },
      { value: 'Live', label: 'Assurance matrix' },
    ],
    moduleGroups: [
      { category: 'Planning', modules: ['Risk-Based Audit Planning', 'Annual Audit Schedule', 'Resource & Capacity Planning', 'Scope Definition'] },
      { category: 'Fieldwork', modules: ['Audit Programme Management', 'Evidence Capture', 'Interview & Testing Records', 'Working Papers'] },
      { category: 'Findings & Actions', modules: ['Finding Ratings & Classification', 'Management Response Tracking', 'Corrective Action Plans', 'Follow-up & Closure'] },
      { category: 'Combined Assurance', modules: ['Four Lines of Defence Map', 'Combined Assurance Matrix', 'Assurance Coverage Analytics', 'Board & Audit Committee Reporting'] },
    ],
    standards: ['IIA Standards', 'ISO 19011', 'King V', 'PFMA'],
    related: ['erm', 'msx', 'msxcyber'],
  },

  envirx: {
    logo: '/assets/logos/solutions/envirx.png',
    icon: '/assets/logos/solutions/icons/envirx.png',
    screenshot: '/assets/screenshots/envirx-dashboard.png',
    name: 'ENVIRX®',
    tag: 'Environmental Compliance & Monitoring',
    headline: 'Environmental compliance you can demonstrate, not just claim.',
    lede: 'ENVIRX® captures, tracks, and reports environmental performance data — from waste and water to air quality and energy consumption — in a single auditable system aligned to ISO 14001 and local environmental legislation.',
    challenges: [
      { title: 'Monitoring data scattered across sites', body: 'Each facility tracks environmental data differently. Consolidated reporting requires weeks of manual reconciliation.' },
      { title: 'Regulatory inspections reveal unrecorded incidents', body: 'Environmental events that were informally dealt with on-site become formal non-compliances when an inspector asks for the evidence.' },
      { title: 'Targets set but not monitored', body: 'Reduction commitments made to stakeholders and regulators. Progress is invisible until the annual sustainability report.' },
      { title: 'Legal requirements change faster than compliance registers', body: 'Environmental legislation is updated continuously. Manual tracking cannot keep pace.' },
    ],
    overview: 'ENVIRX® manages the complete environmental compliance and performance programme — from legal obligation tracking and environmental monitoring data capture through incident reporting, objectives management, and regulatory reporting — all linked to your ISO 14001 management system.',
    stats: [
      { value: 'ISO 14001', label: 'Aligned' },
      { value: 'Multi-site', label: 'Monitoring' },
      { value: 'Continuous', label: 'Legal tracking' },
    ],
    moduleGroups: [
      { category: 'Environmental Monitoring', modules: ['Environmental Monitoring', 'Air Quality Monitoring', 'Noise Monitoring', 'Water Quality Monitoring', 'Biodiversity Monitoring', 'Surface Area Change Monitoring', 'Material Flows', 'Energy Monitoring'] },
      { category: 'Compliance & Legal', modules: ['Legal Compliance', 'Objectives & Targets', 'Strategy & Initiatives', 'Document Manager', 'Communication', 'Stakeholder Engagement'] },
      { category: 'Operations & Governance', modules: ['Governance', 'Leadership', 'Planning', 'Support', 'Operations', 'Calibration', 'Inspections Management'] },
      { category: 'Performance & Improvement', modules: ['Performance Evaluation', 'Improvement', 'Risk Assessment', 'Event Management', 'Non-Conformances', 'Audit Management'] },
    ],
    standards: ['ISO 14001', 'NEMA', 'King V', 'GHG Protocol'],
    related: ['sheqx', 'esg', 'msx'],
  },

  esg: {
    logo: '/assets/logos/solutions/esg.png',
    icon: '/assets/logos/solutions/icons/esg.png',
    screenshot: '/assets/screenshots/esg-dashboard.png',
    name: 'ESG',
    tag: 'Environmental, Social & Governance Reporting',
    headline: 'ESG reporting that survives investor scrutiny.',
    lede: 'Collect, manage, and report ESG data in a structured, auditable way — aligned to GRI, IFRS S1/S2, and CDP — so your sustainability disclosures are backed by evidence, not just intention.',
    challenges: [
      { title: 'Disclosures built on unverifiable data', body: 'ESG reports assembled from manually collected spreadsheets. Investors and auditors increasingly ask for evidence. Evidence is not there.' },
      { title: 'Questionnaires that take weeks to complete', body: 'Investor ESG questionnaires arrive and the search begins. Data is scattered, definitions differ by site, nobody owns the numbers.' },
      { title: 'Targets without audit trails', body: 'Net-zero commitments and social targets made publicly. Progress tracked informally. Assurance providers have nothing to work with.' },
      { title: 'Regulatory disclosure obligations missed', body: 'IFRS S1 and S2 requirements are expanding. Organisations without structured ESG data collection cannot comply in time.' },
    ],
    overview: 'XGRC® ESG provides a structured platform for collecting, managing, and reporting environmental, social, and governance data across the organisation — with multi-framework alignment, Scope 1/2/3 emissions tracking, and assurance-ready audit trails.',
    stats: [
      { value: 'GRI', label: '& IFRS S1/S2' },
      { value: 'Scope 1·2·3', label: 'Emissions tracking' },
      { value: 'Assurance', label: 'Ready' },
    ],
    moduleGroups: [
      { category: 'Context & Strategy', modules: ['Materiality Assessment', 'ESG Strategy', 'Stakeholder Engagement', 'Business Strategy Alignment', 'Objectives & Targets', 'Indicator Thresholds'] },
      { category: 'Environmental', modules: ['Scope 1, 2 & 3 Emissions', 'Energy Monitoring', 'Water & Waste Management', 'Biodiversity Records', 'Climate Risk Register'] },
      { category: 'Social & Governance', modules: ['Employee Health & Safety Data', 'Training & Development Records', 'Board Composition & Diversity', 'Anti-corruption Policies', 'Ethics & Conduct Records'] },
      { category: 'Reporting & Assurance', modules: ['GRI Index Compilation', 'IFRS S1/S2 Alignment', 'IIRC Integrated Reporting', 'CDP Disclosure Support', 'SDG Alignment', 'Audit Trail & Evidence Repository', 'Automated Report Configuration'] },
    ],
    standards: ['GRI Standards', 'IFRS S1 & S2', 'CDP', 'ISO 14001', 'IIRC 6 Capitals', 'King V', 'UN SDGs', 'JSE Sustainability'],
    related: ['envirx', 'integrated-assurance', 'msx'],
  },

  'compliance-hub': {
    logo: '/assets/logos/solutions/compliance-hub.png',
    icon: '/assets/logos/solutions/icons/compliance-hub.png',
    screenshot: '/assets/screenshots/compliance-hub-dashboard.png',
    name: 'XGRC® Compliance Hub',
    tag: 'Supplier & Third-Party Compliance',
    headline: 'Your supply chain\'s compliance posture, visible in real time.',
    lede: 'Structured onboarding, vetting, and ongoing compliance management for suppliers, contractors, and third parties — with automated document expiry tracking, risk scoring, and compliance dashboards that give you a live view of your entire supply chain.',
    challenges: [
      { title: 'Certificates expire without warning', body: 'Supplier documents managed through email. Nobody owns the expiry calendar. A non-compliant contractor arrives on site.' },
      { title: 'Onboarding takes weeks', body: 'Manual verification, back-and-forth emails, documents in different formats. High-risk contractors cleared faster than low-risk ones because nobody applied the same standard.' },
      { title: 'No real-time supply chain view', body: 'You cannot answer the question "which of our active contractors are currently compliant?" without running a spreadsheet exercise.' },
      { title: 'Incidents reveal undiscovered gaps', body: 'A site incident exposes a contractor whose safety certification lapsed three months ago. Nobody noticed.' },
    ],
    overview: 'XGRC® Compliance Hub provides a structured portal for supplier and contractor onboarding, document verification, and ongoing compliance monitoring — with automated expiry alerts, risk-based scoring, and real-time dashboards that replace email-based compliance management.',
    stats: [
      { value: 'Automated', label: 'Expiry alerts' },
      { value: 'Risk-scored', label: 'Suppliers' },
      { value: 'Real-time', label: 'Compliance view' },
    ],
    moduleGroups: [
      { category: 'Onboarding', modules: ['Supplier Registration Portal', 'Document Upload & Verification', 'Vetting Workflows', 'Approval & Rejection Management'] },
      { category: 'Ongoing Compliance', modules: ['Document Expiry Tracking', 'Automated Renewal Alerts', 'Compliance Status Dashboards', 'Audit-Ready Evidence Store'] },
      { category: 'Risk Management', modules: ['Supplier Risk Scoring', 'Risk-Based Monitoring Frequency', 'Non-Compliance Escalation', 'Performance Ratings'] },
      { category: 'Reporting', modules: ['Compliance Summary Reports', 'Expiry Calendars', 'Supplier Performance Analytics', 'Regulatory Disclosure Support'] },
    ],
    standards: ['ISO 9001', 'ISO 45001', 'POPIA', 'B-BBEE'],
    related: ['sheqx', 'xlogic', 'msx'],
  },

  xlogic: {
    logo: '/assets/logos/solutions/xlogic.png',
    icon: '/assets/logos/solutions/icons/xlogic.png',
    screenshot: '/assets/screenshots/xlogic-dashboard.png',
    name: 'XLOGIC®',
    tag: 'Governance Execution',
    headline: 'Policies that work. Controls that are actually enforced.',
    lede: 'XLOGIC® converts governance frameworks, policies, and controls into structured, enforceable workflows — so compliance is built into how work gets done, not bolted on afterwards through audits.',
    challenges: [
      { title: 'Policies approved and filed, never operationalised', body: 'Documents are published. Employees are notified. Controls are never implemented. The gap between policy and practice grows with every update.' },
      { title: 'Frameworks defined at board level, disconnected from operations', body: 'Governance structures documented in reports. Day-to-day operations run on institutional knowledge, habit, and workarounds.' },
      { title: 'Evidence collected reactively', body: 'Compliance evidence gathered when an audit is announced, not continuously as work is performed. Evidence quality reflects urgency, not accuracy.' },
      { title: 'Controls that exist on paper only', body: 'Internal audit reveals controls that are documented but not operating effectively. Management responses are familiar words.' },
    ],
    overview: 'XLOGIC® is the governance execution layer — it takes the policies, frameworks, and controls defined in XGRC® and converts them into structured workflows with accountability, evidence capture, and continuous compliance monitoring built in.',
    stats: [
      { value: 'Policy-to', label: 'Workflow conversion' },
      { value: 'Continuous', label: 'Evidence capture' },
      { value: 'Full', label: 'Audit trail' },
    ],
    moduleGroups: [
      { category: 'Policy Operationalisation', modules: ['Policy-to-Workflow Conversion', 'Control Implementation Tracking', 'Responsibility Assignment', 'Acknowledgement & Signoff'] },
      { category: 'Evidence & Compliance', modules: ['Continuous Evidence Collection', 'Compliance Monitoring Dashboards', 'Control Effectiveness Tracking', 'Audit-Ready Evidence Repository'] },
      { category: 'Governance Architecture', modules: ['Framework Mapping', 'Obligation-to-Control Linkage', 'Governance Calendar', 'Accountability Structures'] },
    ],
    standards: ['King V', 'ISO 9001', 'ISO 27001', 'COSO'],
    related: ['msx', 'erm', 'integrated-assurance'],
  },

  maia: {
    logo: '/assets/logos/solutions/maia.png',
    icon: '/assets/logos/solutions/icons/maia.png',
    screenshot: '/assets/screenshots/maia-dashboard.png',
    name: 'MAIA',
    tag: 'Governed AI for GRC',
    headline: 'The intelligence of governance, without leaving your boundaries.',
    lede: 'Master Artificial Intelligence Archetype — governed AI embedded within XGRC® that enhances how decision-makers interact with governance records, risks, policies, and compliance data. Faster insight. Better decisions. Full auditability. Zero data leaving your governance environment.',
    challenges: [
      { title: 'Answers take days, not minutes', body: 'A board member asks about residual risk in a business unit. The risk manager spends two days compiling a response from multiple systems.' },
      { title: 'Governance records exist but are inaccessible', body: 'Policies, risk registers, audit findings, and compliance records accumulated over years. Too dense, too fragmented for rapid insight generation.' },
      { title: 'AI tools that create new governance risk', body: 'Generic AI tools access external data, store queries, and operate outside organisational boundaries. Using them for governance decisions creates the risk they are supposed to reduce.' },
      { title: 'Strategic decisions disconnected from operational risk data', body: 'Leadership makes decisions without a live view of the risk and compliance posture. The data exists. Nobody can access it fast enough to matter.' },
    ],
    overview: 'MAIA is governed AI embedded within the XGRC® platform — operating exclusively on your organisation\'s governance data, with full auditability of every AI interaction, delivering rapid insight generation across risk, compliance, policy, and audit records without exposing data externally.',
    stats: [
      { value: 'Zero', label: 'External data exposure' },
      { value: 'Full', label: 'AI audit trail' },
      { value: 'Live', label: 'Governance intelligence' },
    ],
    moduleGroups: [
      { category: 'Governance Intelligence', modules: ['Natural Language Risk Queries', 'Policy & Procedure Q&A', 'Compliance Status Summaries', 'Regulatory Change Impact Analysis', 'ESG & SHERQ Insight Engine'] },
      { category: 'DAVE — Data Integration', modules: ['API Data Connections', 'IoT Device Data', 'Microsoft Power BI', 'Microsoft Power Apps', 'Azure & PowerAutomate', 'XGRC Platform Data', 'Custom Data Requirements'] },
      { category: 'LUCI — AI Interface', modules: ['DataViews & ML Dashboards', 'Predictive Maintenance AI', 'H&S Assistant Agent', 'Driver Fatigue Monitoring', 'Process Automation Bots', 'Voice Mode Interface'] },
      { category: 'Governed AI Architecture', modules: ['Data Boundary Enforcement', 'AI Interaction Audit Trail', 'User Permission Alignment', 'Explainable AI Outputs', 'ChatGPT & Azure Integration'] },
    ],
    standards: ['ISO 42001', 'ISO 27001', 'ISO 31000', 'ISO 45001', 'GDPR', 'POPIA'],
    related: ['erm', 'integrated-assurance', 'msxcyber'],
  },
};

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
