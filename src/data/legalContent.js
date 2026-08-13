// =============================================================================
// Legal & Trust Centre document content.
// Ported from the live xgrcsoftware.com WordPress site (fetched 2026-07-08) so
// these pages can be recreated at their existing URLs with zero redirect risk.
// One factual correction applied throughout: the source site's DPA/data-hosting
// pages said "Primary Region: South Africa" for customer data hosting — this
// contradicted the Contract Framework page and Strategix's confirmed answer.
// Corrected here to Azure West Europe (Netherlands) — confirmed 2026-07-09 as
// the single region in use (no North Europe/Ireland).
// =============================================================================

const ENTITY = 'Strategix Application Solutions (Pty) Ltd';

export const legalDocs = {
  'privacy-policy': {
    title: 'Privacy Policy',
    version: '2.0',
    lastUpdated: '13 April 2026',
    effective: '30 April 2026',
    intro: `This Privacy Policy explains how ${ENTITY} collects, uses, stores, and protects personal information through its website, sales processes, and platform-related interactions.`,
    sections: [
      { h: '1. Scope', body: 'This policy applies to personal information collected through the XGRC® website, enquiry and proposal processes, and any platform-related interactions with prospects, customers, and other individuals who interact with Strategix. It does not cover personal information processed by Strategix as an Operator / Processor on behalf of its customers in connection with the XGRC® platform — that processing is governed by the Data Processing Addendum.' },
      { h: '2. Information We Collect', body: 'We may collect: contact details (name, email, telephone, job title); company and organisation information; communications and correspondence; website usage data; support and service records; and any personal information submitted through our forms or business processes.' },
      { h: '3. Why We Use Personal Information', body: 'We use personal information to manage enquiries, proposals, contracts, onboarding, support, billing, compliance, platform administration, and other lawful business purposes.' },
      { h: '4. Legal Basis', body: 'We process personal information in accordance with POPIA and, where applicable, equivalent data protection legislation. Where consent is required, we will request it separately.' },
      { h: '5. Sharing and Disclosure', body: 'We do not sell personal information. We may share personal information with service providers and subprocessors who support our business operations, subject to appropriate contractual safeguards. We may also disclose personal information where required by law.' },
      { h: '6. Security', body: 'We apply reasonable technical and organisational safeguards aligned to ISO 27001:2022 to protect personal information against loss, unauthorised access, disclosure, or misuse.' },
      { h: '7. Retention', body: 'We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, subject to lawful retention obligations.' },
      { h: '8. Data Subject Rights', body: 'You may request access to, correction of, or deletion of your personal information, or raise a privacy concern, using the process described on our Privacy Requests page.' },
      { h: '9. Changes', body: 'We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated effective date.' },
    ],
  },

  'cookie-policy': {
    title: 'Cookie Policy',
    version: '2.0',
    lastUpdated: '13 April 2026',
    intro: null,
    sections: [
      { h: '1. What Cookies Are', body: 'Cookies are small text files placed on your device by a website to support functionality, analytics, and preference management.' },
      { h: '2. Categories of Cookies', body: 'We may use strictly necessary cookies (required for the website to function), analytics cookies (to understand how visitors use our site), and preference cookies (to remember your settings). We do not deploy non-essential cookies without appropriate notice or consent where required by applicable law.' },
      { h: '3. Managing Preferences', body: 'You can manage cookies through your browser settings. Where implemented, you may also use the website cookie banner or preference centre to adjust your preferences.' },
      { h: '4. More Information', body: 'For more information about how we handle personal information collected through the website, please refer to our Privacy Policy.' },
    ],
  },

  'website-terms-of-use': {
    title: 'Website Terms of Use',
    version: '2.0',
    lastUpdated: '13 April 2026',
    intro: null,
    sections: [
      { h: '1. Application', body: 'These terms govern access to and use of the XGRC® website (xgrcsoftware.com). By using this website, you agree to these terms.' },
      { h: '2. Intellectual Property', body: `All website content, trade marks, branding, and materials are owned by or licensed to ${ENTITY} unless otherwise stated. No licence to use this content is granted except for personal, non-commercial informational use.` },
      { h: '3. Permitted Use', body: 'You may use this website for lawful informational purposes only. You may not copy, scrape, republish, disrupt, or misuse the website or its content.' },
      { h: '4. No Reliance', body: 'Website content is for general information only and does not constitute legal, regulatory, financial, or professional advice.' },
      { h: '5. External Links', body: 'Links to third-party websites are provided for convenience only. Strategix is not responsible for the content or practices of third-party sites.' },
      { h: '6. Changes', body: 'Strategix may update these terms from time to time by posting a revised version on this page.' },
      { h: '7. Governing Law', body: 'These terms are governed by the laws of the Republic of South Africa.' },
    ],
  },

  'data-processing-addendum': {
    title: 'Data Processing Addendum',
    version: '2.0',
    lastUpdated: '13 April 2026',
    effective: '30 April 2026',
    reference: 'XGRC-DPA-002',
    intro: 'This Data Processing Addendum is incorporated into the XGRC® SaaS Agreement by reference. It governs all processing of Personal Information by Strategix in connection with the XGRC® platform service.',
    sections: [
      { h: '1. Purpose and Scope', body: `This Data Processing Addendum ("DPA") governs the processing of Personal Information contained in Customer Data in connection with the XGRC® platform service ("Service") provided by ${ENTITY} ("Provider" or "Strategix") to the Customer identified in the applicable Proposal & Order Form. This DPA is intended to satisfy the requirements of a written operator agreement under section 21 of the Protection of Personal Information Act 4 of 2013 ("POPIA") and, where the General Data Protection Regulation (EU) 2016/679 ("GDPR") applies to the Customer's processing activities, to meet the processor agreement requirements of Article 28 GDPR.` },
      { h: '2. Definitions', list: [
        '"Business Days" means any day that is not a Saturday, Sunday, or public holiday in South Africa.',
        '"Customer Data" has the meaning given in the XGRC® SaaS Agreement.',
        '"Personal Information" has the meaning given in POPIA and, where applicable, equivalent terms in other applicable data protection legislation.',
        '"Processing" means any operation performed on Personal Information, including collection, storage, use, disclosure, transmission, and deletion.',
        '"Security Incident" means a confirmed breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Information.',
        '"Subprocessor" means any third party engaged by Strategix to process Personal Information in connection with the delivery of the Service.',
      ]},
      { h: '3. Roles of the Parties', body: 'The Customer acts as the Responsible Party / Controller and determines the purpose and means of processing Personal Information. Strategix acts as the Operator / Processor and processes Personal Information solely on behalf of and under the documented instructions of the Customer. The Customer is responsible for ensuring it has a lawful basis for processing and for compliance with its obligations as Responsible Party / Controller under applicable law.' },
      { h: '4. Scope of Processing', body: 'Strategix processes Personal Information only to the extent necessary to provide and support the Service, including: hosting and storage; system access and user management; technical support and maintenance; backup and recovery; and security monitoring and operations. The categories of Personal Information processed are determined by the Customer and may include employee, contractor, supplier, stakeholder, or other business-related records uploaded to or generated through the Service. Strategix shall process Personal Information only on documented instructions from the Customer.' },
      { h: '5. Customer Obligations', body: 'The Customer warrants that it has a lawful basis to process the relevant Personal Information and has obtained all required notices, consents, or authorisations where applicable; complies with its obligations as Responsible Party / Controller under applicable data protection law; remains responsible for the legality, quality, accuracy, and relevance of all Personal Information submitted to the Service; and will promptly notify Strategix of any change in instructions that may affect how Personal Information is processed.' },
      { h: '6. Provider Obligations', body: 'Strategix shall process Personal Information only on the Customer’s documented instructions and in accordance with this DPA; not use Personal Information for any independent purpose or disclose it to any third party except as necessary to deliver the Service or as required by applicable law; ensure that all personnel with access to Personal Information are subject to appropriate confidentiality obligations; and implement and maintain appropriate technical and organisational measures to protect Personal Information.' },
      { h: '7. Security Measures', body: 'Strategix maintains security measures aligned to ISO 27001:2022 certification, including access control and identity management; encryption of data in transit and at rest; security monitoring and logging; vulnerability management and patch management; and backup, recovery, and business continuity capabilities. Full details are available on our Cybersecurity & Data Protection Policy.' },
      { h: '8. Subprocessors', body: 'The Customer authorises Strategix to engage Subprocessors to support delivery of the Service, subject to the following conditions: Strategix imposes contractual obligations on Subprocessors that are no less protective than those in this DPA; Strategix remains responsible for the acts and omissions of its Subprocessors; a current list of Subprocessors is published on our Subprocessor List page; where a Subprocessor change is material, Strategix will provide not less than 10 Business Days’ advance notice; the Customer may raise a written objection to a new or changed Subprocessor on reasonable data protection grounds within 10 Business Days of notice.' },
      { h: '9. International Transfers', body: 'Personal Information may be processed in jurisdictions outside South Africa. Strategix ensures that appropriate safeguards are in place for any cross-border transfer, including contractual protections or other recognised mechanisms. Further information on data hosting is available on our Data Hosting page.' },
      { h: '10. Data Subject Rights', body: 'The Customer remains responsible for responding to data subject requests. Strategix will provide reasonable assistance where technically feasible and necessary, subject to applicable law. Strategix may charge a reasonable fee for assistance outside the scope of standard support.' },
      { h: '11. Security Incidents', body: 'Strategix will notify the Customer without undue delay, and within 72 hours of becoming aware of a confirmed Security Incident affecting Customer Data. Notification will include, to the extent available: the nature of the incident; categories and approximate number of affected data subjects and records; likely consequences; and remediation steps. Strategix is not responsible for Security Incidents arising from the Customer’s own configuration, access control decisions, or acts of the Customer’s users, or from systems outside Strategix’s control.' },
      { h: '12. Data Retention and Deletion', body: 'On termination or expiry of the SaaS Agreement: the Customer may request a copy of its Customer Data within 30 days of termination. Strategix will delete or irreversibly anonymise Personal Information within 90 days of the termination date, subject to lawful retention obligations and the standard backup retention cycle. Personal Information retained in backup systems remains subject to the obligations of this DPA until overwritten.' },
      { h: '13. Audit and Compliance', body: 'Strategix maintains ISO 27001:2022 certification. On reasonable written request, Strategix will make available relevant certifications, audit summaries, or control statements as evidence of compliance. On-site audits are not permitted except where required by applicable law or agreed in writing, subject to confidentiality, security, scope, and cost controls.' },
      { h: '14. Liability', body: 'Liability relating to data protection under this DPA is governed by the limitation of liability provisions of the XGRC® SaaS Agreement. Nothing in this DPA increases or expands Strategix’s liability beyond those limits.' },
      { h: '15. Updates to this DPA', body: 'Strategix may update this DPA to reflect legal or regulatory changes, operational improvements, or security enhancements. Material changes will be communicated to Customers not less than 30 days before the effective date. Continued use of the Service after the effective date constitutes acceptance of the updated DPA.' },
      { h: '16. Governing Law', body: 'This DPA is governed by the laws of the Republic of South Africa and is subject to the same dispute resolution provisions as the XGRC® SaaS Agreement.' },
    ],
  },

  'end-user-licence-agreement': {
    title: 'End User Licence Agreement',
    version: '1.0',
    lastUpdated: '13 August 2026',
    effective: '13 August 2026',
    reference: 'XGRC-EULA-001',
    intro: `This End User Licence Agreement ("EULA") governs your individual use of the XGRC® platform as an Authorised User. It applies to you personally, in addition to (not instead of) the XGRC® SaaS Agreement, Data Processing Addendum, and Acceptable Use Policy already in force between ${ENTITY} and your employer or organisation ("Customer"). You must accept this EULA the first time you log in to the platform.`,
    sections: [
      { h: '1. Who This Applies To', body: `This EULA applies to every individual who is granted access to the XGRC® platform as an Authorised User under a Customer's active subscription. It does not replace the XGRC® SaaS Agreement between ${ENTITY} and the Customer — that agreement, and the policies incorporated into it by reference (the Data Processing Addendum, Acceptable Use Policy, and Support Policy), continue to govern the relationship between the Customer and Strategix. This EULA specifically covers your personal acceptance, as an individual, of the obligations that already apply to Authorised Users under those documents.` },
      { h: '2. Licence Grant', body: 'Subject to your compliance with this EULA and the Acceptable Use Policy, Strategix grants you a personal, non-exclusive, non-transferable, revocable right to access and use the XGRC® platform for the duration of your authorisation by the Customer, solely for the lawful business purposes for which the Customer licensed the Service. This licence does not grant you any ownership interest in the platform, and terminates automatically if your authorisation is revoked by the Customer or if the Customer\'s subscription ends.' },
      { h: '3. Your Obligations', body: 'By using the platform, you agree to comply with the Acceptable Use Policy in full. In summary, you must: keep your login credentials confidential and never share them; use the platform only for the purposes authorised by the Customer; not attempt to access data, accounts, or areas of the platform you have not been authorised to use; not attempt to circumvent, probe, or disrupt the platform\'s security; and promptly report any suspected security issue or misuse. The full list of permitted and prohibited use is set out in the Acceptable Use Policy, which forms part of your obligations under this EULA.' },
      { h: '4. Personal Information About You', body: `${ENTITY} processes limited personal information about you directly — your name, email address, role, and platform activity — in order to provide you with access to the platform, administer your account, and maintain security and audit records. This processing is described in our Privacy Policy. Separately, any Customer Data you enter into or access through the platform in the course of your work (which may include personal information about other individuals) is processed by Strategix strictly on the Customer's instructions, as described in the Data Processing Addendum — Strategix does not use that data for its own purposes.` },
      { h: '5. Your Rights', body: 'You have rights in relation to your own personal information under POPIA and, where applicable, the GDPR — including the right to request access, correction, or deletion. These rights, and how to exercise them, are described on our Privacy Requests page. Our PAIA Manual explains more broadly how you or any member of the public may request access to records we hold.' },
      { h: '6. Intellectual Property', body: `All rights, title, and interest in the XGRC® platform, including its software, design, trade marks, and documentation, are owned by or licensed to ${ENTITY}. Nothing in this EULA transfers any such rights to you. You may not copy, reverse engineer, or attempt to derive the source code of the platform.` },
      { h: '7. No Individual Warranty', body: 'The platform is provided to you under the Customer\'s subscription with Strategix. Strategix gives no warranty to you individually beyond what is set out in the SaaS Agreement between Strategix and the Customer; your use of the platform is subject to the service levels, support terms, and limitations of liability agreed between Strategix and the Customer.' },
      { h: '8. Termination of Your Access', body: 'Your right to access the platform ends automatically if the Customer revokes your authorisation, if you leave the Customer\'s organisation, or if the Customer\'s subscription with Strategix ends or is suspended. Strategix may also suspend or terminate your individual access, without prior notice where necessary, if you breach this EULA or the Acceptable Use Policy, consistent with the enforcement provisions of the Acceptable Use Policy.' },
      { h: '9. Changes to this EULA', body: 'Strategix may update this EULA from time to time to reflect changes in the platform, our policies, or applicable law. Where a change is material, we will take reasonable steps to bring it to your attention, which may include asking you to re-accept this EULA at your next login.' },
      { h: '10. Governing Law', body: 'This EULA is governed by the laws of the Republic of South Africa.' },
      { h: '11. Related Documents', body: 'This EULA should be read together with our Privacy Policy, Acceptable Use Policy, PAIA Manual, and Data Processing Addendum, all available on our Legal Hub.' },
    ],
  },

  'acceptable-use-policy': {
    title: 'Acceptable Use Policy',
    version: '2.0',
    lastUpdated: '13 April 2026',
    effective: '30 April 2026',
    reference: 'XGRC-AUP-002',
    intro: 'This Acceptable Use Policy ("AUP") is incorporated into the XGRC® SaaS Agreement by reference. It governs permitted and prohibited use of the XGRC® platform by the Customer and its Authorised Users.',
    sections: [
      { h: '1. Purpose', body: 'This AUP defines the standards of acceptable use that apply to all access to and use of the XGRC® platform ("Service"). By signing the Proposal & Order Form, the Customer accepts this AUP on behalf of itself and all its Authorised Users.' },
      { h: '2. Permitted Use', list: [
        'For lawful internal business purposes within the scope of the Customer’s licensed activities;',
        'By Authorised Users in accordance with the licence types and quantities set out in the Customer’s Proposal & Order Form; and',
        'In compliance with all applicable laws, regulations, and the terms of the XGRC® SaaS Agreement.',
      ]},
      { h: '3. Prohibited Use', list: [
        'Attempt to gain unauthorised access to the Service, its infrastructure, or any data belonging to another customer;',
        'Interfere with or disrupt the security, integrity, availability, or performance of the Service;',
        'Introduce malicious code, viruses, worms, or any harmful content into the Service;',
        'Probe, scan, or test the vulnerability of the Service or any related infrastructure without prior written authorisation from Strategix;',
        'Reverse engineer, decompile, disassemble, or attempt to derive the source code, architecture, or logic of the Service;',
        'Copy, reproduce, or distribute any part of the Service outside of the permitted use scope;',
        'Remove or alter any proprietary notices, trade marks, or branding in or on the Service;',
        'Use the Service to develop, benchmark, or evaluate a competing product or service;',
        'Share login credentials or allow access by persons who are not Authorised Users;',
        'Create accounts for automated access or bots without prior written approval;',
        'Use another user’s credentials or impersonate any person;',
        'Upload, transmit, or store content that is unlawful, infringing, abusive, threatening, defamatory, or deceptive;',
        'Use the Service to process data that the Customer does not have lawful authority to process;',
        'Use the Service for any purpose that would violate applicable data protection law; or',
        'Use the Service in a manner that creates an unreasonable or disproportionate load on the infrastructure or that impairs the experience of other customers.',
      ]},
      { h: '4. Customer Responsibility', body: 'The Customer is responsible for ensuring that all Authorised Users are aware of and comply with this AUP; maintaining appropriate access controls, including promptly revoking access for users who leave the organisation or no longer require access; the conduct of its Authorised Users as if such conduct were the Customer’s own; and promptly notifying Strategix if it becomes aware of any actual or suspected breach of this AUP.' },
      { h: '5. Enforcement', body: 'Strategix may investigate suspected breaches of this AUP. Where Strategix reasonably believes a breach has occurred or is imminent, Strategix may suspend or restrict the Customer’s access to the Service immediately, without prior notice, where necessary to protect the Service, other customers, or third parties; remove or quarantine content that violates this AUP; report suspected unlawful activity to relevant authorities; and terminate the SaaS Agreement in accordance with its terms. Strategix will limit any suspension to what is reasonably necessary and will restore access as soon as the relevant issue is resolved.' },
      { h: '6. Reporting', body: 'Suspected security vulnerabilities, misuse, or breaches of this AUP should be reported to Strategix through the support channel or security contact details published on the XGRC® website. Strategix will investigate all reports in good faith and treat them as confidential.' },
      { h: '7. Updates', body: 'Strategix may update this AUP from time to time. Material changes will be communicated to Customers not less than 30 days before the effective date. Continued use of the Service after the effective date constitutes acceptance of the updated AUP.' },
    ],
  },

  'support-policy': {
    title: 'Support Policy',
    version: '2.0',
    lastUpdated: '13 April 2026',
    effective: '30 April 2026',
    reference: 'XGRC-SUP-002',
    intro: 'This Support Policy is incorporated into the XGRC® SaaS Agreement by reference. It describes how Customers request support and how Strategix classifies and responds to support issues.',
    sections: [
      { h: '1. Scope', body: 'This policy applies to all Customers with an active XGRC® SaaS subscription. It covers the logging, classification, and handling of support requests relating to the XGRC® platform. It does not apply to requests arising from the Customer’s own configuration errors, user error, or misuse; custom development or integrations not supported under the standard product; or third-party systems outside Strategix’s control.' },
      { h: '2. Support Channels', body: 'Support requests must be submitted through the XGRC® in-platform support portal. If the platform is unavailable, requests may be submitted via the helpdesk contact details published on the XGRC® website. Strategix does not accept support commitments made outside these channels.' },
      { h: '3. Severity Classification', table: {
        headers: ['Severity', 'Definition'],
        rows: [
          ['Severity 0', 'Confirmed or suspected security breach or active vulnerability affecting the platform or Customer Data'],
          ['Severity 1', 'All users are unable to use the platform due to a platform fault (complete service outage)'],
          ['Severity 2', 'Users are unable to use a specific module or major function due to a platform fault'],
          ['Severity 3', 'Users can use the system or module but require a workaround due to a defect'],
          ['Severity 4', 'Minor defect with limited user impact; workaround is available or impact is cosmetic'],
          ['Severity 5', 'Enhancement request, question, or issue that does not materially affect usage'],
        ],
      }},
      { h: '4. Initial Response Targets', table: {
        headers: ['Severity', 'Initial Response Target', 'Coverage'],
        rows: [
          ['Severity 0', 'Within 4 hours', '24 hours / 7 days'],
          ['Severity 1', 'Within 6 hours', 'Business hours + on-call escalation'],
          ['Severity 2', 'Within 24 hours', 'Business hours'],
          ['Severity 3', 'Within 3 Business Days', 'Business hours'],
          ['Severity 4', 'Within 6 Business Days', 'Business hours'],
          ['Severity 5', 'Within 6 Business Days', 'Business hours'],
        ],
      }},
      { h: '5. Resolution Approach', body: 'Strategix will use reasonable endeavours to resolve issues in a timely manner: providing status updates at reasonable intervals appropriate to the severity; documenting known workarounds where available; escalating unresolved Severity 1 and Severity 2 issues to senior engineering and management within 24 hours of the initial response; and notifying the Customer if resolution requires development work or third-party involvement.' },
      { h: '6. Exclusions', body: 'Response targets do not apply to issues arising from the Customer’s own configuration, data quality, or access control decisions; acts or omissions of the Customer’s users; integrations, APIs, or third-party systems outside the XGRC® platform; events of force majeure; or unauthorised changes made to the Customer’s environment.' },
      { h: '7. Support Hours', body: 'Standard support hours are Monday to Friday, 08:00 to 17:00 South African Standard Time (SAST), excluding South African public holidays. Severity 0 issues are monitored and responded to on an on-call basis outside standard hours.' },
      { h: '8. Planned Maintenance', body: 'Strategix will provide at least 48 hours’ prior notice for maintenance expected to cause material service impact. Emergency maintenance required for urgent security issues may be performed without prior notice.' },
      { h: '9. Updates', body: 'Strategix may update this Support Policy from time to time. Material changes will be communicated to Customers not less than 30 days before the effective date.' },
    ],
  },

  'paia-manual': {
    title: 'PAIA Manual',
    version: '1.03',
    lastUpdated: '27 June 2025',
    reference: 'Section 51 of PAIA',
    intro: `Prepared in terms of section 51 of the Promotion of Access to Information Act No. 2 of 2000 ("PAIA"), as amended. This manual explains what records ${ENTITY} holds, how to request access to them, and how personal information is processed in connection with the XGRC® platform.`,
    sections: [
      { h: 'Purpose of this Manual', list: [
        'Check the categories of records held by the body that are available without submitting a formal PAIA request.',
        'Understand the process of requesting access to a record of the body.',
        'Know the records available in accordance with other legislation.',
        'Access contact details of the Information Officer and Deputy Information Officers.',
        'Find out how to obtain the PAIA Guide compiled by the Information Regulator.',
        'Understand if and how personal information is processed, the purpose thereof, and related data subject categories.',
        'Know to whom personal information may be supplied, including transborder disclosures.',
        'Understand the body’s security measures to ensure confidentiality, integrity, and availability of personal information.',
      ]},
      { h: 'Key Contact Details for Access to Information', table: {
        headers: ['Role', 'Name', 'Contact'],
        rows: [
          ['Information Officer', 'Jacob O’Brien', 'paia@strategix.co.za · +27 87 802 0179'],
          ['Deputy Information Officer', 'Deneys Minne', 'paia@strategix.co.za · +27 87 802 0179'],
          ['Deputy Information Officer', 'Stan O’Brien', 'paia@strategix.co.za · +27 87 802 0179'],
        ],
      }},
      { h: 'General Contact & Head Office', body: 'General access to information requests: paia@strategix.co.za. Head office — Physical: York House Block A Unit 5, Tybalt Place, Waterfall Office Park, Midrand. Postal: PO Box 11208, Aston Manor, 1630. Telephone: +27 87 802 0179. Website: www.strategix.co.za.' },
      { h: 'Guide on How to Use PAIA', body: 'The Information Regulator has compiled a PAIA Guide, available in all official languages and in braille, explaining how to exercise any right contemplated in PAIA and POPIA. It is accessible on the Information Regulator’s website at justice.gov.za/inforeg, or on request.' },
      { h: 'Categories of Records Automatically Available', list: [
        'Marketing brochures and company profiles.',
        'Privacy Policy, End User Licence Agreement, Cybersecurity & Data Protection Policy, and Release Notes.',
        'This approved PAIA Manual.',
      ]},
      { h: 'Records Available in Terms of Other Legislation', list: [
        'Memorandum of Incorporation — Companies Act 71 of 2008.',
        'PAIA Manual — Promotion of Access to Information Act 2 of 2000.',
        'Data Processing Records, Consent Logs — POPIA 4 of 2013.',
        'ISMS Documentation — ISO/IEC 27001:2022.',
      ]},
      { h: 'Subjects and Categories of Records Held', list: [
        'Employee and contractor records, training logs, access rights, and related records.',
        'Compliance and legal requirement information.',
        'Stakeholder master data: community, partner, supplier, customer, government, shareholder, and union.',
      ]},
      { h: 'Purpose of Processing Personal Information', body: 'Personal information is processed to enable secure delivery of cloud-based GRC services, facilitate user access and support, conduct audits and incident response, and ensure legal and contractual compliance under ISO 27001, GDPR, and POPIA.' },
      { h: 'Categories of Data Subjects and Information Processed', list: [
        'Clients/Customers — name, contact details, organisation information, access logs, encrypted data.',
        'Employees — name, race, gender, job title, access rights, training and audit records.',
        'Vendors/Service Providers — company details, regulatory compliance status, audit data.',
      ]},
      { h: 'Recipients of Personal Information', list: [
        'Client/user information — Support Team, Microsoft Azure (data hosting).',
        'Platform/system events — Security Operations Centre (SOC), Internal Audit, ISO auditors.',
        'ISMS documents — Information Regulator (upon request), Executive Management.',
        'Vendor details and qualifications — Internal Finance Team, External Auditors.',
      ]},
      { h: 'Transborder Data Flows', body: 'Strategix stores and processes data within Microsoft Azure’s Europe-West (Netherlands) region. This includes user platform data, backups, access logs, and encrypted personal information. All data is protected under international security and compliance frameworks.' },
      { h: 'Information Security Safeguards', body: 'The organisation implements a certified ISO 27001:2022 Information Security Management System (ISMS), including 256-bit Rijndael encryption, 24/7 SOC monitoring, daily vulnerability assessments, SIEM/SOAR systems, quarterly disaster recovery testing, multi-factor authentication, and the least-access principle for all user roles.' },
      { h: 'Availability of this Manual', list: [
        'On the XGRC® Software website (this page).',
        'By formal request to the Information Officer or a Deputy Information Officer.',
      ]},
      { h: 'Updating of the Manual', body: 'This manual is reviewed and updated regularly by the Information Officer to ensure ongoing compliance with internal policies, ISO 27001, PAIA and POPIA.' },
      { h: 'Declaration', body: 'This PAIA Manual has been compiled and authorised by Jacob O’Brien (Information Officer, Chief Executive Officer), Deneys Minne (Deputy Information Officer) and Stan O’Brien (Deputy Information Officer) of Strategix Application Solutions (Pty) Ltd.' },
    ],
  },

  'privacy-requests': {
    title: 'Privacy Requests',
    version: '2.0',
    lastUpdated: '13 April 2026',
    intro: 'If you wish to exercise your rights under applicable data protection law — including requesting access to, correction of, or deletion of personal information held about you — please submit your request in writing to the Information Officer at the contact details below.',
    sections: [
      { h: 'Information Officer Contact', body: 'info@xgrcsoftware.com' },
      { h: 'Submission Requirements', list: [
        'Your full name and contact details.',
        'Sufficient information to identify the specific personal information in question.',
        'The nature of your request (e.g., access, correction, or deletion).',
        'Proof of identity where reasonably required to protect your information and prevent unauthorised disclosure.',
      ]},
      { h: 'Response', body: 'Strategix will review and respond to all requests in accordance with applicable law and within a reasonable period.' },
    ],
  },

  'contract-framework': {
    title: 'Contract Framework',
    version: null,
    lastUpdated: '13 April 2026',
    intro: 'A plain-language map of how the XGRC® customer journey, contract documents, and renewal terms fit together — from first contact through to renewal or termination.',
    sections: [
      { h: 'Customer Journey', steps: [
        { n: 1, title: 'First contact — protect confidentiality', body: 'Before any platform information, pricing, or architecture is shared, both parties sign the NDA (v4.0, XGRC-NDA-004). This protects XGRC® IP during the entire evaluation phase.' },
        { n: 2, title: 'Discovery — capture requirements', body: 'The customer completes the Business Landscape document, recording requirements, user counts, modules needed, and integrations. Strategix uses this for configuration, scoping, and pricing. The customer warrants its accuracy under SaaS Agreement clause 6.1.' },
        { n: 3, title: 'Commercial agreement — price and scope', body: 'Strategix issues the Proposal & Order Form (v2.0, XGRC-PRO-002, 30-day validity) with all commercial terms — pricing, licence structure, term, and renewal basis. On signature by both parties it becomes the binding Order Form and the subscription begins.' },
        { n: 4, title: 'Legal framework — signed once', body: 'The SaaS Agreement (v4.0, XGRC-SAAS-004, 21 clauses) is signed alongside the Proposal at deal close. By signing, the customer accepts the Data Processing Addendum and all Website Policies by reference — no separate click-throughs required for any operational policy.' },
        { n: 5, title: 'Onboarding & go-live', body: 'Platform access is provisioned per the Business Landscape. Any changes to scope after signature require formal change control and may affect price and timelines. The Support Policy governs all support from day one.' },
        { n: 6, title: 'Active subscription — ongoing obligations', body: 'Both parties operate under the SaaS Agreement for the term. Website Policies can be updated on 30 days’ notice without re-signing. Annual fee adjustments apply from 1 March each year on 30 days’ written notice.' },
        { n: 7, title: 'Renewal', body: 'Auto-renews unless 60 days’ written notice is given before term end. A new Proposal is issued only if pricing or scope changes — the SaaS Agreement continues without re-signing.' },
        { n: 8, title: 'Termination', body: 'Either party may terminate per the SaaS Agreement. There is a 30-day data export window; all outstanding fees become immediately due and payable; certain key clauses survive termination.' },
      ]},
      { h: 'Document Anatomy', table: {
        headers: ['Document', 'Reference', 'Notes'],
        rows: [
          ['Non-Disclosure Agreement', 'XGRC-NDA-004', '16 clauses · 2-year term · 5-year survival of trade secret obligations'],
          ['Business Landscape', 'Internal scoping document', 'Customer completes all fields · no signature required · accuracy warranted by customer'],
          ['Proposal & Order Form', 'XGRC-PRO-002', '10 sections · 30-day validity · becomes binding Order Form on signature'],
          ['SaaS Agreement', 'XGRC-SAAS-004', '21 clauses · master legal framework · signed once · incorporates DPA + 5 Website Policies by reference'],
          ['Data Processing Addendum', 'XGRC-DPA-002', '16 clauses · accepted via SaaS Agreement cl.18.2 · no separate signature · satisfies POPIA s.21'],
        ],
      }},
      { h: 'Key Triggers & Consequences', table: {
        headers: ['Trigger', 'Clause', 'What Happens'],
        rows: [
          ['Non-payment', 'SaaS cl.9.4', 'Day 31: written reminder. Day 45: suspension on notice. Day 60+: termination right on 7 Business Days’ notice. All outstanding fees immediately due on termination.'],
          ['Immediate suspension', 'SaaS cl.16', 'Security incident, material AUP breach, or continued access exposing Strategix to legal liability — customer notified as soon as reasonably practicable after suspension.'],
          ['Termination for cause', 'SaaS cl.11.1', 'Material breach not remedied within 14 Business Days of written notice, or insolvency/liquidation/business rescue — all fees for the remainder of any fixed term become immediately due.'],
          ['Security incident', 'DPA cl.11', 'Customer notified within 72 hours of a confirmed breach, including nature of incident, data categories affected, and remediation steps.'],
          ['Subprocessor change', 'DPA cl.8', '10 Business Days’ advance notice for material changes; customer may object in writing within 10 Business Days on data protection grounds.'],
        ],
      }},
      { h: 'Renewal & Pricing', body: 'Strategix sends a renewal notification at Day −60 confirming fees for the next period. No response results in auto-renewal on the same term. If pricing changes, a new Proposal is issued and the customer signs only that — the SaaS Agreement, DPA and Website Policies all continue automatically without re-signing. Annual price adjustments take effect from 1 March each year on not less than 30 days’ prior written notice, and may reflect inflation, operating cost increases, subprocessor cost changes, service enhancements, and market conditions.' },
    ],
  },
};

// Trust Centre sub-pages — separate from legalDocs since they live under /trust/, not /legal/.
export const trustDocs = {
  subprocessors: {
    title: 'Subprocessor List',
    version: '2.0',
    lastUpdated: '13 April 2026',
    effective: '30 April 2026',
    intro: 'This page identifies the subprocessors engaged by Strategix to support delivery of the XGRC® platform. It is maintained in accordance with the Data Processing Addendum.',
    sections: [
      { h: 'Current Subprocessors', table: {
        headers: ['Subprocessor', 'Region', 'Purpose', 'Data Categories'],
        rows: [
          ['Microsoft Corporation (Azure)', 'West Europe (Netherlands)', 'Cloud hosting, infrastructure, and storage.', 'Customer Data including Personal Information.'],
          ['Microsoft Corporation (Microsoft 365)', 'West Europe (Netherlands)', 'Email delivery and system notifications.', 'Contact details and system-generated communications.'],
        ],
      }},
      { h: 'Updates', body: 'Strategix may update this list from time to time. Where a change is material, Strategix will notify affected customers with not less than 10 Business Days’ advance notice in accordance with the Data Processing Addendum. Customers may raise a written objection to a new or changed subprocessor on reasonable data protection grounds within 10 Business Days of receiving notice.' },
    ],
  },
  'data-hosting': {
    title: 'Data Hosting',
    version: '2.0',
    lastUpdated: '13 April 2026',
    intro: 'This page provides information on where Customer Data is hosted and processed in connection with the XGRC® platform.',
    sections: [
      { h: '1. Primary Hosting Location', body: 'Customer Data is hosted on Microsoft Azure, in the West Europe (Netherlands) region. Azure’s infrastructure holds its own ISO 27001, ISO 27017, ISO 27018 and SOC 2 Type II certifications.' },
      { h: '2. Subprocessor Locations', body: 'Customer Data may also be processed by Strategix’s subprocessors in the jurisdictions listed on the Subprocessor List. These subprocessors provide critical services such as email delivery, logging, and security monitoring.' },
      { h: '3. Cross-Border Transfers', body: 'Where Personal Information is transferred outside South Africa, Strategix ensures that appropriate safeguards are in place in accordance with the Data Processing Addendum and applicable data protection legislation. This includes ensuring that recipients are subject to laws or agreements that provide an adequate level of protection.' },
    ],
  },
  'cybersecurity-data-protection-policy': {
    title: 'Cybersecurity & Data Protection Policy',
    version: '2.0',
    lastUpdated: '13 April 2026',
    effective: '30 April 2026',
    reference: 'XGRC-SEC-002',
    intro: 'This policy is incorporated into the XGRC® SaaS Agreement by reference (in part) and documents Strategix’s security controls and data protection approach.',
    sections: [
      { h: '1. Security Governance', body: 'Strategix maintains an information security management programme aligned to ISO 27001:2022 and generally accepted industry practices. Our programme includes documented policies, defined roles and responsibilities, regular risk assessments, and ongoing monitoring and improvement.' },
      { h: '2. Platform Security', list: [
        'Access Control — Role-based access management, principle of least privilege, and multi-factor authentication for administrative access.',
        'Logical Segregation — Multi-tenant architecture with strict data isolation between customers.',
        'Encryption — Data encrypted in transit (TLS 1.2+) and at rest using industry-standard algorithms.',
        'Monitoring and Logging — Security event monitoring, audit logging, and alerting.',
        'Vulnerability Management — Regular vulnerability scanning, patch management, and penetration testing.',
        'Change Management — Documented change control processes for all platform changes.',
      ]},
      { h: '3. Operational Resilience', body: 'Strategix maintains business continuity and disaster recovery capabilities appropriate to the XGRC® platform service model, including regular data backups with tested recovery procedures; documented incident response procedures; and capacity management and performance monitoring.' },
      { h: '4. Data Protection', body: 'Strategix supports customer compliance by applying appropriate safeguards to Personal Information processed in connection with the Service; operating under the customer’s documented instructions in accordance with the Data Processing Addendum; and maintaining ISO 27001:2022 certification as evidence of our security posture.' },
      { h: '5. Security Incidents', body: 'Confirmed security incidents affecting customer Personal Information are handled through documented response procedures and notified to affected customers in accordance with the Data Processing Addendum and applicable law.' },
      { h: '6. Independent Assurance', body: 'Strategix maintains ISO 27001:2022 certification. On reasonable written request, Strategix will provide relevant certifications, audit summaries, or control statements, subject to confidentiality and security controls. On-site audits are not available as a standard offering; refer to the Data Processing Addendum for the applicable audit framework.' },
    ],
  },
};

export const accessibilityStatement = {
  title: 'Accessibility Statement',
  version: '2.0',
  lastUpdated: '30 April 2026',
  intro: null,
  sections: [
    { h: null, body: 'Strategix is committed to improving the accessibility and usability of the XGRC® website and platform. We aim to support recognised accessibility practices and to improve accessibility over time through design, review, and remediation.' },
    { h: null, body: 'If you experience accessibility barriers or wish to request content in an alternative format, please contact us using the support or privacy contact details published on the website.' },
  ],
};
