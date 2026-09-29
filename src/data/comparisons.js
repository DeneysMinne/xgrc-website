// Comparison pages: XGRC® vs a named alternative (SEO Fix Spec T12, T16).
//
// One entry per page. While `draft: true`, the page builds only at
// /preview/compare/<slug>/ (noindex, not in the sitemap, not linked), so the
// facts can be reviewed. Set `draft: false` to publish at /compare/<slug>/,
// add it to the sitemap and link it from the pages in `linkFrom`.
//
// Rules: never state a fact about a competitor that has not been confirmed.
// Anything unconfirmed is written as "[CONFIRM: what is needed]". The build
// fails if a published (draft: false) comparison still contains "[CONFIRM".

export const comparisons = [
  {
    slug: 'xgrc-vs-velocityehs',
    draft: true,
    competitor: 'VelocityEHS',
    lastReviewed: '2026-09-29',
    linkFrom: ['sheqx', 'grc-software'],
    title: 'XGRC® vs VelocityEHS | SHEQ & GRC Software Compared',
    metaDescription: 'XGRC® vs VelocityEHS compared: who each suits, features, local support and data residency, pricing model and implementation time.',
    h1: 'XGRC® vs VelocityEHS',
    intro: 'Both XGRC® and VelocityEHS help organisations manage safety, health and environmental obligations. They take different approaches, and they suit different organisations. This comparison sets out the differences plainly so you can decide which fits.',
    suits: {
      xgrc: [
        'Organisations that want SHEQ, enterprise risk, compliance, ESG and cyber on one platform and one set of records',
        'South African and African operations that need local legislation such as the OHS Act, the MHSA and NEMA built in',
        'Teams that want local implementation and support in the same time zone',
      ],
      competitor: [
        '[CONFIRM: the type and size of organisation VelocityEHS is best suited to]',
        '[CONFIRM: the regions VelocityEHS mainly serves]',
        '[CONFIRM: any area where VelocityEHS is the stronger choice]',
      ],
    },
    features: [
      { feature: 'Incident management and investigations', xgrc: 'Yes, in SHEQX®', competitor: '[CONFIRM]' },
      { feature: 'Audits and inspections', xgrc: 'Yes, in SHEQX® with mobile checklists', competitor: '[CONFIRM]' },
      { feature: 'Risk assessment and hazard identification', xgrc: 'Yes, in SHEQX®', competitor: '[CONFIRM]' },
      { feature: 'Environmental monitoring and obligations', xgrc: 'Yes, in ENVIRX®', competitor: '[CONFIRM]' },
      { feature: 'Chemical and safety data sheet management', xgrc: '[CONFIRM: XGRC® capability]', competitor: '[CONFIRM]' },
      { feature: 'Ergonomics', xgrc: '[CONFIRM: XGRC® capability]', competitor: '[CONFIRM]' },
      { feature: 'Enterprise risk management (ISO 31000, COSO)', xgrc: 'Yes, in ERM', competitor: '[CONFIRM]' },
      { feature: 'ESG reporting', xgrc: 'Yes, in the ESG solution', competitor: '[CONFIRM]' },
      { feature: 'Contractor and supplier compliance', xgrc: 'Yes, in Compliance Hub', competitor: '[CONFIRM]' },
      { feature: 'Information security (ISO 27001)', xgrc: 'Yes, in MSXCyber®', competitor: '[CONFIRM]' },
      { feature: 'Governed AI assistant', xgrc: 'Yes, MAIA®', competitor: '[CONFIRM]' },
      { feature: 'Mobile app', xgrc: 'Yes, SHEQX® apps for iOS and Android', competitor: '[CONFIRM]' },
      { feature: 'South African legislation (OHS Act, MHSA, NEMA)', xgrc: 'Built in', competitor: '[CONFIRM]' },
    ],
    sections: [
      {
        heading: 'Local support and data residency',
        xgrc: 'XGRC® is built and supported by Strategix, with offices in Johannesburg, Cape Town and the United Kingdom, and implementation partners across Africa. The platform is certified to ISO 27001:2022 by BSI and hosted on Microsoft Azure [CONFIRM: Azure region used for South African customer data].',
        competitor: '[CONFIRM: where VelocityEHS support is based, and where customer data is hosted]',
      },
      {
        heading: 'Pricing model',
        xgrc: 'Annual licensing by tier (Standard, Plus and Enterprise) and seat type, with modules chosen per organisation. South African customers are quoted in rand.',
        competitor: '[CONFIRM: VelocityEHS pricing model and currency]',
      },
      {
        heading: 'Implementation time',
        xgrc: '[CONFIRM: typical XGRC® implementation time for a first module]',
        competitor: '[CONFIRM: typical VelocityEHS implementation time]',
      },
    ],
    faqs: [
      { q: 'Is XGRC® an alternative to VelocityEHS?', a: 'Yes. Both cover environment, health and safety management. XGRC® also brings enterprise risk, compliance, ESG and information security onto the same platform, which suits organisations that want one system of record for governance, risk and compliance.' },
      { q: 'Does XGRC® support South African legislation?', a: 'Yes. XGRC® supports obligations under South African laws such as the Occupational Health and Safety Act, the Mine Health and Safety Act and the National Environmental Management Act, alongside ISO 45001, 14001 and 9001.' },
      { q: 'Can we see XGRC® before deciding?', a: 'Yes. Book a demo and an XGRC® specialist will walk you through the platform using your own processes and requirements.' },
    ],
  },
];

export const publishedComparisons = comparisons.filter((c) => !c.draft);
export const draftComparisons = comparisons.filter((c) => c.draft);

for (const c of publishedComparisons) {
  if (JSON.stringify(c).includes('[CONFIRM')) {
    throw new Error(`Comparison ${c.slug} is published (draft: false) but still contains [CONFIRM] placeholders`);
  }
}
