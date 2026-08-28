// =============================================================================
// XGRC Software — site content.
// Edit copy here once and it flows through every page.
// Sourced from the live xgrcsoftware.com scrape (June 2026).
// =============================================================================

export const brand = {
  name: 'XGRC® Software',
  tagline: 'Synergy in Assurance, Strength in Compliance®',
  promise: 'Driving Compliance® within your organisation',
  email: 'info@xgrcsoftware.com',
  phone: '+27 (0)87 802 0179'
};

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/xgrcsoftware/' },
  { name: 'Facebook', url: 'https://web.facebook.com/XGRCSoftware' },
  { name: 'Instagram', url: 'https://www.instagram.com/xgrcsoftware/' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UC1I4pi7CFdYWjlqkehZDb2Q' },
];

// Primary navigation. Strategix routes to the internal capability page.
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'GRC Platform', href: '/grc-software' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Customers', href: '/customers' },
  { label: 'Resources', href: '/resources' },
  { label: 'Insights', href: '/insights' },
  { label: 'Trust Centre', href: '/trust' },
  { label: 'About Us', href: '/about' },
  { label: 'Strategix', href: '/strategix' }
];

export const pillars = [
  { name: 'Governance', body: 'The management processes that enable effective decision making to ensure an organisation achieves its goals.' },
  { name: 'Risk', body: 'Setting acceptable enterprise risk thresholds, then analysing, tracking, and mitigating potential issues to ensure the appropriate risk level is met.' },
  { name: 'Compliance', body: 'Conforming with external rules and regulations and internally defined directives and standards.' },
  { name: 'Sustainability', body: 'A robust, proactive approach to corporate sustainability with effective monitoring of the latest legislation and regulations.' }
];

// The real public solution suite (BCMX and PIX retired / not in use).
export const solutions = [
  { name: 'MSX®', slug: 'msx', tag: 'Management system', blurb: 'A flexible, integrated hub that unifies multiple XGRC® disciplines into one coordinated management system.' },
  { name: 'MSXCyber®', slug: 'msxcyber', tag: 'Information security', blurb: 'ISMS support aligned to ISO 27001, with governance, risk management, and audit-ready evidence for cybersecurity programmes.' },
  { name: 'ESG', slug: 'esg', tag: 'Sustainability', blurb: 'Management of ESG data and governance processes for consistent reporting, traceability, and assurance across sustainability initiatives.' },
  { name: 'SHEQX®', slug: 'sheqx', tag: 'Safety & quality', blurb: 'Management of SHEQ risks, incidents, audits, actions and compliance aligned to ISO 9001, ISO 14001 and ISO 45001.' },
  { name: 'Enterprise Risk Management', slug: 'erm', tag: 'Risk', blurb: 'A structured, auditable approach to enterprise, operational, and project risk aligned to ISO 31000 and COSO.' },
  { name: 'Integrated Assurance', slug: 'integrated-assurance', tag: 'Assurance', blurb: 'Coordination of internal audit and combined assurance, linked directly to risks, controls, and actions.' },
  { name: 'ENVIRX®', slug: 'envirx', tag: 'Environmental', blurb: 'Environmental compliance and performance monitoring with auditable environmental records.' },
  { name: 'XGRC® Compliance Hub', slug: 'compliance-hub', tag: 'Third-party', blurb: 'Supplier, contractor, and third-party compliance through structured onboarding, vetting, and ongoing assurance.', available: true },
  { name: 'XLOGIC®', slug: 'xlogic', tag: 'Governance Execution', blurb: 'Converts policies, frameworks, controls and obligations into structured workflows with accountability, evidence capture and auditability.', available: true },
  { name: 'MAIA®', slug: 'maia', tag: 'Governed AI', blurb: 'Governed AI for GRC, combining business intelligence, data views and intelligent agents, with a full AI interaction audit trail.' },
  { name: 'Libryo', slug: 'libryo', tag: 'Partner', blurb: 'Jurisdiction-specific regulatory intelligence embedded directly within XGRC®.', partner: true },
  { name: 'Hakware', slug: 'hakware', tag: 'Partner', blurb: 'AI-powered penetration testing and unified vulnerability visibility across your environment.', partner: true },
  { name: 'XRM', slug: 'xrm', tag: 'Sales & CRM', blurb: 'A structured, auditable CRM for leads, opportunities, quotes and customer relationships, built with the same governance discipline as the rest of XGRC® Software.' }
];

// Rich solution detail data — powers /solutions/[slug] pages.
export const solutionDetails = {
  sheqx: {
    infographic: '/assets/infographics/sheqx-infographic-v3.pdf',
    booklet: '/resources/xgrc-sheqx-booklet.pdf',
    logo: '/assets/logos/solutions/sheqx.png',
    icon: '/assets/logos/solutions/icons/sheqx.png',
    screenshot: '/assets/screenshots/sheqx-dashboard.webp',
    youtubeId: 'hW3EPWIKj9s',
    name: 'SHEQX®',
    tag: 'Safety, Health, Environment & Quality',
    metaTitle: 'SHEQ Software for Safety, Health, Environment & Quality | SHEQX® — XGRC®',
    headline: 'SHEQ compliance that closes actions, not just spreadsheets.',
    lede: 'SHEQX® aggregates safety, health, environment, and quality data into one auditable platform, giving you the visibility to prevent incidents, close non-conformances, and sustain ISO certification without the administrative drag.',
    metaDescription: 'SHEQX® unifies safety, health, environment and quality on one auditable platform, aligned to ISO 9001, 14001 and 45001 to prevent incidents and close actions.',
    challenges: [
      { title: 'Incidents tracked in email', body: 'Safety events get logged then forgotten. No closure, no pattern analysis, no learning.' },
      { title: 'ISO audits reveal surprises', body: 'Compliance gaps stay invisible until an external audit makes them official findings with deadlines attached.' },
      { title: 'Permits expire unnoticed', body: 'Legal appointments, MSDSs, and operational permits lapse because nobody owns the expiry calendar.' },
      { title: 'Actions with no accountability', body: 'Corrective actions raised, assigned, then orphaned. Months later, the same issue recurs.' },
    ],
    overview: 'SHEQX® manages the complete SHEQ lifecycle, from hazard identification and incident capture through risk treatment, compliance monitoring, and ISO-aligned audit management, across every site and business unit on one platform.',
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
    testimonialCompanies: ['Servest', 'Interwaste', 'Sandton Plant Hire'],
    regionalLink: { href: '/sheq-software-south-africa/', label: 'SHEQ software in South Africa' },
    geo: {
      definition: 'SHEQ management software helps organisations manage safety, health, environmental and quality processes through structured workflows, auditable records, incident tracking, inspections, audits and compliance monitoring.',
      usage: 'Organisations typically adopt SHEQX® when safety incidents, non-conformances and ISO audit evidence are still scattered across email, spreadsheets and paper forms, and leadership needs one auditable view of SHEQ performance across multiple sites. SHEQX® is the Safety, Health, Environment and Quality solution within XGRC® Software, it connects SHEQ risks, incidents, audits, actions and compliance obligations to the same secure data foundation used across risk, assurance, compliance, ESG and environmental monitoring.',
      notThis: 'SHEQX® is not a standalone incident logbook or a generic form-builder. It is a full SHEQ management system that stays connected to XGRC®\'s wider risk, compliance and assurance data, usable on its own or alongside other XGRC® solutions such as MSX®, ERM or ENVIRX®.',
      faqs: [
        { q: 'What is SHEQX® used for?', a: 'SHEQX® manages the complete SHEQ lifecycle, hazard identification, incident capture, risk treatment, permits, inspections, audits and corrective actions, across every site and business unit on one platform.' },
        { q: 'Which ISO standards does SHEQX® support?', a: 'SHEQX® is aligned to ISO 9001, ISO 14001 and ISO 45001, with modules for legal compliance, permit management and ISO-aligned audit management.' },
        { q: 'Can SHEQX® be used without MSX®?', a: 'Yes. SHEQX® is a standalone solution that runs on its own; MSX® is an optional integrated programme for organisations that want multiple management-system disciplines coordinated together.' },
        { q: 'Can SHEQX® connect to ERM and ENVIRX®?', a: 'Yes. SHEQX® shares the same XGRC® data foundation as ERM and ENVIRX®, so SHEQ risks, environmental data and enterprise risk stay linked rather than duplicated across systems.' },
      ],
    },
  },

  msx: {
    infographic: '/assets/infographics/msx-infographic-v3.pdf',
    logo: '/assets/logos/solutions/msx.png',
    icon: '/assets/logos/solutions/icons/msx.png',
    screenshot: '/assets/screenshots/msx-dashboard.webp',
    name: 'MSX®',
    tag: 'Integrated Management System',
    headline: 'One management system. Multiple standards. Less duplicated effort.',
    lede: 'MSX® merges your governance, risk, compliance, and operational systems into one common framework, eliminating conflicting responsibilities, removing duplicated effort, and giving leadership real-time visibility across all business activities.',
    metaDescription: 'MSX® merges governance, risk, compliance and operational systems into one common framework, removing conflicting responsibilities and duplicated compliance effort.',
    challenges: [
      { title: 'Multiple systems, multiple truths', body: 'ISO 9001, ISO 14001, and ISO 45001 managed in separate tools. The same data entered three times, never reconciled.' },
      { title: 'Improvement programmes disconnected from risk', body: 'Continual improvement initiatives tracked in isolation, no link to the risks they are supposed to address.' },
      { title: 'Board reporting takes weeks', body: 'Management performance data lives across departments, systems, and spreadsheets. Consolidation consumes more resource than the analysis.' },
      { title: 'Certification gaps only surface at audit time', body: 'Without continuous monitoring across all ISO requirements, gaps accumulate silently between certification cycles.' },
    ],
    overview: 'MSX® is the integration layer that unifies multiple ISO management system disciplines into one coordinated programme, with consistent document control, governance workflows, audit management, and performance evaluation across the organisation.',
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
    geo: {
      definition: 'MSX® is an integrated programme option within XGRC® Software. It packages selected governance, risk, compliance and management system capabilities into one coordinated programme for organisations that want multiple disciplines implemented together.',
      usage: 'Organisations typically adopt MSX® once they are running two or more XGRC® solutions, such as SHEQX®, ERM or MSXCyber®, and want a single coordinated programme with shared document control, governance workflows and performance evaluation, instead of managing each discipline in isolation.',
      notThis: 'MSX® is not required to use XGRC® Software. Organisations can start with individual solutions such as SHEQX®, ERM, MSXCyber®, ENVIRX®, ESG or MAIA® and move to a broader integrated programme later.',
      faqs: [
        { q: 'Do I need MSX® to use other XGRC® solutions?', a: 'No. Every XGRC® solution runs independently. MSX® is an optional integration layer for organisations coordinating multiple disciplines together.' },
        { q: 'Which ISO standards does MSX® cover?', a: 'MSX® supports ISO 9001, ISO 14001, ISO 45001 and ISO 22000 within one coordinated management system.' },
        { q: 'What\'s the difference between MSX® and a single solution like SHEQX®?', a: 'SHEQX® manages one discipline (SHEQ) in full depth. MSX® coordinates governance, risk, compliance and operational disciplines together under one programme, sharing document control and reporting.' },
        { q: 'Can we start with MSX® and add solutions later?', a: 'Yes. MSX® is designed for modular adoption: start with the disciplines you need now and expand without migrating data or rebuilding processes.' },
      ],
    },
  },

  msxcyber: {
    infographic: '/assets/infographics/msxcyber-infographic-v3.pdf',
    booklet: '/resources/xgrc-cyber-security-booklet.pdf',
    logo: '/assets/logos/solutions/msxcyber.png',
    icon: '/assets/logos/solutions/icons/msxcyber.png',
    screenshot: '/assets/screenshots/msxcyber-dashboard.webp',
    youtubeId: '5hZX0WIebCo',
    name: 'MSXCyber®',
    tag: 'Information Security Governance',
    headline: 'ISO 27001 compliance without the spreadsheet chaos.',
    lede: 'MSXCyber® delivers a complete Information Security Management System aligned to ISO 27001:2022, with governance, risk management, and audit-ready evidence built in from day one. Data breaches now carry material financial, regulatory and operational consequences. Structured ISMS governance is no longer optional.',
    metaDescription: 'MSXCyber® is a complete Information Security Management System aligned to ISO 27001:2022, with governance, risk management and audit-ready evidence built in.',
    challenges: [
      { title: 'ISO 27001 gaps only found at audit', body: 'Without continuous monitoring, control weaknesses accumulate quietly between certification reviews.' },
      { title: 'Asset inventories in spreadsheets', body: 'Assets undocumented, risks unassessed. One security incident reveals just how fragile the inventory actually is.' },
      { title: 'No structured incident response', body: 'When a breach occurs, the response is improvised. Regulatory disclosure obligations are missed. Costs escalate.' },
      { title: 'GDPR and POPIA obligations untracked', body: 'Data protection compliance managed through email threads, no evidence trail, no audit readiness.' },
    ],
    overview: 'MSXCyber® implements the full plan-do-check-act cycle for information security, from asset registration and risk assessment through control implementation, incident management, internal audit, and management review, on a single governed platform.',
    stats: [
      { value: 'ISO 27001:2022', label: 'Aligned ISMS governance' },
      { value: '4', label: 'Standards supported' },
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
    geo: {
      definition: 'ISMS software helps organisations manage information security governance, risk assessment, controls, incidents, internal audits and evidence required to support an ISO 27001-aligned Information Security Management System.',
      usage: 'Organisations typically adopt MSXCyber® when ISO 27001 evidence, asset inventories and incident response plans are still managed through spreadsheets and email, and they need continuous, audit-ready ISMS governance rather than a scramble before each certification review.',
      notThis: 'MSXCyber® supports information security governance and ISO 27001-aligned management processes. It does not replace technical security tools such as firewalls, endpoint protection, vulnerability scanners or SIEM platforms, for offensive security testing and vulnerability scanning, XGRC® partners with Hakware.',
      faqs: [
        { q: 'Does MSXCyber® replace our firewall or antivirus software?', a: 'No. MSXCyber® governs your ISMS, risk, controls, incidents and audit evidence. It does not replace technical security tools; it governs the processes around them.' },
        { q: 'Is MSXCyber® aligned to ISO 27001:2022?', a: 'Yes. MSXCyber® implements the full plan-do-check-act cycle aligned to ISO 27001:2022, alongside GDPR, POPIA and NIS Directive requirements.' },
        { q: 'Can MSXCyber® help with GDPR and POPIA compliance?', a: 'Yes. MSXCyber® links data protection obligations, processing records and incident response to the same ISMS governance framework.' },
        { q: 'How does MSXCyber® relate to Hakware?', a: 'MSXCyber® governs your ISMS; Hakware is a partner solution that provides AI-powered penetration testing and vulnerability visibility. Findings from Hakware feed directly into MSXCyber® as governed risks and actions.' },
      ],
    },
  },

  erm: {
    infographic: '/assets/infographics/erm-infographic-v4.pdf',
    booklet: '/resources/xgrc-erm-booklet.pdf',
    logo: '/assets/logos/solutions/erm.png',
    icon: '/assets/logos/solutions/icons/erm.png',
    screenshot: '/assets/screenshots/erm-dashboard-new.webp',
    name: 'Enterprise Risk Management',
    tag: 'Enterprise Risk Intelligence',
    metaTitle: 'Enterprise Risk Management Software | XGRC®',
    headline: 'Risk managed at enterprise scale, not spreadsheet scale.',
    lede: 'A structured, auditable approach to enterprise, operational, and project risk, aligned to ISO 31000 and COSO ERM, with board-level dashboards, risk appetite monitoring, and corrective action tracking built in.',
    metaDescription: 'Enterprise risk management aligned to ISO 31000 and COSO, with board dashboards, risk appetite monitoring and a full audit trail across enterprise and project risk.',
    challenges: [
      { title: 'Risk registers nobody maintains', body: 'Annual reviews produce impressive registers that are outdated before they are presented. Residual risk is never re-assessed.' },
      { title: 'Risk appetite defined, but not enforced', body: 'The board sets appetite thresholds. Operational decisions ignore them. There is no mechanism to detect or escalate breaches.' },
      { title: 'KRIs reported in isolation', body: 'Key risk indicators tracked separately from the risks they monitor. Early warning signals go unnoticed until they become incidents.' },
      { title: 'Risk and assurance disconnected', body: 'The audit plan bears no relationship to the risk register. High-risk areas go unaudited. Low-risk areas receive excess coverage.' },
    ],
    overview: 'XGRC® ERM provides a complete enterprise risk management platform, from risk identification and appetite-setting through treatment planning, KRI monitoring, and board-level reporting, with every element linked to governance, controls, and assurance.',
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
    geo: {
      definition: 'Enterprise risk management software helps organisations identify, assess, treat, monitor and report on risks across business units, projects, strategic objectives and operational environments.',
      usage: 'Organisations typically adopt XGRC® ERM when risk registers are maintained annually in spreadsheets, risk appetite thresholds are set but not enforced, and the board has no real-time view of residual risk. The XGRC® ERM solution connects enterprise risk to controls, assurance, compliance obligations, incidents and actions within the same secure data foundation used across XGRC® Software.',
      notThis: 'ERM is not a static annual risk register exercise. It is a live risk management system with board dashboards, KRI monitoring and appetite-breach alerts, designed to stay current between review cycles, not just at them.',
      faqs: [
        { q: 'Is XGRC® ERM aligned to ISO 31000?', a: 'Yes. ERM is aligned to ISO 31000 and COSO ERM, with King V and IFRS-aligned reporting for South African organisations.' },
        { q: 'Can ERM link to our internal audit function?', a: 'Yes. ERM connects directly to Integrated Assurance, so the audit plan reflects the current risk landscape rather than last year\'s assumptions.' },
        { q: 'Does ERM support board-level reporting?', a: 'Yes. ERM includes real-time board dashboards, risk appetite monitoring and trend analysis built for board and audit committee reporting.' },
        { q: 'How is ERM different from a risk spreadsheet?', a: 'ERM keeps risk data live and linked, appetite breaches, KRI thresholds and treatment plans are monitored continuously, with full audit trails, rather than reconciled manually once a year.' },
      ],
    },
  },

  'integrated-assurance': {
    logo: '/assets/logos/solutions/integrated-assurance.png',
    icon: '/assets/logos/solutions/icons/integrated-assurance.png',
    screenshot: '/assets/screenshots/integrated-assurance-dashboard.webp',
    booklet: '/resources/xgrc-integrated-assurance-brochure.pdf',
    name: 'Integrated Assurance',
    tag: 'Internal Audit & Combined Assurance',
    headline: 'One audit plan. Four lines of defence. Zero gaps.',
    lede: 'Coordinate internal audit and combined assurance across your organisation, linked directly to risks, controls, and corrective actions, so every line of defence operates from the same picture of what needs assurance.',
    metaDescription: 'Coordinate internal audit and combined assurance, linked to risks, controls and actions, so every line of defence works from one shared view.',
    challenges: [
      { title: 'Audit findings that do not close risks', body: 'Internal audit operates independently from the risk register. Findings are raised, management responds, risks stay open.' },
      { title: 'Combined assurance maps in PowerPoint', body: 'Outdated the moment they are presented. Nobody knows who is providing assurance over which risks until the board asks.' },
      { title: 'Coverage gaps and duplication', body: 'High-risk areas receive no audit attention. Low-risk areas audited three times by different lines. Nobody has a consolidated view.' },
      { title: 'Reactive audit planning', body: 'Annual plans built from intuition and last year\'s plan, not from the current risk landscape. Emerging risks go unaudited.' },
    ],
    overview: 'XGRC® Integrated Assurance manages the complete internal audit lifecycle, from risk-based planning and fieldwork through findings management, corrective actions, and board reporting, with a combined assurance matrix that maps every assurance provider to the risks they cover.',
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
    geo: {
      definition: 'Integrated assurance software helps organisations coordinate assurance activities, internal audits, control testing, findings and corrective actions across multiple lines of defence.',
      usage: 'Organisations typically adopt Integrated Assurance when internal audit findings are raised but never closed against the risk register, combined assurance maps live in outdated slide decks, and nobody has a consolidated view of assurance coverage. Integrated Assurance links assurance activities directly to risks, controls, actions and compliance evidence within XGRC® Software.',
      notThis: 'Integrated Assurance is not a standalone audit-management tool disconnected from risk. It maintains a live combined assurance matrix mapping every assurance provider to the risks they cover, so coverage gaps and duplication are visible, not discovered at the board meeting.',
      faqs: [
        { q: 'Which standards does Integrated Assurance align to?', a: 'Integrated Assurance is aligned to IIA Standards, ISO 19011, King V and the PFMA for public sector organisations.' },
        { q: 'Does Integrated Assurance replace our internal audit team?', a: 'No. It gives your internal audit function risk-based planning, fieldwork and findings-tracking tools, the audit team still does the work, with better data and less manual reconciliation.' },
        { q: 'What is a combined assurance matrix?', a: 'It\'s a live map of every assurance provider, internal audit, risk, compliance, external audit, against the risks they cover, so coverage gaps and duplication are visible in real time, not just at year-end.' },
        { q: 'Can Integrated Assurance connect to our risk register?', a: 'Yes. Findings, corrective actions and audit coverage all link directly to the same risk register used in XGRC® ERM.' },
      ],
    },
  },

  envirx: {
    infographic: '/assets/infographics/envirx-infographic-v3.pdf',
    booklet: '/resources/xgrc-envirx-ebook.pdf',
    logo: '/assets/logos/solutions/envirx.png',
    icon: '/assets/logos/solutions/icons/envirx.png',
    screenshot: '/assets/screenshots/envirx-dashboard.webp',
    name: 'ENVIRX®',
    tag: 'Environmental Compliance & Monitoring',
    metaTitle: 'Environmental Compliance Software | ENVIRX® — XGRC®',
    headline: 'Environmental compliance you can demonstrate, not just claim.',
    lede: 'ENVIRX® captures, tracks, and reports environmental performance data, from waste and water to air quality and energy consumption, in a single auditable system aligned to ISO 14001 and local environmental legislation.',
    metaDescription: 'ENVIRX® captures, tracks and reports environmental performance data, from waste and water to air and energy, in one auditable system aligned to ISO 14001.',
    challenges: [
      { title: 'Monitoring data scattered across sites', body: 'Each facility tracks environmental data differently. Consolidated reporting requires weeks of manual reconciliation.' },
      { title: 'Regulatory inspections reveal unrecorded incidents', body: 'Environmental events that were informally dealt with on-site become formal non-compliances when an inspector asks for the evidence.' },
      { title: 'Targets set but not monitored', body: 'Reduction commitments made to stakeholders and regulators. Progress is invisible until the annual sustainability report.' },
      { title: 'Legal requirements change faster than compliance registers', body: 'Environmental legislation is updated continuously. Manual tracking cannot keep pace.' },
    ],
    overview: 'ENVIRX® manages the complete environmental compliance and performance programme, from legal obligation tracking and environmental monitoring data capture through incident reporting, objectives management, and regulatory reporting, all linked to your ISO 14001 management system.',
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
    testimonialCompanies: ['Servest', 'Interwaste', 'Commercial Cold Holdings'],
    regionalLink: { href: '/environmental-compliance-software-south-africa/', label: 'Environmental compliance software in South Africa' },
    geo: {
      definition: 'Environmental compliance software helps organisations monitor environmental performance, manage obligations, record evidence and maintain auditable environmental data across sites, operations and regulatory requirements.',
      usage: 'Organisations typically adopt ENVIRX® when environmental monitoring data is tracked differently at every site, regulatory inspections reveal incidents that were never formally recorded, and sustainability targets are reported without evidence behind them. ENVIRX® connects environmental data to risk, compliance, ESG and assurance processes within XGRC® Software, allowing environmental performance to be governed as part of the broader GRC environment.',
      notThis: 'ENVIRX® is not just an emissions spreadsheet replacement. It is a full environmental compliance and performance system, covering air, water, noise, biodiversity and energy monitoring alongside legal obligation tracking, aligned to ISO 14001 and local environmental legislation.',
      faqs: [
        { q: 'Which regulations does ENVIRX® help track?', a: 'ENVIRX® tracks environmental legal obligations aligned to ISO 14001, NEMA, King V and the GHG Protocol, with continuous updates as legislation changes.' },
        { q: 'Can ENVIRX® monitor multiple sites?', a: 'Yes. ENVIRX® consolidates environmental monitoring data, air, water, noise, biodiversity, energy, across every site into one auditable system.' },
        { q: 'Does ENVIRX® feed into our ESG reporting?', a: 'Yes. ENVIRX® shares the same data foundation as XGRC® ESG, so environmental monitoring data flows directly into sustainability disclosures without re-entry.' },
        { q: 'Is ENVIRX® aligned to ISO 14001?', a: 'Yes. ENVIRX® is built around ISO 14001 environmental management requirements, with legal compliance and audit management included.' },
      ],
    },
  },

  esg: {
    infographic: '/assets/infographics/esg-infographic-v3.pdf',
    logo: '/assets/logos/solutions/esg.png',
    icon: '/assets/logos/solutions/icons/esg.png',
    screenshot: '/assets/screenshots/esg-dashboard.webp',
    youtubeId: 'v3_97N3WUuI',
    name: 'ESG',
    tag: 'Environmental, Social & Governance Reporting',
    headline: 'ESG reporting that survives investor scrutiny.',
    lede: 'Collect, manage, and report ESG data in a structured, auditable way, aligned to GRI, IFRS S1/S2, and CDP, so your sustainability disclosures are backed by evidence, not just intention.',
    metaDescription: 'Collect, manage and report ESG data in a structured, auditable way, aligned to GRI, IFRS S1/S2 and CDP, so sustainability disclosures are backed by evidence.',
    challenges: [
      { title: 'Disclosures built on unverifiable data', body: 'ESG reports assembled from manually collected spreadsheets. Investors and auditors increasingly ask for evidence. Evidence is not there.' },
      { title: 'Questionnaires that take weeks to complete', body: 'Investor ESG questionnaires arrive and the search begins. Data is scattered, definitions differ by site, nobody owns the numbers.' },
      { title: 'Targets without audit trails', body: 'Net-zero commitments and social targets made publicly. Progress tracked informally. Assurance providers have nothing to work with.' },
      { title: 'Regulatory disclosure obligations missed', body: 'IFRS S1 and S2 requirements are expanding. Organisations without structured ESG data collection cannot comply in time.' },
    ],
    overview: 'XGRC® ESG provides a structured platform for collecting, managing, and reporting environmental, social, and governance data across the organisation, with multi-framework alignment, Scope 1/2/3 emissions tracking, and assurance-ready audit trails.',
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
    regionalLink: { href: '/mining-esg-compliance-software-africa/', label: 'Mining ESG compliance software for Africa' },
    geo: {
      definition: 'ESG management software helps organisations collect, govern, evidence and report environmental, social and governance data through consistent workflows and auditable records.',
      usage: 'Organisations typically adopt XGRC® ESG when investor questionnaires take weeks to complete, sustainability disclosures are built on unverifiable spreadsheet data, and IFRS S1/S2 requirements are expanding faster than manual data collection can keep up. The XGRC® ESG solution connects ESG data to environmental monitoring, risk, compliance and assurance activities within the wider XGRC® Software platform.',
      notThis: 'ESG is not a report-writing tool bolted on at year-end. It is a continuous data-collection and governance system, with Scope 1/2/3 emissions tracking, materiality assessment and assurance-ready audit trails, built to withstand investor and auditor scrutiny, not just produce a document.',
      faqs: [
        { q: 'Which ESG frameworks does XGRC® ESG support?', a: 'XGRC® ESG aligns to GRI Standards, IFRS S1 & S2, CDP, IIRC 6 Capitals, the UN SDGs and JSE Sustainability requirements.' },
        { q: 'Can XGRC® ESG track Scope 1, 2 and 3 emissions?', a: 'Yes. Emissions tracking across all three scopes is built into the platform, alongside energy, water and waste monitoring.' },
        { q: 'Is our ESG data audit-ready?', a: 'Yes. Every data point carries an audit trail and evidence repository, built for assurance providers and investor due diligence, not just internal reporting.' },
        { q: 'How does ESG connect to ENVIRX® and Integrated Assurance?', a: 'ESG shares the same data foundation as ENVIRX® (environmental monitoring) and Integrated Assurance (assurance-ready evidence), so disclosures are backed by governed data, not duplicated spreadsheets.' },
      ],
    },
  },

  'compliance-hub': {
    logo: '/assets/logos/solutions/compliance-hub.png',
    icon: '/assets/logos/solutions/icons/compliance-hub.png',
    screenshot: '/assets/screenshots/compliance-hub-dashboard.webp',
    booklet: '/resources/xgrc-compliance-hub-booklet.pdf',
    youtubeId: 'itta_NfEvOU',
    name: 'XGRC® Compliance Hub',
    tag: 'Supplier & Third-Party Compliance',
    metaTitle: 'Compliance Hub | Supplier Compliance Workflows | XGRC®',
    headline: 'Your supply chain\'s compliance posture, visible in real time.',
    lede: 'Structured onboarding, vetting, and ongoing compliance management for suppliers, contractors, and third parties, with automated document expiry tracking, risk scoring, and compliance dashboards that give you a live view of your entire supply chain.',
    metaDescription: 'XGRC® Compliance Hub manages vetting and ongoing compliance for suppliers, contractors and third parties, with document expiry tracking and risk scoring.',
    challenges: [
      { title: 'Certificates expire without warning', body: 'Supplier documents managed through email. Nobody owns the expiry calendar. A non-compliant contractor arrives on site.' },
      { title: 'Onboarding takes weeks', body: 'Manual verification, back-and-forth emails, documents in different formats. High-risk contractors cleared faster than low-risk ones because nobody applied the same standard.' },
      { title: 'No real-time supply chain view', body: 'You cannot answer the question "which of our active contractors are currently compliant?" without running a spreadsheet exercise.' },
      { title: 'Incidents reveal undiscovered gaps', body: 'A site incident exposes a contractor whose safety certification lapsed three months ago. Nobody noticed.' },
    ],
    overview: 'XGRC® Compliance Hub provides a structured portal for supplier and contractor onboarding, document verification, and ongoing compliance monitoring, with automated expiry alerts, risk-based scoring, and real-time dashboards that replace email-based compliance management.',
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
    geo: {
      definition: 'Compliance Hub is an available solution within XGRC® Software that supports supplier, contractor and third-party compliance workflows, including onboarding, vetting, document collection, evidence management and ongoing assurance.',
      usage: 'Organisations typically adopt Compliance Hub when supplier and contractor documents are managed through email with no owner for expiry dates, onboarding takes weeks of manual verification, and a site incident reveals a contractor\'s safety certification lapsed months earlier unnoticed.',
      notThis: 'Compliance Hub is not a standalone procurement system or ERP replacement. It supports compliance workflows around supplier, contractor and third-party governance within XGRC® Software, working alongside your existing procurement processes, not replacing them.',
      faqs: [
        { q: 'Does Compliance Hub replace our procurement system?', a: 'No. Compliance Hub manages compliance workflows, onboarding, vetting, document expiry, risk scoring, alongside your existing procurement system, not instead of it.' },
        { q: 'Can Compliance Hub score supplier risk automatically?', a: 'Yes. Suppliers are risk-scored with monitoring frequency adjusted accordingly, so high-risk contractors get closer attention automatically.' },
        { q: 'What happens when a supplier document is about to expire?', a: 'Compliance Hub tracks document expiry automatically and triggers renewal alerts before certificates lapse, rather than discovering the gap after an incident.' },
        { q: 'Which standards does Compliance Hub align to?', a: 'Compliance Hub supports ISO 9001, ISO 45001, POPIA and B-BBEE compliance requirements for supplier and third-party management.' },
      ],
    },
  },

  xlogic: {
    logo: '/assets/logos/solutions/xlogic.png',
    icon: '/assets/logos/solutions/icons/xlogic.png',
    screenshot: '/assets/screenshots/xlogic-dashboard.webp',
    name: 'XLOGIC®',
    tag: 'Governance Execution',
    headline: 'Policies that work. Controls that are actually enforced.',
    lede: 'XLOGIC® converts governance frameworks, policies, and controls into structured, enforceable workflows, so compliance is built into how work gets done, not bolted on afterwards through audits.',
    metaDescription: 'XLOGIC® converts governance frameworks, policies and controls into structured, enforceable workflows, so compliance is built into how work gets done.',
    challenges: [
      { title: 'Policies approved and filed, never operationalised', body: 'Documents are published. Employees are notified. Controls are never implemented. The gap between policy and practice grows with every update.' },
      { title: 'Frameworks defined at board level, disconnected from operations', body: 'Governance structures documented in reports. Day-to-day operations run on institutional knowledge, habit, and workarounds.' },
      { title: 'Evidence collected reactively', body: 'Compliance evidence gathered when an audit is announced, not continuously as work is performed. Evidence quality reflects urgency, not accuracy.' },
      { title: 'Controls that exist on paper only', body: 'Internal audit reveals controls that are documented but not operating effectively. Management responses are familiar words.' },
    ],
    overview: 'XLOGIC® is the governance execution layer. It takes the policies, frameworks, and controls defined in XGRC® and converts them into structured workflows with accountability, evidence capture, and continuous compliance monitoring built in.',
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
    geo: {
      definition: 'XLOGIC® is a governance execution solution within XGRC® Software that converts policies, frameworks, controls and obligations into structured workflows with accountability, evidence capture and auditability.',
      usage: 'Organisations typically adopt XLOGIC® when policies are approved and filed but never operationalised, governance frameworks are documented at board level but disconnected from daily operations, and compliance evidence is gathered reactively only once an audit is announced.',
      notThis: 'XLOGIC® is not a document repository. It helps organisations operationalise governance by linking policies, controls and obligations to real work, accountability and evidence, so compliance is built into how work gets done, not filed away after the fact.',
      faqs: [
        { q: 'How is XLOGIC® different from a document management system?', a: 'A document system stores policies. XLOGIC® converts them into structured, assigned, trackable workflows with continuous evidence capture, the difference between filing a policy and operationalising it.' },
        { q: 'Which frameworks does XLOGIC® support?', a: 'XLOGIC® supports King V, ISO 9001, ISO 27001 and COSO-aligned governance structures.' },
        { q: 'Can XLOGIC® show whether a control is actually working?', a: 'Yes. Control effectiveness tracking and continuous evidence collection show whether controls operate in practice, not just whether they\'re documented.' },
        { q: 'Do we need MSX® to use XLOGIC®?', a: 'No. XLOGIC® runs independently and connects to MSX®, ERM and Integrated Assurance where organisations use those solutions too.' },
      ],
    },
  },

  maia: {
    infographic: '/assets/infographics/maia-infographic-v3.pdf',
    logo: '/assets/logos/solutions/maia.png',
    icon: '/assets/logos/solutions/icons/maia.png',
    screenshot: '/assets/screenshots/maia-dashboard.webp',
    youtubeId: 'inqCqT0uW2k',
    name: 'MAIA®',
    tag: 'Governed AI for GRC',
    headline: 'The intelligence of governance, governed, audited, accountable.',
    lede: 'MAIA® is governed AI for GRC, embedded within XGRC® to help decision-makers interact with governance records, risks, policies, and compliance data. Faster insight. Better decisions. Full auditability, through controlled, audited AI integrations with a complete interaction audit trail.',
    metaDescription: 'MAIA® is governed AI for GRC, embedded in XGRC® so decision-makers can interrogate risks, policies and compliance data with a full audit trail.',
    challenges: [
      { title: 'Answers take days, not minutes', body: 'A board member asks about residual risk in a business unit. The risk manager spends two days compiling a response from multiple systems.' },
      { title: 'Governance records exist but are inaccessible', body: 'Policies, risk registers, audit findings, and compliance records accumulated over years. Too dense, too fragmented for rapid insight generation.' },
      { title: 'AI tools that create new governance risk', body: 'Generic AI tools may operate outside the governance, permission and audit controls required for regulated GRC decisions. Using them for governance decisions creates risk instead of reducing it.' },
      { title: 'Strategic decisions disconnected from operational risk data', body: 'Leadership makes decisions without a live view of the risk and compliance posture. The data exists. Nobody can access it fast enough to matter.' },
    ],
    overview: 'MAIA® is governed AI embedded within the XGRC® platform, using approved AI services through controlled, audited integrations, with permission alignment, data boundary controls, and full auditability of every AI interaction across risk, compliance, policy, and audit records.',
    stats: [
      { value: 'Audited', label: 'AI integrations' },
      { value: 'Full', label: 'AI audit trail' },
      { value: 'Live', label: 'Governance intelligence' },
    ],
    moduleGroups: [
      { category: 'Governance Intelligence', modules: ['Natural Language Risk Queries', 'Policy & Procedure Q&A', 'Compliance Status Summaries', 'Regulatory Change Impact Analysis', 'ESG & SHERQ Insight Engine'] },
      { category: 'DAVE: Data Integration', modules: ['API Data Connections', 'IoT Device Data', 'Microsoft Power BI', 'Microsoft Power Apps', 'Azure & PowerAutomate', 'XGRC Platform Data', 'Custom Data Requirements'] },
      { category: 'LUCI: AI Interface', modules: ['DataViews & ML Dashboards', 'Predictive Maintenance AI', 'H&S Assistant Agent', 'Driver Fatigue Monitoring', 'Process Automation Bots', 'Voice Mode Interface'] },
      { category: 'Governed AI Architecture', modules: ['Data Boundary Enforcement', 'AI Interaction Audit Trail', 'User Permission Alignment', 'Explainable AI Outputs', 'ChatGPT & Azure Integration'] },
    ],
    standards: ['ISO 42001 (targeted 2026)', 'ISO 27001', 'ISO 31000', 'ISO 45001', 'GDPR', 'POPIA'],
    related: ['erm', 'integrated-assurance', 'msxcyber'],
    geo: {
      definition: 'Governed AI for GRC is the controlled use of artificial intelligence to interrogate governance, risk, compliance, audit and policy data within defined permissions, security controls and audit trails.',
      usage: 'Organisations typically adopt MAIA® when a board question about residual risk takes two days to answer because the risk manager has to compile data manually across systems, and generic AI tools may operate outside the governance, permission and audit controls required for regulated GRC decisions.',
      notThis: 'MAIA® is not a generic AI chatbot. It is governed AI designed for GRC contexts, operating within XGRC® Software permissions, records and auditability requirements, every interaction is logged, permissioned and auditable.',
      faqs: [
        { q: 'Does MAIA® send our data to ChatGPT or other AI providers?', a: 'MAIA® uses approved AI services through controlled, audited integrations, with permission alignment and data boundary controls, every AI interaction is logged in a complete audit trail.' },
        { q: 'Can MAIA® answer questions across all our XGRC® data?', a: 'Yes. MAIA® can query risk registers, policies, audit findings and compliance records across every XGRC® solution your organisation uses.' },
        { q: 'Is MAIA® certified to ISO/IEC 42001?', a: 'XGRC® is targeting ISO/IEC 42001 certification for September 2026. MAIA® is already built around governed AI principles, permission alignment, audit trails and explainable outputs, ahead of that certification.' },
        { q: 'Who can access MAIA®\'s answers?', a: 'MAIA® respects existing XGRC® user permissions. It only surfaces data a user is already authorised to see.' },
      ],
    },
  },

  libryo: {
    infographic: '/assets/infographics/libryo-infographic-v3.pdf',
    name: 'Libryo',
    tag: 'Regulatory Intelligence Partner',
    headline: 'Legal obligations, translated into action, for every site, every jurisdiction.',
    lede: 'Libryo turns dense, constantly-changing EHS legislation into clear, site-specific compliance obligations. XGRC® partners with Libryo to embed jurisdiction-specific regulatory intelligence directly into your legal register, so obligations, tasks, and evidence live on the same platform as the rest of your governance and risk data.',
    metaDescription: 'Libryo turns dense, changing EHS legislation into clear, site-specific compliance obligations, embedded in XGRC® for jurisdiction-specific regulatory tracking.',
    challenges: [
      { title: 'Legal registers built and maintained by hand', body: 'Legislation is tracked in spreadsheets by whoever has time. Updates depend on someone noticing a change in the Government Gazette.' },
      { title: 'Multi-site, multi-jurisdiction sprawl', body: 'Every site operates under a different mix of national, provincial, and local regulation. No single view of what applies where.' },
      { title: 'Regulatory changes discovered too late', body: 'A law changes; the business finds out at the next audit, or after an inspector does. There is no early-warning mechanism.' },
      { title: 'Obligations identified, but not actioned', body: 'Legal registers list what must be done. They rarely track who owns it, whether it was done, or what evidence proves it.' },
    ],
    overview: 'Libryo maintains a continuously-updated database spanning 1,000+ jurisdictions, converting legislation into plain-language obligations mapped to each of your sites. Through the XGRC® partnership, those obligations, regulatory change alerts, and supporting evidence flow directly into your existing legal compliance, task, and audit workflows, no separate system to reconcile.',
    stats: [
      { value: '1,000+', label: 'Jurisdictions tracked' },
      { value: 'Since 2016', label: 'EHS regulatory intelligence' },
      { value: 'Daily', label: 'Legislative updates' },
    ],
    moduleGroups: [
      { category: 'Libryo Sites', modules: ['Site-Specific Legal Registers', 'Regulatory Change Monitoring', 'Obligation Breakdown', 'Multi-Jurisdiction Tracking'] },
      { category: 'Libryo Assess', modules: ['Customisable Assessments', 'Audit & Inspection Support', 'Compliance Scoring'] },
      { category: 'Action & Evidence', modules: ['Task & Workflow Management', 'Evidence Management', 'Audit Readiness Reporting'] },
    ],
    standards: ['ISO 14001', 'ISO 45001', 'ISO 9001'],
    related: ['envirx', 'sheqx', 'compliance-hub'],
    geo: {
      definition: 'Libryo is a partner software solution that provides regulatory intelligence and legal register content to help organisations understand applicable legal obligations across jurisdictions.',
      usage: 'Organisations typically use Libryo, via the XGRC® partnership, when they operate across multiple sites or jurisdictions and legal registers are maintained by hand, regulatory changes are discovered only at audit time, or nobody tracks whether identified legal obligations are actually actioned.',
      notThis: 'Libryo is a partner software solution, not a native XGRC® Software product. It can extend XGRC® Software deployments where specialist regulatory intelligence is required, obligations, alerts and evidence flow into your existing XGRC® workflows rather than a separate system.',
      faqs: [
        { q: 'Is Libryo a native XGRC® product?', a: 'No. Libryo is a partner software solution. XGRC® partners with Libryo to embed their regulatory intelligence directly into your legal register.' },
        { q: 'How many jurisdictions does Libryo cover?', a: 'Libryo maintains a continuously-updated database spanning 1,000+ jurisdictions, with daily legislative updates.' },
        { q: 'Do I need a separate system to use Libryo\'s obligations?', a: 'No. Through the XGRC® partnership, Libryo\'s obligations, regulatory change alerts and evidence flow directly into your existing legal compliance and task workflows.' },
        { q: 'Which XGRC® solutions does Libryo work best with?', a: 'Libryo pairs naturally with ENVIRX®, SHEQX® and Compliance Hub, feeding site-specific legal obligations into environmental, safety and supplier compliance workflows.' },
      ],
    },
  },

  hakware: {
    infographic: '/assets/infographics/hakware-infographic-v3.pdf',
    name: 'Hakware',
    tag: 'AI-Powered Security Testing Partner',
    headline: 'Continuous, AI-driven penetration testing that keeps you one step ahead.',
    lede: 'Hakware is an AI-powered security management platform that tests your environment the way an attacker would, continuously, not once a year. XGRC® partners with Hakware to bring offensive security testing, unified vulnerability visibility, and dark web monitoring into the same governed environment as your ISMS.',
    metaDescription: 'Hakware is an AI-powered security platform that tests your environment the way an attacker would, continuously rather than once a year, integrated with XGRC®.',
    challenges: [
      { title: 'Penetration tests happen once a year', body: 'Annual pentests produce a point-in-time report. New vulnerabilities in the eleven months between tests go undetected.' },
      { title: 'Security data scattered across tools', body: 'Firewalls, endpoints, cloud environments, and Microsoft 365 each report separately. No single view of actual exposure.' },
      { title: 'Manual triage misses what matters', body: 'Security teams are buried in alerts. Human error and alert fatigue mean genuine vulnerabilities slip through.' },
      { title: 'Breaches discovered from the outside', body: 'Leaked credentials and exposed data surface on the dark web long before anyone internally notices the exposure.' },
    ],
    overview: 'Hakware\'s AI engine (Archangel) runs offensive testing against your external environment the way a real attacker would, while OneView consolidates findings across firewalls, endpoints, cloud, and Microsoft 365 into one picture. Through the XGRC® partnership, findings feed directly into MSXCyber®, turning test results into governed risks, actions, and audit-ready evidence within your ISMS.',
    stats: [
      { value: 'Continuous', label: 'AI-driven penetration testing' },
      { value: 'Unified', label: 'Vulnerability visibility' },
      { value: 'Governed', label: 'Findings feed into MSXCyber®' },
    ],
    moduleGroups: [
      { category: 'AI Red Teaming', modules: ['Archangel AI Penetration Testing', 'Hakware Scout, Network Discovery', 'HakObserver, VM-Level Data Collection'] },
      { category: 'Unified Visibility', modules: ['OneView Security Dashboard', 'Cloud Manager', 'Endpoint Manager', 'Firewall Manager'] },
      { category: 'Governance & Threat Intel', modules: ['Microsoft 365 Auditor', 'Zero-Day Manager', 'Code Manager', 'Dark Web & Leaked Credential Monitoring'] },
    ],
    standards: ['ISO 27001', 'NIST CSF', 'OWASP Top 10'],
    related: ['msxcyber', 'erm', 'integrated-assurance'],
    geo: {
      definition: 'Hakware is a partner software solution that provides cyber security testing, vulnerability visibility and dark web exposure insight to support broader cyber governance.',
      usage: 'Organisations typically use Hakware, via the XGRC® partnership, when annual penetration tests leave eleven months of blind spots, security data is scattered across firewalls, endpoints, cloud and Microsoft 365 with no single view, and leaked credentials surface on the dark web before anyone internally notices.',
      notThis: 'Hakware is a partner software solution, not a replacement for MSXCyber® or technical security controls. It supports cyber testing and exposure insight as part of a broader cyber governance approach, findings feed directly into MSXCyber® as governed risks and actions.',
      faqs: [
        { q: 'Is Hakware a native XGRC® product?', a: 'No. Hakware is a partner software solution. XGRC® partners with Hakware to bring their AI-powered testing findings into your governed ISMS via MSXCyber®.' },
        { q: 'How often does Hakware test our environment?', a: 'Continuously, not annually. Hakware\'s AI engine (Archangel) runs offensive testing against your external environment on an ongoing basis, rather than a single point-in-time report.' },
        { q: 'Does Hakware monitor the dark web for our data?', a: 'Yes. Hakware monitors for leaked credentials and exposed data on the dark web, surfacing exposure before it becomes a breach.' },
        { q: 'How do Hakware\'s findings reach our governance records?', a: 'Through the XGRC® partnership, Hakware\'s findings feed directly into MSXCyber® as governed risks, actions and audit-ready evidence, not a separate, disconnected report.' },
      ],
    },
  },

  xrm: {
    logo: '/assets/logos/solutions/xrm.png',
    icon: '/assets/logos/solutions/icons/xrm.png',
    screenshot: '/assets/screenshots/xrm-dashboard.png',
    appUrl: 'xrm.xgrc.cloud',
    poweredBy: 'XGRC®',
    // youtubeId: '',  // add once a product walkthrough video exists
    name: 'XRM',
    tag: 'Sales Pipeline & Customer Management',
    metaTitle: 'XRM — Sales Pipeline & CRM Software | XGRC®',
    headline: 'Pipeline discipline, not pipeline guesswork.',
    lede: 'XRM gives your sales team one governed system to qualify leads, progress opportunities, generate quotes and close deals, with the approval workflows, audit trail and real-time visibility leadership actually needs. Built and run on the same ISO/IEC 27001:2022-certified XGRC® infrastructure as the rest of the platform, not a bolted-on CRM that quietly becomes another unmanaged spreadsheet.',
    metaDescription: 'XRM is one governed system for sales teams to qualify leads, progress opportunities, generate quotes and close deals, with approvals and a full audit trail.',
    challenges: [
      { title: 'Leads and real deals blur together', body: 'Unqualified interest sits in the same list as live opportunities, so nobody can tell what is genuine pipeline and what is noise.' },
      { title: 'Deals move with no accountability', body: 'Reps shift opportunities between stages unchecked, discounts get approved in a hallway conversation, and forecasts are guesses dressed up as numbers.' },
      { title: 'Quotes leave the building unmanaged', body: 'Pricing goes out over email, versions get lost, and nobody can say with confidence which quote the customer actually accepted.' },
      { title: 'Leadership has no real-time view', body: 'Pipeline health, at-risk deals and quota attainment live in a spreadsheet someone updates once a week, if that.' },
    ],
    overview: 'XRM manages the full sales lifecycle, from lead capture and qualification through opportunity progression, configurable approval workflows, quote generation and close, on one platform with a complete, queryable audit trail. Built-in dashboards, forecasting and sales-health flags give managers and leadership a live view of pipeline health without a manual reporting cycle.',
    stats: [
      { value: '25+', label: 'Modules across the sales lifecycle' },
      { value: 'ISO 27001', label: ':2022 certified platform' },
      { value: 'Full', label: 'Audit trail on every record' },
    ],
    ctaHeadline: 'See XRM running in your environment.',
    ctaBody: "Talk to an XGRC® specialist about how XRM fits your sales team's pipeline, approvals and reporting, built on the same certified platform as the rest of XGRC® Software.",
    productShots: [
      { image: '/assets/screenshots/xrm-dashboard.png', title: 'The whole business, at a glance', body: 'Weighted and gross pipeline, a conversion funnel from leads to won, month-over-month momentum, and pipeline value by stage: a sales leader sees the health of the operation in five seconds, without running a report.' },
      { image: '/assets/screenshots/xrm-pipeline.png', title: 'A pipeline you can actually see', body: 'Every open deal on a visual board, one column per stage, dragged from stage to stage as it progresses. The CRM stays current because keeping it current is effortless.' },
      { image: '/assets/screenshots/xrm-opportunity-detail.png', title: 'Everything about a deal, in one place', body: 'Stage journey, weighted value, days-to-close, products, stakeholders, notes, documents and full activity history: the complete context of a deal on one page, not scattered across inboxes and folders.' },
      { image: '/assets/screenshots/xrm-quotes.png', title: 'From opportunity to signed quote', body: 'Quotes generated straight off an opportunity and tracked through draft, sent, accepted and expiring, so nothing is left hanging in the gap between "interested" and "closed."' },
    ],
    moduleGroups: [
      { category: 'Pipeline & Deals', modules: ['Leads', 'Opportunities', 'Accounts', 'Contacts', 'Quotes'] },
      { category: 'Planning & Visibility', modules: ['Dashboard', 'Forecast', 'Territory Management', 'Sales Health', 'Reports'] },
      { category: 'Workflow & Governance', modules: ['Approval Workflows', 'Audit Log', 'Custom Fields', 'Sales Configuration'] },
      { category: 'Productivity', modules: ['My Actions', 'My Approvals', 'Calendar', 'Email Templates', 'Bulk Imports'] },
      { category: 'Administration', modules: ['User & Role Management', 'Pipeline & Stage Setup', 'Company Profile'] },
    ],
    standards: ['ISO 27001:2022', 'Multi-tenant SaaS', 'Configurable approvals', 'Full audit trail'],
    related: [], // no confirmed live data integration with other XGRC solutions yet, leave empty until one exists
    geo: {
      definition: 'XRM is a customer relationship management (CRM) platform for managing leads, opportunities, accounts, contacts and quotes through a structured, auditable sales process, with configurable approval workflows and governance controls built in from day one.',
      usage: 'Sales teams typically adopt XRM when leads and live opportunities are tracked in the same overcrowded spreadsheet, deal approvals happen informally over email, and management has no real-time view of pipeline health, forecast accuracy or at-risk deals. XRM keeps the entire sales lifecycle, from first contact to closed deal, on one governed platform with a complete audit trail, running on the same ISO/IEC 27001:2022-certified XGRC® infrastructure as the rest of the platform.',
      notThis: 'XRM is not a generic contact list or a marketing-automation tool. It is a structured sales pipeline and quote management system with rule-based approval workflows and a full audit trail, built and run by the team behind XGRC® Software on the same certified infrastructure, bringing the same governance discipline to sales that XGRC® brings to risk and compliance.',
      faqs: [
        { q: 'What is XRM used for?', a: 'XRM manages the full sales lifecycle: lead qualification, opportunity progression, quote generation and deal closure, with configurable approval workflows and a complete audit trail across every record.' },
        { q: 'Does XRM replace our spreadsheet-based pipeline?', a: 'Yes. XRM replaces manually maintained pipeline spreadsheets with a governed system where leads, opportunities, accounts, contacts and quotes are tracked in one place, with real-time dashboards and forecasting.' },
        { q: 'Can XRM enforce approval rules on discounts or large deals?', a: 'Yes. Configurable approval workflows automatically route deals or quotes that match admin-defined rules (for example, deals above a set value) to the right approver before they can proceed.' },
        { q: 'Is XRM covered by the same security certification as XGRC® Software?', a: "Yes. XRM runs on XGRC®'s ISO/IEC 27001:2022-certified infrastructure and is developed by the same team, so it is covered by the same information security management standard as the rest of the platform." },
        { q: 'Who builds and supports XRM?', a: 'XRM is built and supported by the team behind XGRC® Software, on the same certified infrastructure, bringing the same standard of auditability and governance discipline to the sales pipeline.' },
      ],
    },
  },
};

// Customer roster grouped by industry.
export const customerGroups = [
  {
    id: 'mining', sector: 'Mining & infrastructure', chip: 'Mining',
    customers: [
      { name: 'Fraser Alexander',             logo: 'Fraser-Alexander.jpg', url: 'https://www.fraseralexander.com/' },
      { name: 'Gap Infrastructure Corporation', logo: 'GIC.jpg', url: 'https://www.gic.co.za/' },
      { name: 'Sandton Plant Hire',            logo: 'Sandton-Plant-Hire.jpg', caseStudySlug: 'sandton-plant-hire', url: 'https://sandtonplant.co.za/' },
      { name: 'African Rainbow Minerals',      logo: 'ARM.jpg', url: 'https://arm.co.za/' },
      { name: 'Rosh Pinah Zinc Corporation',   logo: 'Rosh-Pinah-Zinc.jpg', url: 'https://www.roshpinahzinc.com/' },
      { name: 'Siyanda Bakgatla Platinum Mine', logo: 'SBPM.jpg', url: 'https://www.siyandaplatinum.com/' },
      { name: 'WACO Africa',                  logo: 'WacoAfrica.png', url: 'https://www.wacoafrica.co.za/' },
    ]
  },
  {
    id: 'manufacturing', sector: 'Manufacturing & industrial', chip: 'Manufacturing',
    customers: [
      { name: 'Trident S.A.',    logo: 'TRIDENTSA.jpg', url: 'https://tridentsa.co.za/' },
      { name: 'PG Bison',        logo: 'PG-Bison.jpg', url: 'https://pgbison.co.za/' },
      { name: 'PG Glass',        logo: 'PG-Glass.jpg', url: 'https://www.pgglass.co.za/' },
      { name: 'Pandrol',         logo: 'Pandrol.png', url: 'https://pandrol.co.za/' },
      { name: 'Helukabel',       logo: 'HELUKABEL.jpg', url: 'https://www.helukabel.co.za/za-en/Home/' },
      { name: 'Astec Industries', logo: 'ASTEC.jpg', url: 'https://astecindustries.com/' },
      { name: 'R&R Murphy', logo: 'RRMurphy.png', url: 'https://rrmurphy.com/' },
      { name: 'Actemium', logo: 'Actemium.png', url: 'https://actemium.co.uk/' },
    ]
  },
  {
    id: 'steel', sector: 'Steel manufacturing & supply', chip: 'Steel',
    customers: [
      { name: 'Trident Steel',         logo: 'TRIDENTSTEEL.png', url: 'https://tridentsteel.co.za/' },
      { name: 'Scaw Metals Group',      logo: 'SCAW.png', url: 'https://www.scaw.co.za/' },
      { name: 'Isilo Steel',           logo: 'IsiloSteel.png', url: 'https://www.isilosteel.co.za/' },
      { name: 'Qinisa Steel Solutions', logo: 'QinisaSteel-v2.png', url: 'https://www.qinisasteel.co.za/' },
      { name: 'Steel & Pipes for Africa', logo: 'SteelPipesAfrica-v2.png', url: 'https://www.steelpipesforafrica.co.za/' },
    ]
  },
  {
    id: 'holding', sector: 'Holding & investment groups', chip: 'Holding',
    customers: [
      { name: 'KAP Ltd',                  logo: 'KAP.png', url: 'https://kap.co.za/' },
      { name: 'African Rainbow Minerals', logo: 'ARM.jpg', url: 'https://arm.co.za/' },
      { name: 'Mesure Holdings',          logo: 'MESURE.png', url: 'https://www.mesure.co.za/' },
      { name: 'Commercial Cold Holdings', logo: 'CCH.jpg', caseStudySlug: 'commercial-cold-holdings', url: 'https://www.cchcold.com/' },
      { name: 'Motseng Holdings',         logo: 'Motseng-v2.png', url: 'https://motseng.co.za/' },
    ]
  },
  {
    id: 'facilities', sector: 'Facilities, pharma & waste', chip: 'Facilities',
    customers: [
      { name: 'Servest',                    logo: 'SERVEST.jpg', caseStudySlug: 'servest', url: 'https://www.servest.co.za/' },
      { name: 'Bidvest Steiner',            logo: 'BidvestSteiner-v2.png', url: 'https://steiner.co.za/' },
      { name: 'Tsebo Solutions Group',       logo: 'TSEBO.jpg', url: 'https://www.tsebo.com/' },
      { name: 'Interwaste Holdings',         logo: 'INTERWASTE.jpg', caseStudySlug: 'interwaste', url: 'https://interwaste.co.za/' },
      { name: 'Supercare by Empact Group',   logo: 'SUPERCARE.jpg', url: 'https://www.empactgroup.co.za/divisions/supercare/' },
      { name: 'The Pple Group',              logo: 'PPLE.png', caseStudySlug: 'pple-group', url: 'https://pple.co.za/' },
      { name: 'Bulk Waste Transport', logo: 'BulkWasteTransport.png', url: 'https://www.bulkwastetransport.com.au/' },
    ]
  },
  {
    id: 'food', sector: 'Food & agriculture', chip: 'Food & Agri',
    customers: [
      { name: 'RCL Foods',       logo: 'RCL-FOODS.jpg', url: 'https://rclfoods.com/' },
      { name: 'Woodlands Dairy', logo: 'WOODLANDS.jpg', url: 'https://www.woodlandsdairy.co.za/' },
      { name: 'AFGRI',           logo: 'AFGRI.jpg', url: 'https://www.afgri.co.za/' },
      { name: 'Overberg Agri',   logo: 'OVERBERG.jpg', url: 'https://overbergagri.co.za/' },
      { name: 'Meze Foods',      logo: 'MEZE.png', url: 'https://www.meze.co.za/' },
      { name: 'ADM',             logo: 'ADM.jpg', url: 'https://www.adm.com/' },
    ]
  },
  {
    id: 'wine', sector: 'Wine & fruit production', chip: 'Wine & Fruit',
    customers: [
      { name: 'Spier Wine Farm',          logo: 'SPIER.png', url: 'https://www.spier.co.za/' },
      { name: 'Lutzville Vineyards',      logo: 'Lutzville-v2.png', url: 'https://lutzvillevineyards.com/' },
      { name: "L'Ormarins Estate",        logo: 'LOMARAIS.png', url: 'https://lormarinswines.com/' },
      { name: 'Stellenbosch Hills',       logo: 'StellenboschHills-v2.png', url: 'https://www.stellenbosch-hills.co.za/' },
      { name: 'Letaba African Realty Trust', logo: 'Letaba-v2.png', url: 'https://www.letaba.com/' },
    ]
  },
  {
    id: 'logistics', sector: 'Logistics & distribution', chip: 'Logistics',
    customers: [
      { name: 'Unitrans',                 logo: 'UNITRANS.png', url: 'https://www.unitransafrica.com/' },
      { name: 'Value Logistics',          logo: 'ValueLogistics-v2.png', url: 'https://value.co.za/' },
      { name: 'Kintetsu World Express',   logo: 'KWE.png', url: 'https://www.kwe.com/' },
      { name: 'Hazmat Global', logo: 'Hazmat.png', url: 'https://www.hazglobal.com/' },
      { name: 'SPAR Distribution Centres', logo: 'SPAR.png', url: 'https://thespargroup.com/' },
      { name: 'Morgan Cargo', logo: 'MorganCargo.png', url: 'https://www.morgancargo.com/' },
      { name: 'Toyota South Africa',      logo: 'Toyota.png', url: 'https://www.toyota.co.za/' },
      { name: 'Ice House Logistics', logo: 'IceHouseLogistics.png', url: 'https://icehouselogistics.com.au/' },
      { name: 'Rock IT Global', logo: 'RockItGlobal.png', url: 'https://rockitcargo.com/' },
    ]
  },
  {
    id: 'energy', sector: 'Lubricants, oil & gas', chip: 'Oil & Gas',
    customers: [
      { name: 'FUCHS Lubricants', logo: 'FUCHS.png', url: 'https://www.fuchs.com/za/en/' },
      { name: 'Puregas', logo: 'Puregas.png', url: 'https://puregas.co.za/' },
      { name: 'Petro Hyper', logo: 'PetroHyper.png', url: 'https://www.petrohyper.com/' },
      { name: 'Vula Oils', logo: 'VulaOils.png', url: 'https://www.vulaoil.com/' },
      { name: 'OilTech Namibia', logo: 'OilTechNamibia.png', url: 'https://oiltech.com.na/' },
    ]
  },
  {
    id: 'technology', sector: 'Science, IT & telecoms', chip: 'Technology',
    customers: [
      { name: 'CSIR',              logo: 'CSIR.png', url: 'https://www.csir.co.za' },
      { name: 'WhiteSci', logo: 'WhiteSci.png', url: 'https://www.whitesci.co.za' },
      { name: 'MTC Namibia', logo: 'MTCNamibia.png', url: 'https://www.mtc.com.na' },
      { name: 'Mustek',            logo: 'MUSTEK.png', url: 'https://mustek.co.za' },
      { name: 'INHANCE Technology', logo: 'Inhance.png', url: 'https://inhancesc.com/' },
      { name: 'Clinglobal',        logo: 'CLINGLOBAL.png', url: 'https://clinglobal.com' },
      { name: 'Connek', logo: 'Connek.png', url: 'https://connek.com.au/' },
      { name: 'Nidaros', logo: 'Nidaros.png', url: 'https://nidaros-company.com/' },
      { name: 'Linckr', logo: 'Linckr.png', url: 'https://www.linckr.com/' },
    ]
  },
  {
    id: 'financial-services', sector: 'Financial services providers', chip: 'Financial Services',
    customers: [
      { name: 'AlexForbes', logo: 'AlexForbes.png', url: 'https://online.alexforbes.com/' },
      { name: 'Q-Link',     logo: 'QLink-v2.png',      url: 'https://qlink.co.za/' },
    ]
  },
];

// Implementation and delivery partners — support delivery, adoption and customer
// enablement. Not XGRC® Software products; do not render these as solution cards.
export const implementationPartners = [
  { name: 'OSA International', region: 'South Africa · Netherlands', blurb: 'Compliance technology and ISO consulting partner, delivering the XGRC® platform alongside certification support.', url: 'https://osa-int.cloud/' },
  { name: 'GRC Link', region: 'South Africa', blurb: 'Governance, risk and compliance consultancy focused on ISO gap analysis and cloud-based compliance management.', url: 'https://grclink.online/' },
  { name: 'Africa Safety SHE', region: 'South Africa', blurb: 'SHEQ consulting firm providing audits, risk assessments, training and electronic SHEQ management system delivery.', url: 'https://africasafetyshe.co.za/' },
  { name: 'NICAID Group', region: 'Australia', blurb: 'Compliance, LEAN business-improvement and project management consultancy supporting ISO certification and SHEQX® adoption.', url: 'https://www.nicaidgroup.com/' },
  { name: 'Labournet', region: 'South Africa', blurb: 'HR, payroll and employment-legislative compliance partner combining human consulting with people-management software.', url: 'https://www.labournet.com/' },
  { name: 'ACT Solutions', region: 'Australia', blurb: 'ISO accreditation, compliance consulting and training services for organisations across Australia and New Zealand.', url: 'https://anzctsolutions.com.au/' },
  { name: 'three6five', region: 'South Africa', blurb: 'IT infrastructure managed services provider covering network services, cybersecurity, and cloud solutions.', url: 'https://www.three6five.com/' },
  { name: 'BCX', region: 'South Africa · United Kingdom', blurb: 'ICT and digital transformation company delivering cloud, automation and managed services, with a UK presence.', url: 'https://www.bcx.co.za/our-offices/uk/' },
];

// pdf: false = no PDF yet. Set pdf: true once you upload /public/case-studies/{slug}.pdf
export const caseStudies = [
  {
    slug: 'vican-manufacturing',
    company: 'Vican Manufacturing',
    sector: 'Manufacturing',
    solution: 'SHEQX®',
    summary: 'A South African paint producer became an industry benchmark for safety, quality, and regulatory compliance through SHEQX® and ISO 9001 implementation.',
    pdf: true,
  },
  {
    slug: 'sandton-plant-hire',
    company: 'Sandton Plant Hire',
    sector: 'Plant hire & mining',
    solution: 'SHEQX®',
    summary: 'Replaced disconnected spreadsheets with SHEQX®, delivering faster SHEQ response times, accurate reporting, and the ability to scale operations without increasing risk exposure.',
    pdf: true,
  },
  {
    slug: 'commercial-cold-holdings',
    company: 'Commercial Cold Holdings',
    sector: 'Cold chain logistics',
    solution: 'SHEQX®',
    summary: 'One of the 25 largest refrigerated warehousing providers globally digitised SHEQ workflows to strengthen food safety, product integrity, and compliance with international export protocols.',
    pdf: true,
  },
  {
    slug: 'interwaste',
    company: 'Interwaste',
    sector: 'Waste management',
    solution: 'SHEQX®',
    summary: 'Unified SHEQ processes across multiple regions, significantly reducing reporting effort, accelerating safety action closure, and increasing near-miss reporting volumes.',
    pdf: true,
  },
  {
    slug: 'pple-group',
    company: 'Pple Group',
    sector: 'Human capital',
    solution: 'SHEQX®',
    summary: 'Elevated operational standards across the group through ISO 9001 and SHEQX®, improving quality management and compliance visibility.',
    pdf: true,
  },
  {
    slug: 'tn-ceramics',
    company: 'TN Ceramics',
    sector: 'Mining & materials',
    solution: 'XGRC®',
    summary: 'A specialist ceramics supplier to major Southern African mining companies adopted XGRC® to strengthen governance, compliance, and operational oversight.',
    pdf: true,
  },
  {
    slug: 'servest',
    company: 'Servest',
    sector: 'Facilities management',
    solution: 'SHEQX® + ENVIRX®',
    summary: 'Digitised SHEQ processes since 2019, reducing administrative burden and achieving renewed ISO 9001, 14001, and 45001 certifications in October 2024.',
    pdf: true,
  },
];

// `date` is the published date (ISO YYYY-MM-DD). When an article's content is
// materially updated, add `dateModified: 'YYYY-MM-DD'` — the Article schema
// emits it as schema.org dateModified (a freshness signal for search + AI
// citation). Absent it, dateModified falls back to `date`.
export const articles = [
  {
    slug: 'extended-enterprise-risk-management',
    title: 'What Is Extended Enterprise Risk Management?',
    excerpt: 'A large share of an organisation\'s risk sits with its suppliers, contractors and partners. Extended enterprise risk management is the discipline of governing that third-party exposure.',
    category: 'ERM',
    date: '2026-07-25',
    image: 'extended-enterprise-risk-management-v2.jpg',
    relatedSolutions: ['compliance-hub', 'erm'],
  },
  {
    slug: 'enterprise-risk-management-vs-traditional-risk-management',
    title: 'ERM vs Traditional Risk Management: What Is the Difference?',
    excerpt: 'Traditional risk management is local and periodic; enterprise risk management is organisation-wide and continuous. What separates them, and why organisations move from one to the other.',
    category: 'ERM',
    date: '2026-07-25',
    image: 'erm-software-vs-traditional-risk-tools.jpg',
    relatedSolutions: ['erm'],
  },
  {
    slug: 'erp-vs-erm',
    title: 'ERP vs ERM: What Is the Difference?',
    excerpt: 'ERP and ERM are one letter apart and often confused, but they are different systems: ERP runs the business, ERM governs its risk. What each does, and why organisations run both.',
    category: 'ERM',
    date: '2026-07-25',
    image: 'iso-31000-vs-coso-key-erm-framework-differences.jpg',
    relatedSolutions: ['erm'],
  },
  {
    slug: 'what-is-enterprise-risk-management',
    title: 'What Is Enterprise Risk Management? A Complete Guide',
    excerpt: 'What enterprise risk management is, how it differs from traditional risk management, the ISO 31000 and COSO frameworks behind it, and how software sustains ERM across the whole organisation.',
    category: 'ERM',
    date: '2026-07-25',
    image: 'cultivating-a-risk-aware-culture-tackling-the-people-risk-in-enterprise-risk-management.jpg',
    relatedSolutions: ['erm'],
  },
  {
    slug: 'erm-vs-grc',
    title: 'ERM vs GRC: What Is the Difference?',
    excerpt: 'ERM and GRC are often used interchangeably but are not the same. Enterprise risk management is a discipline focused on risk; GRC is the broader environment it sits inside. How they relate, and which you need.',
    category: 'ERM',
    date: '2026-07-25',
    image: 'grc-vs-risk-management-software-why-the-difference-matters.jpg',
    relatedSolutions: ['erm'],
  },
  {
    slug: 'digital-sheq-management',
    title: 'Digital SHEQ Management: From Scattered Records to One Auditable Platform',
    excerpt: 'Safety, health, environment and quality data still lives in email, spreadsheets and paper forms at many organisations. Moving SHEQ management onto one auditable platform is what turns scattered records into closed actions, prevented incidents and sustained ISO certification.',
    category: 'SHEQ',
    date: '2026-07-25',
    image: 'what-is-sheq-software-complete-guide.jpg',
    relatedSolutions: ['sheqx'],
  },
  {
    slug: 'what-is-grc-software',
    title: 'What Is GRC Software? A Practical Definition',
    excerpt: 'GRC software brings governance, risk management and compliance onto one connected platform, so risks, controls, obligations and evidence are managed together instead of in disconnected spreadsheets and point tools.',
    category: 'GRC',
    date: '2026-07-22',
    image: 'grc-vs-risk-management-software-why-the-difference-matters.jpg',
    relatedSolutions: ['erm', 'integrated-assurance'],
  },
  {
    slug: 'five-risk-management-process-steps',
    title: 'The Five Risk Management Process Steps',
    excerpt: 'A structured, repeatable risk management cycle, identify, assess, evaluate treatment, implement and monitor, aligned to ISO 31000, and how to run it on one platform instead of scattered spreadsheets.',
    category: 'Risk Management',
    date: '2026-07-22',
    image: 'iso-31000-vs-coso-key-erm-framework-differences.jpg',
    relatedSolutions: ['erm', 'integrated-assurance'],
  },
  {
    slug: 'what-is-governed-ai-for-grc',
    title: 'What Is Governed AI for GRC?',
    excerpt: 'Generic AI tools create as much governance risk as they solve. Governed AI for GRC is a different category, built for permissions, audit trails, and accountability from the ground up.',
    category: 'AI & Governance',
    date: '2026-07-05',
    image: 'what-is-governed-ai-for-grc-v2.jpg',
    relatedSolutions: ['maia', 'msxcyber'],
  },
  {
    slug: 'what-is-iso-42001',
    title: 'What Is ISO/IEC 42001? The New AI Management System Standard',
    excerpt: "ISO/IEC 42001 is the first international standard for AI management systems. Here's what it covers, who needs it, and how XGRC® is preparing.",
    category: 'AI & Governance',
    date: '2026-06-28',
    image: 'what-is-iso-42001-v2.jpg',
    relatedSolutions: ['maia', 'msx'],
  },
  {
    slug: 'supplier-compliance-software-vs-procurement-systems',
    title: 'Supplier Compliance Software vs Procurement Systems: What\'s the Difference?',
    excerpt: "Procurement systems manage purchasing. Supplier compliance software manages risk. Confusing the two leaves compliance gaps that a purchase order was never designed to catch.",
    category: 'GRC',
    date: '2026-06-22',
    image: 'supplier-compliance-software-vs-procurement-systems-v2.jpg',
    relatedSolutions: ['compliance-hub', 'xlogic'],
  },
  {
    slug: 'policy-management-vs-governance-execution',
    title: 'Policy Management vs Governance Execution: Why Approved Policies Still Fail',
    excerpt: 'A published policy is not a working control. The gap between policy management and governance execution is where compliance quietly breaks down.',
    category: 'GRC',
    date: '2026-06-20',
    image: 'policy-management-vs-governance-execution-v2.jpg',
    relatedSolutions: ['xlogic', 'msx'],
  },
  {
    slug: 'integrated-assurance-vs-internal-audit-software',
    title: 'Integrated Assurance vs Internal Audit Software: Beyond the Audit Plan',
    excerpt: 'Internal audit software manages the audit function. Integrated assurance connects every line of defence to the same risk picture, closing the gaps between them.',
    category: 'GRC',
    date: '2026-06-18',
    image: 'integrated-assurance-vs-internal-audit-software-v2.jpg',
    relatedSolutions: ['integrated-assurance', 'erm'],
  },
  {
    slug: 'why-ai-governance-is-becoming-a-competitive-advantage',
    title: 'Why AI Governance Is Becoming a Competitive Advantage',
    excerpt: 'Organisations that implement effective AI governance are not simply reducing risk; they are creating a stronger foundation for sustainable, responsible growth.',
    category: 'AI & Governance',
    date: '2026-06-15',
  },
  {
    slug: 'esg-reporting-is-no-longer-optional-its-strategic',
    title: 'ESG Reporting Is No Longer Optional: It\'s Strategic',
    excerpt: 'Investors, regulators, and customers now expect transparent, data-driven ESG accountability. Companies that wait risk reputational harm, regulatory fines, and competitive disadvantage.',
    category: 'ESG',
    date: '2026-06-01',
  },
  {
    slug: 'top-5-risk-control-strategies-for-chemical-plants-using-sheqx',
    title: 'Top 5 Risk Control Strategies for Chemical Plants Using SHEQX®',
    excerpt: 'In the chemical and process-industry landscape, the margin for error is razor-thin. These five control strategies transform how SHEQ teams identify, track, and close risk gaps.',
    category: 'SHEQ',
    date: '2026-05-20',
  },
  {
    slug: 'preparing-your-organisation-for-iso-14001-2026',
    title: 'Preparing Your Organisation for ISO 14001:2026',
    excerpt: 'ISO 14001 is evolving. Organisations that start preparing now will be better positioned to meet the updated requirements without disrupting their existing management systems.',
    category: 'Environment',
    date: '2026-05-05',
  },
  {
    slug: 'mandatory-esg-reporting-in-southern-africa-how-companies-can-stay-ahead',
    title: 'Mandatory ESG Reporting in Southern Africa: How Companies Can Stay Ahead',
    excerpt: 'Regulatory ESG disclosure requirements are tightening across Southern Africa. Organisations that wait for final mandates before acting will find themselves behind, and the gap is closing fast.',
    category: 'ESG',
    date: '2026-04-20',
  },
  {
    slug: 'solving-compliance-fatigue-through-automation',
    title: 'Solving Compliance Fatigue Through Automation',
    excerpt: 'Compliance fatigue is rising across organisations under increasing regulatory pressure. Automation reduces duplication, improves accuracy, and gives leaders confidence during audits.',
    category: 'GRC',
    date: '2026-04-05',
  },
  {
    slug: 'the-hidden-cost-of-cyber-incidents-for-ceos',
    title: 'The Hidden Cost of Cyber Incidents for CEOs',
    excerpt: 'The direct cost of a cyber incident is visible. The indirect costs, regulatory penalties, customer loss, operational downtime, and reputational damage, are what make the real bill.',
    category: 'Cyber',
    date: '2026-03-20',
  },
  {
    slug: 'how-xgrc-grc-solutions-support-mining-indaba-2026-objectives',
    title: 'How XGRC® GRC Solutions Support Mining Indaba 2026 Objectives',
    excerpt: 'Mining Indaba 2026 makes it clear: governance, sustainability, and risk management are no longer peripheral to mining success; they are central to it.',
    category: 'Mining',
    date: '2026-03-05',
  },
  {
    slug: 'navigating-south-africas-ehs-regulations-why-digital-compliance-tools-are-essential',
    title: 'Navigating South Africa\'s EHS Regulations: Why Digital Compliance Tools Are Essential',
    excerpt: 'South Africa\'s EHS legislative landscape is complex, multi-jurisdictional, and constantly updated. Digital compliance tools are how organisations stay on the right side of it.',
    category: 'Environment',
    date: '2026-02-18',
  },
  {
    slug: 'cultivating-a-risk-aware-culture-tackling-the-people-risk-in-enterprise-risk-management',
    title: 'Cultivating a Risk-Aware Culture: Tackling the People Risk in ERM',
    excerpt: 'Risk frameworks, registers, and tools are essential, but they do not manage risk on their own. People do. Building a risk-aware organisation starts with culture, not software.',
    category: 'Risk',
    date: '2026-02-03',
  },
  {
    slug: 'building-a-cyber-aware-culture-addressing-the-human-element-of-cyber-risk',
    title: 'Building a Cyber-Aware Culture: Addressing the Human Element of Cyber Risk',
    excerpt: 'Technical controls can only do so much. The human element remains the most significant variable in cyber risk, and it requires a culture of awareness, not just policy.',
    category: 'Cyber',
    date: '2026-01-20',
  },
  {
    slug: 'navigating-esg-reporting',
    title: 'Navigating ESG Reporting: A Practical Roadmap',
    excerpt: 'The expectations on business to be transparent about ESG performance have never been higher. This article outlines the key hurdles and provides a roadmap to respond proactively.',
    category: 'ESG',
    date: '2026-01-06',
  },
  {
    slug: 'from-compliance-to-zero-harm-transforming-mine-safety-digitally',
    title: 'From Compliance to Zero Harm: Transforming Mine Safety Digitally',
    excerpt: 'Mining remains one of the highest-risk industries globally. Digital mine safety software is now central to moving from regulatory compliance to genuine zero harm culture.',
    category: 'SHEQ',
    date: '2025-12-15',
  },
  {
    slug: 'strengthening-haccp-and-iso-22000-through-digital-food-safety-governance',
    title: 'Strengthening HACCP and ISO 22000 Through Digital Food Safety Governance',
    excerpt: 'HACCP and ISO 22000 provide the framework, but without digital oversight food safety governance remains reactive, fragmented, and difficult to demonstrate at audit time.',
    category: 'Food Safety',
    date: '2025-12-01',
  },
  {
    slug: 'simplifying-esg-reporting-through-centralised-environmental-data',
    title: 'Simplifying ESG Reporting Through Centralised Environmental Data',
    excerpt: 'Environmental data is scattered across sites, systems, and spreadsheets. Centralising it is the prerequisite for credible, consistent ESG reporting that withstands stakeholder scrutiny.',
    category: 'ESG',
    date: '2025-11-17',
  },
  {
    slug: 'streamlining-iso-27001-compliance-digitally',
    title: 'Streamlining ISO 27001 Compliance Digitally',
    excerpt: 'ISO 27001 compliance is achievable without the administrative chaos, if the right governance infrastructure is in place from the outset.',
    category: 'Cyber',
    date: '2025-11-03',
  },
  {
    slug: 'double-materiality-in-esg',
    title: 'Double Materiality in ESG: What Organisations Need to Know',
    excerpt: 'Double materiality requires assessing both how sustainability issues affect the business and how the business affects sustainability. Most organisations are not prepared for the second half.',
    category: 'ESG',
    date: '2025-10-20',
  },
  {
    slug: 'environmental-compliance-software-for-regulatory-management',
    title: 'Environmental Compliance Software for Regulatory Management',
    excerpt: 'Environmental regulation is not static. Organisations that rely on manual compliance tracking will always be playing catch-up with a legislative landscape that never stops moving.',
    category: 'Environment',
    date: '2025-10-06',
  },
  {
    slug: 'integrated-management-system-software-for-modern-compliance',
    title: 'Integrated Management System Software for Modern Compliance',
    excerpt: 'Multiple ISO standards, multiple management systems, multiple obligations. Integration is how leading organisations eliminate duplication and create a single, auditable picture of compliance.',
    category: 'GRC',
    date: '2025-09-22',
  },
  {
    slug: 'iso-31000-vs-coso-key-erm-framework-differences',
    title: 'ISO 31000 vs COSO: Key ERM Framework Differences',
    excerpt: 'ISO 31000 and COSO ERM are both widely adopted risk frameworks, but they are designed with different emphases. Understanding the distinction helps organisations choose the right foundation.',
    category: 'ERM',
    date: '2025-09-08',
    relatedSolutions: ['erm', 'msx'],
  },
  {
    slug: 'what-is-sheq-software-complete-guide',
    title: 'What Is SHEQ Software? A Complete Guide',
    excerpt: 'SHEQ management has evolved well beyond paper-based registers and manual inspections. This guide explains what modern SHEQ software does and why it has become essential for compliance-driven organisations.',
    category: 'SHEQ',
    date: '2025-08-25',
    relatedSolutions: ['sheqx', 'msx'],
  },
  {
    slug: 'erm-software-vs-traditional-risk-tools',
    title: 'ERM Software vs Traditional Risk Tools: Why Spreadsheets Create Risk',
    excerpt: 'Spreadsheet-based risk registers create false confidence. Enterprise risk management software provides the visibility, accountability, and real-time monitoring that traditional tools cannot.',
    category: 'ERM',
    date: '2025-08-11',
    relatedSolutions: ['erm', 'integrated-assurance'],
  },
  {
    slug: 'grc-vs-risk-management-software-why-the-difference-matters',
    title: 'GRC vs Risk Management Software: Why the Difference Matters',
    excerpt: 'GRC platforms and risk management software are often conflated. The difference matters, because choosing the wrong category of solution creates the very gaps it was supposed to close.',
    category: 'GRC',
    date: '2025-07-28',
    relatedSolutions: ['msx', 'erm', 'msxcyber'],
  },
  {
    slug: 'the-cost-of-fragmented-compliance-why-visibility-matters-more-than-ever',
    title: 'The Cost of Fragmented Compliance: Why Visibility Matters More Than Ever',
    excerpt: 'When compliance activities are scattered across disconnected systems, visibility disappears, and what leadership cannot see, they cannot govern.',
    category: 'GRC',
    date: '2025-07-14',
  },
  {
    slug: 'esg-reporting-is-evolving-why-spreadsheets-are-no-longer-enough',
    title: 'ESG Reporting Is Evolving: Why Spreadsheets Are No Longer Enough',
    excerpt: 'ESG reporting has moved into the mainstream. Organisations still relying on spreadsheets are discovering they were never built to support the governance rigour now required.',
    category: 'ESG',
    date: '2025-06-30',
  },
  {
    slug: 'why-compliance-visibility-improves-executive-decision-making',
    title: 'Why Compliance Visibility Improves Executive Decision-Making',
    excerpt: 'Why compliance visibility is becoming essential for executive decision-making, and how connected governance improves accountability and reduces risk.',
    category: 'GRC',
    date: '2026-08-13',
    image: 'why-compliance-visibility-improves-executive-decision-making.jpg',
    relatedSolutions: ['compliance-hub', 'erm'],
  },
  {
    slug: 'why-compliance-is-becoming-a-competitive-advantage',
    title: 'Why Compliance Is Becoming a Competitive Advantage',
    excerpt: 'Compliance is evolving beyond regulatory obligations into a competitive advantage that builds trust, improves decisions, and drives performance.',
    category: 'GRC',
    date: '2026-08-18',
    image: 'why-compliance-is-becoming-a-competitive-advantage.jpg',
    relatedSolutions: ['compliance-hub', 'erm'],
  },
  {
    slug: 'how-proactive-compliance-reduces-business-risk',
    title: 'How Proactive Compliance Reduces Business Risk',
    excerpt: 'How proactive compliance helps organisations spot risks earlier, strengthen governance, and reduce the cost of regulatory and operational failures.',
    category: 'Risk',
    date: '2026-08-21',
    image: 'how-proactive-compliance-reduces-business-risk.jpg',
    relatedSolutions: ['erm', 'compliance-hub'],
  },
  {
    slug: 'building-a-compliance-culture',
    title: 'Building a Compliance Culture: Why Policy Alone Isn\'t Enough',
    excerpt: 'A strong compliance culture is not built by policies alone. What actually makes employees understand, trust, and apply governance expectations.',
    category: 'GRC',
    date: '2026-08-24',
    image: 'building-a-compliance-culture.jpg',
    relatedSolutions: ['xlogic', 'msx'],
  },
  {
    slug: 'future-of-compliance-strategic-business-asset',
    title: 'The Future of Compliance: A Strategic Business Asset',
    excerpt: 'Why the future of compliance lies beyond regulatory obligations, and how organisations turn it into a strategic asset for resilience and trust.',
    category: 'GRC',
    date: '2026-08-27',
    image: 'future-of-compliance-strategic-business-asset.jpg',
    relatedSolutions: ['erm', 'msx'],
  },
  {
    slug: 'ai-governance-gap-enterprise-ai-risk',
    title: 'The AI Governance Gap: When Adoption Outpaces Control',
    excerpt: 'AI is spreading through organisations faster than the policies, oversight and audit trails meant to control it. This piece looks at why that gap is the real enterprise AI risk, and what closing it actually requires.',
    category: 'AI & Governance',
    date: '2026-09-02',
    relatedSolutions: ['maia'],
  },
  {
    slug: 'why-sheq-incidents-are-often-a-data-problem',
    title: 'Why SHEQ Incidents Are Often a Data Problem',
    excerpt: 'Fragmented SHEQ information, scattered across inspections, near misses and corrective action logs, can hide the patterns that signal a serious incident is developing.',
    category: 'SHEQ',
    date: '2026-09-09',
    relatedSolutions: ['sheqx'],
  },
];

// FAQs shown on individual /insights/[slug] articles, keyed by article slug.
// Only articles with an entry here render a FAQ section + FAQPage schema.
export const articleFaqs = {
  'extended-enterprise-risk-management': [
    { q: 'What is extended enterprise risk management?', a: 'Extended enterprise risk management is the discipline of identifying, assessing and monitoring the risks introduced by third parties, such as suppliers, contractors, outsourced providers and partners, across their whole lifecycle from onboarding through ongoing performance to offboarding.' },
    { q: 'Is extended enterprise risk management the same as third-party risk management?', a: 'They describe the same thing. Extended enterprise risk management, third-party risk management and supply chain risk management all refer to governing the exposure created by the external parties an organisation depends on, rather than its own internal operations.' },
    { q: 'Why does extended enterprise risk matter?', a: 'Because you carry the consequences without holding the controls. A supplier\'s data breach, a contractor\'s safety failure or a vendor\'s lapsed certification becomes your regulatory, operational or reputational problem. As organisations outsource more, third parties have become one of the largest and least visible sources of risk.' },
    { q: 'How does XGRC® manage extended enterprise risk?', a: 'XGRC® Compliance Hub provides structured onboarding, vetting and ongoing compliance management for suppliers, contractors and third parties, with automated document expiry tracking and risk scoring. That data connects to enterprise risk management and assurance on the same platform, so third-party risk is governed as part of total exposure.' },
  ],
  'enterprise-risk-management-vs-traditional-risk-management': [
    { q: 'What is the difference between traditional risk management and enterprise risk management?', a: 'Traditional risk management is local and periodic, with each department keeping its own register reviewed on a set cycle. Enterprise risk management is organisation-wide and continuous: it aggregates risk into one connected view, links risks to controls, owners and the board\'s appetite, and keeps the picture current.' },
    { q: 'What is traditional risk management?', a: 'Traditional risk management manages risk within a single department, site or project, usually in a spreadsheet reviewed once a year. It answers what could go wrong in one area, but sees risks in isolation and offers no single view of the organisation\'s total exposure.' },
    { q: 'Why do organisations move from traditional risk management to ERM?', a: 'The move happens when departmental registers can no longer be added together to answer a board-level question, risk appetite cannot be monitored on the ground, and the audit plan bears no relationship to where the real risk sits. ERM closes that gap with one connected, continuously maintained view.' },
    { q: 'Is enterprise risk management just risk management at a bigger scale?', a: 'It is more than scale. ERM changes how risk is seen and connected: from many isolated registers to one portfolio, from periodic reviews to continuous monitoring, and from standalone spreadsheets to risks linked to controls, appetite and assurance on shared data.' },
  ],
  'erp-vs-erm': [
    { q: 'What is the difference between ERP and ERM?', a: 'ERP (enterprise resource planning) runs an organisation\'s core operations, such as finance, procurement, supply chain and HR, on one integrated system. ERM (enterprise risk management) governs risk, through risk registers, controls, appetite and assurance. ERP runs the business; ERM governs its risk.' },
    { q: 'Are ERP and ERM the same thing?', a: 'No. They are one letter apart but solve different problems and rarely overlap in function. ERP is about operational efficiency and a single source of truth for transactions; ERM is about governance and resilience, giving leadership a view of exposure against risk appetite.' },
    { q: 'Do organisations need both ERP and ERM?', a: 'Most established organisations run both. ERP keeps operations running on reliable data; ERM keeps risk governed on reliable data. They serve different audiences and answer to different pressures, and are bought, run and measured separately.' },
    { q: 'Does XGRC® provide ERP or ERM?', a: 'XGRC® provides ERM, not ERP. XGRC® Enterprise Risk Management delivers a live risk register, risk appetite monitoring and assurance-aligned risk management on one auditable platform. Strategix, the group behind XGRC®, delivers ERP separately as part of its broader technology portfolio.' },
  ],
  'what-is-enterprise-risk-management': [
    { q: 'What is enterprise risk management in simple terms?', a: 'Enterprise risk management (ERM) is managing an organisation\'s risks across the whole business as one connected portfolio, rather than department by department. It identifies, assesses, treats and monitors risk against the appetite the board has set, and links each risk to the controls and assurance meant to manage it.' },
    { q: 'What is the difference between ERM and risk management?', a: 'Traditional risk management is usually local and periodic, with each department keeping its own register reviewed once a year. ERM is organisation-wide and continuous: it aggregates risk across departments and projects, keeps the register live, and connects risks to controls, owners and assurance activity.' },
    { q: 'What frameworks are used for enterprise risk management?', a: 'The two most widely used are ISO 31000, the international standard for risk management, and the COSO ERM framework, which links risk more explicitly to strategy and performance. Most organisations draw on both, treating risk management as a continuous cycle integrated into decision-making.' },
    { q: 'Does XGRC® provide enterprise risk management software?', a: 'Yes. XGRC® Enterprise Risk Management provides a live risk register, risk appetite monitoring, key risk indicators, board-level dashboards and corrective action tracking, aligned to ISO 31000 and COSO, on the same auditable platform used across compliance and assurance.' },
  ],
  'erm-vs-grc': [
    { q: 'Is ERM part of GRC?', a: 'Yes. Enterprise risk management is one of the pillars of governance, risk and compliance. GRC spans governance, risk and compliance as connected disciplines on shared data, and ERM provides the risk pillar within that broader model.' },
    { q: 'What is the difference between ERM and GRC?', a: 'ERM is a discipline focused on risk: exposure, controls, appetite and assurance. GRC is the broader environment that discipline sits inside, covering governance and compliance as well as risk, and connecting all three so they reinforce each other rather than operating in silos.' },
    { q: 'Can you have ERM without GRC?', a: 'An organisation can run enterprise risk management without a full GRC model, but it will manage risk in relative isolation from the governance and compliance activities that depend on the same information. Most organisations grow from ERM into a connected GRC approach over time.' },
    { q: 'Does XGRC® cover both ERM and GRC?', a: 'Yes. XGRC® is a GRC platform whose specialist solutions run on one auditable data foundation. Enterprise Risk Management is the risk pillar, connected on the same platform to compliance, audit and assurance.' },
  ],
  'digital-sheq-management': [
    { q: 'What is digital SHEQ management?', a: 'Digital SHEQ management is running safety, health, environment and quality processes on one auditable platform instead of across email, spreadsheets and paper forms. Incidents, risks, inspections, audits, actions and compliance obligations are connected on a shared data foundation, so records are linked and evidence is always current.' },
    { q: 'How does it help sustain ISO certification?', a: 'Aligned to ISO 9001, ISO 14001 and ISO 45001, a digital SHEQ platform tracks audits, inspections, actions and compliance obligations continuously, so certification evidence stays current between audits rather than being reassembled before each surveillance visit.' },
    { q: 'What does SHEQ stand for?', a: 'SHEQ stands for Safety, Health, Environment and Quality. SHEQ management brings these four disciplines together so their risks, incidents, controls and compliance obligations are managed on one platform rather than separately.' },
    { q: 'Which XGRC® solution provides SHEQ management?', a: 'SHEQX® is the Safety, Health, Environment and Quality solution within XGRC® Software. It manages the full SHEQ lifecycle across every site and connects to the same secure data foundation used across risk, compliance and assurance.' },
  ],
  'what-is-grc-software': [
    { q: 'What is GRC software used for?', a: 'GRC software is used to manage governance, risk and compliance on one platform, maintaining policies, risk registers, controls, regulatory obligations, audits and evidence together so they stay linked rather than scattered across spreadsheets and separate tools.' },
    { q: 'What is the difference between GRC software and risk management software?', a: 'Risk management software focuses on one discipline, identifying, assessing and treating risk. GRC software is broader: it covers governance and compliance as well, and connects risks to the controls, obligations, audits and actions across all three, on a shared data foundation.' },
    { q: 'Do we need GRC software if we already use spreadsheets?', a: 'Spreadsheets work until obligations span multiple regulations, audit evidence is assembled from scattered sources, or leadership needs one defensible view of risk and compliance. At that point a spreadsheet stops being a reliable system of record and becomes a source of risk itself.' },
    { q: 'Does XGRC® provide GRC software?', a: 'Yes. XGRC® Software is a GRC platform whose specialist solutions, enterprise risk management, integrated assurance, SHEQX®, MSXCyber® and others, run on one secure, auditable data foundation so information stays connected across disciplines.' },
  ],
  'five-risk-management-process-steps': [
    { q: 'What are the five steps of the risk management process?', a: 'Identify the risks; assess and measure them by likelihood and impact; evaluate treatment options; implement the chosen treatment; and monitor and review the results. ISO 31000 treats these as a continuous cycle rather than a one-off exercise.' },
    { q: 'What are the four risk treatment options?', a: 'Accept the risk, avoid it by stopping the activity, control (mitigate) it by reducing its likelihood or impact, or transfer it to another party, for example through insurance.' },
    { q: 'How does ISO 31000 relate to the risk management process?', a: 'ISO 31000 is the international standard for risk management. It frames the process as a continuous cycle and places ongoing monitoring and review at its centre, rather than treating risk assessment as a document filed once a year.' },
    { q: 'How does XGRC® support the risk management process?', a: 'XGRC® Enterprise Risk Management supports the full cycle on one platform, aligned to ISO 31000 and COSO, connecting each risk to the controls that treat it, the actions raised against it, and the assurance activities that test it.' },
  ],
  'what-is-governed-ai-for-grc': [
    { q: 'Does governed AI mean we can\'t use tools like ChatGPT at all?', a: 'No, it means AI access to governance data happens through controlled, audited integrations rather than unrestricted general-purpose use, so data boundaries and audit trails are maintained.' },
    { q: 'How is governed AI different from just restricting who can use AI?', a: 'Access restriction alone doesn\'t create an audit trail or explainable outputs. Governed AI combines permission alignment with logging and explainability, purpose-built for governance contexts.' },
    { q: 'Is MAIA® available as a standalone product?', a: 'MAIA® is embedded within XGRC® Software and works across whichever XGRC® solutions your organisation already uses, it is not a separate, standalone AI product.' },
  ],
  'what-is-iso-42001': [
    { q: 'Is ISO/IEC 42001 mandatory?', a: 'No, it\'s a voluntary international standard, though it is likely to become a procurement expectation for AI-enabled software in the same way ISO 27001 has for information security.' },
    { q: 'Is XGRC® certified to ISO/IEC 42001 yet?', a: 'Not yet, certification is targeted for September 2026. MAIA® is already built around the standard\'s core principles ahead of that milestone.' },
    { q: 'How does ISO/IEC 42001 relate to ISO 27001?', a: 'They\'re complementary, ISO 27001 covers information security management broadly, while ISO/IEC 42001 addresses AI-specific governance, risk and oversight requirements.' },
  ],
  'supplier-compliance-software-vs-procurement-systems': [
    { q: 'Can Compliance Hub integrate with our existing procurement system?', a: 'Compliance Hub is designed to run alongside your procurement system, managing the compliance and risk data procurement systems aren\'t built to track.' },
    { q: 'Do we need supplier compliance software if we already vet suppliers manually?', a: 'Manual vetting works until volume or site risk grows, the usual trigger is a missed expiry or an incident revealing a gap that manual tracking didn\'t catch in time.' },
    { q: 'Which industries need this most?', a: 'Any organisation using contractors or suppliers on safety-critical sites, mining, construction, manufacturing and facilities management see this gap most often.' },
  ],
  'policy-management-vs-governance-execution': [
    { q: 'Do we need to replace our policy management system to use XLOGIC®?', a: 'No. XLOGIC® works alongside existing policy and document management tools, focusing on operationalising the obligations those policies contain.' },
    { q: 'How does XLOGIC® prove a control is actually working?', a: 'Through continuous evidence collection and control effectiveness tracking, rather than relying on a one-time acknowledgement or an annual audit sample.' },
    { q: 'Is this only relevant for large, complex organisations?', a: 'No, any organisation that has had an audit finding saying a documented control "was not operating effectively" has experienced this exact gap.' },
  ],
  'integrated-assurance-vs-internal-audit-software': [
    { q: 'Does Integrated Assurance replace our internal audit software?', a: 'No, it manages the full internal audit lifecycle plus a combined assurance matrix connecting audit, risk, and compliance data, so it extends rather than replaces the audit function.' },
    { q: 'What is a "line of defence" in this context?', a: 'The four lines of defence model, operational management, risk/compliance functions, internal audit, and external assurance, each providing a layer of oversight over organisational risk.' },
    { q: 'Can Integrated Assurance work without XGRC® ERM?', a: 'It can, but the combined assurance matrix is strongest when connected to a live risk register, pairing it with XGRC® ERM gives audit planning a current risk picture rather than a static one.' },
  ],
  'iso-31000-vs-coso-key-erm-framework-differences': [
    { q: 'Do we have to choose between ISO 31000 and COSO ERM?', a: 'No. Most organisations draw on both, ISO 31000\'s flexible risk process alongside COSO\'s governance and internal control structure. XGRC® ERM supports alignment to both frameworks on the same data foundation.' },
    { q: 'Which framework is required for JSE-listed or public sector organisations?', a: 'Neither framework is legally mandated, but COSO ERM is commonly expected where strong governance and board oversight are scrutinised, while ISO 31000 is widely referenced as international best practice.' },
    { q: 'Can XGRC® ERM support a framework we haven\'t adopted yet?', a: 'Yes. XGRC® ERM is built around risk identification, assessment, treatment and monitoring workflows that map to both ISO 31000 and COSO, so adopting or switching frameworks doesn\'t require rebuilding your risk register.' },
  ],
  'what-is-sheq-software-complete-guide': [
    { q: 'Is SHEQ software only for large, multi-site organisations?', a: 'No. Single-site organisations benefit too, particularly once ISO certification, audit demands, or incident volumes make spreadsheet-based tracking unreliable. Multi-site operations simply feel the pain sooner.' },
    { q: 'What\'s the difference between SHEQ software and an EHS tool?', a: 'Many EHS tools focus narrowly on environmental, health and safety tracking. SHEQ software additionally covers quality management and connects all four disciplines to a single governance and audit trail.' },
    { q: 'Does SHEQX® cover all four SHEQ disciplines?', a: 'Yes. SHEQX® manages safety, health, environmental and quality processes, incidents, audits, permits, inspections and corrective actions, within one auditable platform.' },
  ],
  'erm-software-vs-traditional-risk-tools': [
    { q: 'Can we migrate an existing spreadsheet risk register into ERM software?', a: 'Yes. Existing risks, ratings and treatment plans can be imported into XGRC® ERM as a starting point, then maintained live with audit trails going forward.' },
    { q: 'Is ERM software only necessary once we\'re a large organisation?', a: 'The trigger is usually complexity, not size, multi-site operations, growing audit demands, or board-level reporting needs typically arrive before headcount does.' },
    { q: 'Does moving off spreadsheets mean losing flexibility?', a: 'No. XGRC® ERM keeps risk categorisation, scoring and reporting configurable, you gain audit trails and real-time visibility without losing the flexibility spreadsheets offered.' },
  ],
  'grc-vs-risk-management-software-why-the-difference-matters': [
    { q: 'Can we start with risk management software and move to GRC later?', a: 'Yes. XGRC® is designed for modular adoption: start with ERM alone, then add governance and compliance-focused solutions like MSXCyber® or Compliance Hub without migrating data.' },
    { q: 'Is a GRC platform overkill for a single-discipline need?', a: 'Not with XGRC®, each solution (ERM, SHEQX®, MSXCyber®) runs independently. You only get the "platform" benefit, shared data, no duplication, once you adopt more than one.' },
    { q: 'What\'s the clearest sign we\'ve outgrown standalone risk software?', a: 'When risk, compliance and governance data live in different systems and nobody can produce one consistent, auditable view for the board, that\'s the point a connected GRC platform starts to matter.' },
  ],
  'why-compliance-visibility-improves-executive-decision-making': [
    { q: 'What is compliance visibility?', a: 'Compliance visibility is an organisation\'s ability to monitor, understand, and report on compliance activities, obligations, risks, controls, and performance across the enterprise through a connected governance framework, rather than through separate departmental reports.' },
    { q: 'Why is compliance visibility important for executives?', a: 'Compliance visibility enables executives to make informed decisions by providing accurate, enterprise-wide insight into regulatory obligations, governance performance, compliance risks, and organisational accountability, instead of isolated reports compiled department by department.' },
    { q: 'How can organisations improve compliance visibility?', a: 'Organisations can improve compliance visibility by centralising governance information on one platform, integrating compliance with risk management, automating reporting, and giving leadership a live view of obligations, controls, and corrective actions rather than a periodic spreadsheet exercise.' },
  ],
  'why-compliance-is-becoming-a-competitive-advantage': [
    { q: 'What does compliance as a competitive advantage mean?', a: 'Compliance becomes a competitive advantage when organisations use governance, accountability, and regulatory oversight to strengthen trust, improve decision-making, reduce risk, and support business growth, rather than treating compliance solely as a cost of meeting legal requirements.' },
    { q: 'Why is compliance becoming more strategic?', a: 'Increasing regulatory complexity, digital transformation, and higher stakeholder expectations mean compliance now influences organisational resilience, governance, reputation, and business performance, not just regulatory standing.' },
    { q: 'How can organisations gain a competitive advantage through compliance?', a: 'Organisations can strengthen compliance by improving visibility, integrating compliance with governance and risk management, centralising compliance information, and adopting a connected governance platform instead of disconnected point tools.' },
  ],
  'how-proactive-compliance-reduces-business-risk': [
    { q: 'What is proactive compliance?', a: 'Proactive compliance is the continuous monitoring and management of regulatory obligations, risks, controls, and governance activities to identify potential issues before they become compliance failures or business disruptions, rather than responding only after an audit or incident.' },
    { q: 'Why is proactive compliance important?', a: 'Proactive compliance helps organisations reduce business risk by identifying issues earlier, improving governance, strengthening operational resilience, and reducing the cost of remediation compared with a reactive, audit-triggered approach.' },
    { q: 'How can organisations implement proactive compliance?', a: 'Organisations can strengthen proactive compliance by centralising compliance information, continuously monitoring obligations and controls, improving governance visibility, and integrating compliance with broader risk management on one platform rather than periodic spreadsheet reviews.' },
  ],
  'building-a-compliance-culture': [
    { q: 'What is a compliance culture?', a: 'A compliance culture exists when employees understand what is expected of them, know where to find current governance information, and take responsibility for applying policies in their everyday work, rather than compliance being something only a dedicated team manages.' },
    { q: 'Why is policy management not enough on its own to build a compliance culture?', a: 'Publishing a policy does not make employees aware of it, tell them what changed, or hold anyone accountable for applying it. Without ownership, accessibility, and consistent communication, policies remain documents rather than practised behaviour.' },
    { q: 'How does XLOGIC® support compliance culture?', a: 'XLOGIC® converts policies, frameworks, controls, and obligations into structured workflows with clear ownership, evidence capture, and auditability, so governance expectations translate into tracked, accountable action rather than a document filed and forgotten.' },
  ],
  'future-of-compliance-strategic-business-asset': [
    { q: 'What is the future of compliance?', a: 'The future of compliance is moving beyond regulatory obligations toward a connected governance approach that supports business resilience, executive decision-making, accountability, and long-term organisational performance, rather than compliance operating as an isolated function.' },
    { q: 'Why is compliance becoming a strategic business asset?', a: 'Compliance provides valuable governance insight that helps organisations manage risk, improve visibility, strengthen stakeholder trust, and make better business decisions, creating measurable business value beyond regulatory compliance alone.' },
    { q: 'How can organisations prepare for the future of compliance?', a: 'Organisations can prepare by integrating compliance with governance and risk management, improving enterprise-wide visibility, strengthening accountability, automating compliance processes, and adopting a connected governance platform.' },
  ],
  'ai-governance-gap-enterprise-ai-risk': [
    { q: 'What is AI governance?', a: 'AI governance refers to the policies, responsibilities, controls and oversight mechanisms organisations use to manage artificial intelligence responsibly within their business environment.' },
    { q: 'What is the AI governance gap?', a: 'The AI governance gap occurs when organisational adoption of AI develops faster than the governance structures required to control, monitor and oversee its use.' },
    { q: 'Why is AI governance important?', a: 'AI governance helps organisations maintain accountability, manage access, protect organisational information, introduce appropriate human oversight and improve the traceability of AI-supported activities.' },
    { q: 'What is governed AI?', a: 'Governed AI is the use of artificial intelligence within defined organisational controls, responsibilities and oversight mechanisms, rather than providing unrestricted access to AI capabilities.' },
    { q: 'What is M.A.I.A.®?', a: 'M.A.I.A.® represents XGRC®\'s approach to bringing artificial intelligence into a governed enterprise environment, where intelligence operates within structured organisational controls.' },
    { q: 'How does XLOGIC® support AI governance?', a: 'XLOGIC® Executable Governance Architecture works alongside the XGRC® Platform and M.A.I.A.® to support the broader objective of making AI activity more controlled, accountable and traceable.' },
  ],
  'why-sheq-incidents-are-often-a-data-problem': [
    { q: 'What is SHEQ management?', a: 'SHEQ management refers to the structured management of safety, health, environmental and quality processes across an organisation, including incidents, inspections, risks, corrective actions, audits and compliance requirements.' },
    { q: 'Why is SHEQ data visibility important?', a: 'SHEQ data visibility helps organisations identify relationships between incidents, near misses, inspections, findings, risks and corrective actions. Greater visibility can help management recognise emerging patterns and intervene earlier.' },
    { q: 'How can fragmented SHEQ data increase risk?', a: 'When SHEQ information is managed across separate systems or processes, related events may not be recognised as part of the same trend. This can make emerging operational risks more difficult to identify.' },
    { q: 'Why are corrective actions important in SHEQ management?', a: 'Corrective actions provide a structured response to identified weaknesses or issues. Clear ownership, deadlines and evidence help organisations ensure that identified risks are addressed rather than simply recorded.' },
    { q: 'What is SHEQX®?', a: 'SHEQX® by XGRC® Software provides a structured environment for bringing SHEQ processes, information, responsibilities and actions together. Powered by the XGRC® Platform and XLOGIC® Executable Governance Architecture, it supports structured, controlled and auditable SHEQ workflows.' },
  ],
};

// Product-material downloads shown on /resources. `href` set = real target.
// PDFs open in a new tab (download:true); internal pages navigate in place.
// Product infographics are not listed here — each lives on its solution page.
export const resources = [
  { type: 'Booklet', title: 'SHEQX® Booklet', note: 'Safety, health, environment and quality management.', href: '/resources/xgrc-sheqx-booklet.pdf', download: true },
  { type: 'E-Book', title: 'ENVIRX® E-Book', note: 'Environmental compliance and performance monitoring.', href: '/resources/xgrc-envirx-ebook.pdf', download: true },
  { type: 'Booklet', title: 'ERM Booklet', note: 'Enterprise risk management as a strategic capability.', href: '/resources/xgrc-erm-booklet.pdf', download: true },
  { type: 'Booklet', title: 'XGRC® Compliance Hub Booklet', note: 'Vendor, supplier and contractor compliance management.', href: '/resources/xgrc-compliance-hub-booklet.pdf', download: true },
  { type: 'Booklet', title: 'Cyber Security Booklet', note: 'Information security and cyber risk management.', href: '/resources/xgrc-cyber-security-booklet.pdf', download: true },
  { type: 'Brochure', title: 'Integrated Assurance Brochure', note: 'Combined assurance and four lines of defence.', href: '/resources/xgrc-integrated-assurance-brochure.pdf', download: true }
];

// Video hub — powers /videos/. Add a new entry here (with a real YouTube ID) to
// publish a new video; the category must be one of videoCategories below.
export const videos = [
  {
    youtubeId: 'inqCqT0uW2k',
    title: 'AI Is Not the Risk. Poor AI Governance Is.',
    description: 'Why the danger in AI adoption is not the technology itself, but deploying it without permissions, audit trails, or accountability, the governed AI case for MAIA®.',
    category: 'Platform Overview',
    date: '2026-07',
  },
  {
    youtubeId: '5hZX0WIebCo',
    title: "Cyber Risk Doesn't Stay in IT. It's a Business Risk.",
    description: 'Why cyber risk belongs on the enterprise risk register, not just the IT ticket queue, and how MSXCyber® connects ISO 27001 controls, incidents and evidence in one auditable system.',
    category: 'MSXCyber®',
    date: '2026-07',
  },
  {
    youtubeId: 'itta_NfEvOU',
    title: "Compliance Isn't the Problem. Fragmented Systems Are.",
    description: 'How disconnected spreadsheets and siloed tools, not the compliance requirements themselves, are what actually slow organisations down, and how Compliance Hub brings supplier and third-party compliance onto one platform.',
    category: 'Compliance Hub',
    date: '2026-07',
  },
  {
    youtubeId: '2GeDzakhgjw',
    title: 'ESG Without Governance Is Just Reporting.',
    description: 'Why ESG data without governance behind it is just a spreadsheet exercise, and what it takes to turn sustainability disclosures into auditable, defensible evidence.',
    category: 'ESG',
    date: '2026-07',
  },
  {
    youtubeId: '2qmLbCaUNtw',
    title: 'AI is not the risk. Lack of governance is.',
    description: 'Our perspective on why AI adoption is not the threat, and why the absence of governance frameworks is the real exposure organisations face right now.',
    category: 'Platform Overview',
    date: '2026-05',
  },
  {
    youtubeId: 'IxTJu0rcqn8',
    title: 'Overcome Fragmented Oversight with a Unified GRC Foundation',
    description: 'Why disconnected risk, compliance, ESG and cyber data leaves leadership without the clarity to act, and how XGRC® provides one secure, auditable data foundation across every discipline.',
    category: 'Platform Overview',
    date: '2026-03',
  },
  {
    youtubeId: 'hW3EPWIKj9s',
    title: 'Digital SHEQ Systems Centralise Incident Reporting',
    description: 'How SHEQX® brings incident reporting, inspections and corrective actions onto one connected platform.',
    category: 'SHEQX®',
    date: '2026-06',
  },
  {
    youtubeId: 'v3_97N3WUuI',
    title: 'The Future of ESG Is Digital with XGRC® Software',
    description: 'Why structured, auditable ESG data collection is replacing spreadsheet-based sustainability reporting.',
    category: 'ESG',
    date: '2026-06',
  },
];

export const videoCategories = [
  'Platform Overview', 'SHEQX®', 'MSX®', 'ENVIRX®', 'Compliance Hub', 'MSXCyber®', 'ESG', 'Training', 'Implementation Guides', 'Webinars',
];

// About — centered, alternating timeline. Add more real milestones as they're confirmed.
export const milestones = [
  { year: '2015', title: 'XGRC® Software founded', body: 'Strategix launches XGRC® to unify governance, risk and compliance on one auditable platform.' },
  { year: '2016', title: 'SHEQX® launches', body: 'Safety, health, environment and quality management arrives on the platform, aligned to ISO 9001, ISO 14001 and ISO 45001.' },
  { year: '2017', title: 'MSX® launches', body: 'MSX® launches as the integrated management system that unifies multiple XGRC® disciplines into one coordinated hub.' },
  { year: '2017', title: 'ENVIRX® launches', body: 'Environmental compliance and performance monitoring joins the platform, with auditable environmental records.' },
  { year: '2018', title: 'Version 3 released', body: 'XGRC® Version 3 releases, advancing the platform architecture underpinning every discipline.' },
  { year: '2018', title: 'MSXCyber® launches', body: 'ISO 27001-aligned information security governance arrives, bringing ISMS risk, controls and evidence onto XGRC®.' },
  { year: '2018', title: 'LUCI launches', body: 'LUCI launches as XGRC®\'s AI interface: the foundation for natural-language interaction with governance data.' },
  { year: '2019', title: 'Version 4 released', body: 'XGRC® Version 4 releases, extending the platform ahead of DAVE and Enterprise Risk Management.' },
  { year: '2019', title: 'DAVE launches', body: 'DAVE launches to unify data integration across XGRC®, APIs, IoT devices and Microsoft Power Platform.' },
  { year: '2020', title: 'Enterprise Risk Management launches', body: 'A structured, auditable approach to enterprise, operational and project risk, aligned to ISO 31000 and COSO.' },
  { year: '2021', title: 'ESG launches', body: 'Management of ESG data and governance processes arrives, for consistent reporting and assurance across sustainability initiatives.' },
  { year: '2022', title: 'MAIA® launches', body: 'MAIA® launches as governed AI for GRC, combining LUCI and DAVE with a complete AI interaction audit trail.' },
  { year: '2023', title: 'ISO 27001:2022 certification', body: 'The XGRC® platform certified to ISO 27001:2022 for information security management.' },
  { year: '2024', title: 'Hakware incorporated into XGRC® ecosystem', body: 'Hakware joins the XGRC® ecosystem, bringing AI-powered penetration testing and vulnerability visibility into MSXCyber®\'s governed environment.' },
  { year: '2025', title: 'Integrated Assurance launches', body: 'Internal audit and combined assurance coordination arrives, linked directly to risks, controls and actions.' },
  { year: '2025', title: 'XGRC® Compliance Hub launches', body: 'Structured supplier, contractor and third-party compliance arrives, through onboarding, vetting and ongoing assurance.' },
  { year: '2025', title: 'Microsoft Power BI connector launches', body: 'A native Power BI connector launches, extending XGRC® reporting and analytics into customers\' existing Microsoft environments.' },
  { year: '2026', title: 'XLOGIC® launches', body: 'XLOGIC® launches as the governance execution layer, converting policies and controls into structured, enforceable workflows.' },
  { year: '2026', title: 'Contract Framework v4.0 takes effect', body: 'The SaaS Agreement and NDA move to v4.0, aligning the legal framework that incorporates the Data Processing Addendum and Website Policies by reference.' },
  { year: 'Jul 2026', title: 'Version 5 releases', body: 'XGRC® Version 5 releases, the platform\'s latest architecture across every discipline.' },
  { year: 'Sep 2026', title: 'ISO/IEC 42001 certification audit', body: 'XGRC® undergoes its ISO/IEC 42001 certification audit, targeting governed AI certification for MAIA®.' },
];

// About — "humans behind the code". The XGRC team who build, secure and
// support the platform. This is the XGRC website, so there is no division
// split here (divisions are a Strategix group concept, not XGRC's).
// photo: filename under /public/assets/team/ (omit for an initials avatar).
// Names + titles are REAL (from the org chart). superpower / humanTrait are
// FUN PLACEHOLDERS generated to fill the cards until each person supplies
// their own; role-flavoured superpowers + light, wholesome traits. Keep each
// to ONE short clause when the real ones replace these (see reference cards).
// Card colours are decorative only (rotated by position in about.astro).
// Renders nothing on the About page until populated (see about.astro).
export const people = [
  { name: 'Jacob O’Brien', title: 'Chief Executive Officer', superpower: 'Seeing the whole board three moves ahead', humanTrait: 'Makes the coffee before anyone else arrives' },
  { name: 'Stefan Venter', title: 'Chief Technology Officer', superpower: 'Turning "impossible" into a release date', humanTrait: 'Will happily debate tabs versus spaces for an hour' },
  { name: 'Stanly O’Brien', title: 'Chief Operations Officer', superpower: 'Keeping every moving part in perfect sync', humanTrait: 'Colour-codes absolutely everything' },
  { name: 'Deneys Minne', title: 'Chief Revenue Officer', superpower: 'Turning a first hello into a lasting partnership', humanTrait: 'Never knowingly lost a conversation' },
  { name: 'Nic Roets', title: 'Development Manager', superpower: 'Shipping quality without the drama', humanTrait: 'Has a keyboard shortcut for everything' },
  { name: 'Alexis van Eck', title: 'General Manager', superpower: 'Making the complicated look effortless', humanTrait: 'Always knows where the good coffee is' },
  { name: 'Revalisha Moodley', title: 'Business Development Manager', superpower: 'Spotting an opportunity a mile away', humanTrait: 'Fills passports faster than photo albums' },
  { name: 'Lilly Breytenbach', title: 'Operations Manager', superpower: 'Turning chaos into a tidy checklist', humanTrait: 'Plans holidays like military operations' },
  { name: 'Nadia Bezuidenhout', title: 'Report Specialist', superpower: 'Finding the one number that actually matters', humanTrait: 'Owns more highlighters than is strictly reasonable' },
  { name: 'Rikus De Beer', title: 'Development Team Lead', superpower: 'Unblocking the whole team before standup ends', humanTrait: 'Weekend braai master, non-negotiable' },
  { name: 'Leasche De Beer', title: 'System Operations Specialist', superpower: 'Keeping the lights on while everyone sleeps', humanTrait: 'Has strong opinions about mechanical keyboards' },
  { name: 'Nannette O’Brien', title: 'QA Team Leader', superpower: 'Finding the bug nobody thought to look for', humanTrait: 'Actually reads the terms and conditions' },
  { name: 'Veruscka Fuller', title: 'Projects Team Lead', superpower: 'Landing every project on time and on target', humanTrait: 'Keeps a to-do list for the to-do lists' },
  { name: 'Pieter Bossert', title: 'Senior Software Engineer', superpower: 'Writing code that still makes sense a year later', humanTrait: 'Fuelled entirely by good coffee and curiosity' },
  { name: 'Lerochca De Meyer', title: 'Support Consultant', superpower: 'Turning a frustrated ticket into a thank-you', humanTrait: 'Remembers every customer and their dog by name' },
  { name: 'Mikayla Telescourt', title: 'Support Consultant', superpower: 'Answering the question before you finish asking', humanTrait: 'Certified plant parent to a small jungle' },
  { name: 'Michaela Manca', title: 'QA Consultant', superpower: 'Breaking it gently so customers never have to', humanTrait: 'Never leaves a puzzle unfinished' },
  { name: 'Amor Esterhuizen', title: 'QA Consultant', superpower: 'Spotting the tiny detail everyone else scrolled past', humanTrait: 'Bakes when stressed, so the office wins' },
  { name: 'Michelle Vermaak', title: 'Project Consultant', superpower: 'Keeping every stakeholder smiling and informed', humanTrait: 'Weekend hiker chasing the next good view' },
  { name: 'Dee Dee Richards', title: 'Project Consultant', superpower: 'Turning a vague brief into a clear plan', humanTrait: 'Collects notebooks faster than they get filled' },
  { name: 'Chris Sherrard', title: 'Junior Software Engineer', superpower: 'Learning a whole new stack over a weekend', humanTrait: 'Gamer by night, debugger by day' },
  { name: 'Brandon O’Brien', title: 'Intermediate Software Engineer', superpower: 'Fixing it properly, not just quickly', humanTrait: 'Can name that song in three notes' },
];

// Proof stats — powers the stats band on the homepage.
// confirmed: true = derivable from live site data; safe to deploy.
// confirmed: false = owner must verify before production (gated to DEV builds).
export const stats = [
  { value: '800+', label: 'Companies globally',        confirmed: true  },
  { value: '11',   label: 'Years of GRC expertise',    confirmed: true  },
  { value: '10+',  label: 'Solutions on one platform', confirmed: true  },
  { value: '5',    label: 'Continents served',         confirmed: true  },
  // Uncomment and confirm before enabling — owner to supply verified number:
  // { value: '[[CONFIRM]]', label: 'Users governed', confirmed: false },
];

// Testimonials — real quotes only; component renders nothing if array is empty.
// Sourced verbatim from the published case studies in public/case-studies/.
// Two quotes in the Pple Group case study carry only a role, no named
// individual, and one TN Ceramics quote appears twice under two different
// names in the source PDF (a copy-paste artefact there) — all three were
// left out here rather than publish an unclear or duplicated attribution.
export const testimonials = [
  {
    quote: "By implementing XGRC SHEQX® and ENVIRX, we have seen a 30% reduction in administrative workload and a 25% improvement in incident and inspection data accuracy output. This has enabled our teams to focus on more value-adding activities that drive risk and compliance.",
    name: "Lucky Ncayiyana",
    role: "Group SHERQ Manager",
    company: "Servest",
    outcome: "30% reduction in administrative workload",
  },
  {
    quote: "Switching to SHEQX® has been a game-changer. We've cut admin, gained visibility, and built a more proactive safety culture.",
    name: "Clinton Venter",
    role: "Group SHEQ Manager",
    company: "Sandton Plant Hire",
    outcome: "Leagues ahead of any system the team has used",
  },
  {
    quote: "SHEQX® has become more than a reporting tool. It has transformed how we embed safety and accountability into our daily operations. Real-time insights give our teams the visibility to act fast and the confidence to maintain the highest environmental and compliance standards.",
    name: "Juan Dorfling",
    role: "Group Safety Manager",
    company: "Interwaste",
    outcome: "Enhanced executive oversight through real-time dashboards",
  },
  {
    quote: "We chose XGRC Software because of their deep understanding of compliance management and their ability to provide an integrated, digital solution. Since partnering with XGRC, we have not only achieved ISO certification but have also streamlined our compliance processes, allowing us to focus on strategic growth.",
    name: "Edward Heynes",
    role: "Group Executive: Business Excellence and Supply Chain",
    company: "Servest",
    outcome: "ISO 9001, 14001 & 45001 certified (Oct 2024)",
  },
  {
    quote: "Implementing SHEQX® has been a turning point in our compliance journey. We have not only digitised key processes but also gained real-time visibility into SHEQ performance across the group.",
    name: "Larna Jodamus",
    role: "Group Compliance Manager",
    company: "Commercial Cold Holdings",
    outcome: "Group-wide, real-time SHEQ visibility across all operations",
  },
  {
    quote: "SHEQX® empowers our teams to manage risk proactively. With better data and mobile functionality, we have created a safer, smarter operating environment.",
    name: "Jurie Schoeman",
    role: "Chief Operations Officer",
    company: "Commercial Cold Holdings",
    outcome: "Faster incident response and trend identification",
  },
  {
    quote: "From a finance and operations perspective, we needed a partner that could deliver more than just compliance. XGRC® gave us visibility, integration, and control. It's already paying off, in both accuracy and peace of mind.",
    name: "Petrus Roets",
    role: "Financial Director",
    company: "Sandton Plant Hire",
    outcome: "A smart investment in visibility and control",
  },
  {
    quote: "The encryption and secure access protocols within the XGRC platform have been instrumental in protecting our data. This level of security gives us confidence in meeting industry standards and ensuring that our stakeholders' information remains protected.",
    name: "Stuart Kader",
    role: "Group Digital Transformation & Technology Director",
    company: "Servest",
    outcome: "ISO 27001:2022-certified platform",
  },
  {
    quote: "The integration of ISO 9001 quality management into our SHEQX® platform was transformative. With support from GRC Link, we now consistently deliver superior products, significantly boosting our market competitiveness.",
    name: "Chad Cardoso",
    role: "Managing Director",
    company: "Vican Manufacturing",
    outcome: "40% reduction in product non-conformance",
  },
  {
    quote: "With the SHEQX® platform and ISO 9001 integration, supported by GRC Link, our operational processes have become streamlined and transparent, directly contributing to customer trust and operational efficiency.",
    name: "Ryan Palmer",
    role: "Operations Manager",
    company: "Vican Manufacturing",
    outcome: "70% reduction in compliance audit preparation time",
  },
  {
    quote: "Implementing XGRC solutions with GRC Link transformed our approach. We now manage compliance and quality proactively, enhancing our operational excellence significantly.",
    name: "Herford Dennis",
    role: "Managing Director",
    company: "TN Ceramics",
    outcome: "70% decrease in compliance reporting time",
  },
];

export const offices = [
  { city: 'Johannesburg', address: 'First Floor, York House, Tybalt Place, Waterfall Park, Bekker Rd, Midrand, 1685', phone: '+27 (0)87 802 0179' },
  { city: 'Cape Town', address: '7th Floor, The Cliffs, Niagara Road, Tyger Falls, Off Carl Cronje Drive, Tygervalley, Cape Town, 7530', phone: '+27 (0)87 802 0179' },
  { city: 'United Kingdom', address: 'Regus Milton Keynes, Atterbury Lakes, Fairbourne Drive, Milton Keynes, MK10 9RG', phone: '+44 161 706 1345' }
];
