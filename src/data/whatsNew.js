// GENERATED FILE -- do not hand-edit.
// Produced by scripts/sync-release-notes.mjs from XRM's and XLOGIC's own
// databases (rows flagged public_facing in each). Re-run that script to
// refresh; the hourly cron job (see xgrc-scheduled-deploys/) already does
// this automatically.

export const whatsNew = {
  "xrm": [
    {
      "version": "1.64.0",
      "date": "2026-08-17",
      "category": "new",
      "title": "Bulk-import your Price Lists",
      "description": "Load price tiers, licence rates, and volume discounts from an Excel file instead of creating them one at a time. Find it on Maintenance > Pricing > Price Lists > Import."
    },
    {
      "version": "1.63.10",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Small polish across Quotes, Calendar, Users, and Dashboard",
      "description": "Quotes no longer show an FX refresh option when already in your home currency. Calendar's Month view now tells you when a month has nothing scheduled. Users & Licenses has quick tooltips explaining Role vs License. Dashboard empty states across the board now show a matching icon instead of plain text."
    },
    {
      "version": "1.63.8",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Upload documents to an Account, not just a Contact",
      "description": "Accounts now have the same document upload and linking tools Contacts already had, so contracts, proposals, and other files can live directly on the company record."
    },
    {
      "version": "1.63.7",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Territories can now have a default catch-all",
      "description": "If you have more than one territory, you can mark one as the Default so new leads and accounts that do not match any rule land there automatically instead of being left with a blank territory."
    },
    {
      "version": "1.63.6",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Clearer pipeline stage deletion, a Subscription billing option, tidier admin dialogs",
      "description": "Deleting a pipeline stage now tells you upfront exactly how many opportunities are in it, instead of a vague warning. Subscription is now available as a billing type everywhere it was previously missing. Create/Save buttons across Maintenance are now consistent, and the Quotas page no longer clips on narrower screens."
    },
    {
      "version": "1.63.5",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Stuck-in-stage deals now flagged, report tabs show your position, cleaner pipeline chart",
      "description": "Deals that have not moved out of their current stage now show a Stuck chip on the Opportunities list and Detail page. The Reports tab bar shows which view you are on out of the total. The Deals by Stage chart no longer shows empty bars for stages with nothing in them."
    },
    {
      "version": "1.63.4",
      "date": "2026-08-15",
      "category": "improved",
      "title": "User role changes now appear in the Audit Log",
      "description": "Changing a team member's role (admin, manager, or user) is now recorded in the Audit Log along with who made the change and when, closing a gap where this specific action was previously invisible."
    },
    {
      "version": "1.63.2",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Starter email templates added",
      "description": "Three ready-to-use email templates -- Welcome, Follow-up, and Quote Sent -- are now available under Maintenance to Email Templates, so you do not have to write one from scratch before sending your first email from XRM."
    },
    {
      "version": "1.63.1",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Lead Score now reflects real signals, not just a complete profile",
      "description": "Lead scores used to cluster on the same few numbers because company name and email are required on every lead, so most of the score was earned automatically. The formula now weights phone number, notes, engagements, recent activity, and lead source quality more heavily, so scores genuinely tell hot leads apart from cold ones."
    },
    {
      "version": "1.63.0",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Quota targets no longer go blank when a new month or quarter starts",
      "description": "Forecast and Dashboard attainment figures used to show as blank the moment a new month or quarter began, until someone manually re-entered every quota by hand. They now automatically show the most recent target until a new one is set, with a clear note that it has been carried forward."
    },
    {
      "version": "1.62.1",
      "date": "2026-08-15",
      "category": "fixed",
      "title": "Fixed three data-accuracy issues found in an internal review",
      "description": "The Leads page's \"New (Status)\" card was showing the exact same trend percentage as \"Total Leads\" instead of its own. A sales rep's Opportunities pipeline total now matches what they see on their own Dashboard, instead of always showing the whole team's numbers. And a contact's linked accounts list now shows the account type (Customer, Prospect, Partner, etc.) instead of a blank column."
    },
    {
      "version": "1.61.0",
      "date": "2026-08-15",
      "category": "improved",
      "title": "The app loads substantially faster",
      "description": "The initial download every user waits for on login was cut by about three quarters. Charting code is now fetched only when you actually open Reports or Forecast, instead of being loaded up front for everyone on every page. Nothing looks or behaves differently -- it just starts faster, most noticeably on mobile and slower connections."
    },
    {
      "version": "1.54.0",
      "date": "2026-08-13",
      "category": "new",
      "title": "Per-record change history",
      "description": "Every Account, Contact, Lead, Quote, Opportunity, and Tenant record now has a history icon next to its info icon, showing exactly what changed on that record and when, without leaving the page."
    },
    {
      "version": "1.53.0",
      "date": "2026-08-13",
      "category": "new",
      "title": "Website leads now flow automatically into XRM",
      "description": "Demo requests, contact form messages, partner enquiries, resource downloads, and the new Book a meeting request from xgrcsoftware.com now create a Lead automatically, in addition to the existing email notification. Leads are recorded under the Web Form source with the specific form type noted in the description, and default to Reva Moodley as the owner."
    },
    {
      "version": "1.51.0",
      "date": "2026-08-08",
      "category": "improved",
      "title": "Better in-app help across every screen",
      "description": "The info icon now appears on every page, including detail pages, and covers features it previously missed - choosing which columns you see, per-workspace reference numbers, deal registration, and the partner and reseller screens. Each panel links to related topics so you can follow a thread rather than hunting."
    },
    {
      "version": "1.44.0",
      "date": "2026-07-28",
      "category": "new",
      "title": "Build your own custom reports",
      "description": "Pick, resize, and arrange report and forecast panels into your own personal or shared layout, and present it chrome-free in a pop-out window for meetings."
    },
    {
      "version": "1.33.0",
      "date": "2026-07-19",
      "category": "new",
      "title": "Design your own proposal templates",
      "description": "Beyond the Basic branded proposal, an admin can now design reusable proposal templates in Maintenance. Build a document from ordered blocks: a cover, narrative sections, the pricing tables, customer details, your Terms, free tables for matrices or milestone plans, and an acceptance page. Write your wording once with merge fields like {{account.name}} or {{quote.total}} and they fill in automatically for each deal. Mark one template as the default, and a rep can switch template or use the Basic layout on any quote. Draft proposals are watermarked, and once a quote is sent its proposal is frozen exactly as the customer received it."
    },
    {
      "version": "1.32.0",
      "date": "2026-07-19",
      "category": "new",
      "title": "Branded proposal PDFs, with your own Terms and Conditions",
      "description": "The PDF button on a quote now produces a proper branded proposal document, not a print page: a cover with your logo, the customer's details filled in from the Account, the pricing tables, your company's Terms and Conditions, and an acceptance page, with page numbers and correct document properties. Your tenant starts with a best-practice Terms and Conditions set matched to your country, which an admin can edit under Maintenance. Once a quote is marked Sent, its proposal is frozen to exactly what the customer received, so later edits to the deal or your terms never change a document already sent."
    },
    {
      "version": "1.30.0",
      "date": "2026-07-19",
      "category": "new",
      "title": "Advanced Pricing: price tiers, per-account prices, and discount rules",
      "description": "For companies that price differently for different customers, you can now switch on Advanced Pricing in Maintenance. It lets you group accounts into Price Tiers with their own rates, set a one-off negotiated price for a single account, and create automatic percentage discounts for a whole tier. Every price on a deal shows a small badge saying where it came from, so it is always clear why a number is what it is. This is entirely optional: leave it off and everything keeps working on one simple price per item, exactly as before."
    },
    {
      "version": "1.29.0",
      "date": "2026-07-19",
      "category": "new",
      "title": "Configurable Products, Services & Activities catalog",
      "description": "You can now build out a real catalog of Products, Services, and Activities in Maintenance, each with its own price, and search that catalog when adding a line to a deal instead of typing it fresh every time. A Service can also be built from a set of Activities, so its price adds up automatically from the parts that make it up. Nothing is required to keep working the way it already did: adding a one-off item on the fly, without touching the catalog at all, is still fully supported and just as fast."
    },
    {
      "version": "1.26.0",
      "date": "2026-07-17",
      "category": "new",
      "title": "The calendar now shows your whole pipeline, not just tasks",
      "description": "Your calendar has been rebuilt around colour-coded layers you switch on and off — tasks, reminders, follow-ups, meetings, deal close dates and quote expiries all in one timeline. Overdue items are flagged, finished ones struck through, and you can drag an item to a new day to reschedule it (moving a deal close date or quote expiry asks first). New Month, Week and Agenda views, a Mine/Team switch, and an admin Calendar Layers settings page to control colours, defaults and reschedule rules."
    }
  ],
  "xlogic": [
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "improved",
      "title": "The Process Canvas has a new, tidier toolset",
      "description": "The canvas toolbar used to be twenty-odd buttons wrapped across three rows, with tools for the selected connection appearing and disappearing in the middle of them. It is now organised the way design tools like Canva organise theirs. The header holds only what applies to the whole process: Present, Comments, warnings, Share (export a document, or the ownership report) and a menu for Journey and templates. The left rail has two tabs, Build (the step palette) and Ask MAIA. Undo, Tidy up, Recenter and the orientation flip float top-left inside the canvas. Select a step or a connection and its own tools appear in one bar along the top of the canvas; the tiny icons on every card are gone, and double-clicking a card edits it. Zoom, fit-to-screen and a lock sit bottom-right, and nowhere else. Positions now save themselves a moment after you stop dragging, with Saving and Saved shown in the header - there is no Save layout button to remember. Also fixed: Insert step here opened a form that could not be completed without typing an SLA by hand; choosing a step type now fills its defaults."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "new",
      "title": "A step's SLA can be a fixed deadline date, not only a duration",
      "description": "An SLA target used to have one shape: a number of hours counted from the moment a step's task is created. That is right for \"respond within 24 hours\", but not for work whose deadline is a date in the calendar - a regulatory submission due 30 November, a review that must be tabled before a dated meeting. Authoring a step now offers both: \"Within a period\" (hours or days, as before) or \"By a date\", with a date picker. A step carries one or the other, never both, and a fixed date is refused on a recurring step because one date cannot be the deadline for every occurrence. Whichever you choose becomes the task's real due date, so overdue counts, SLA breach escalation and the Worklist's soonest-first ordering all work exactly as they already did. The deadline also travels into exported process documents, process templates and the ownership report, and MAIA can set one when it drafts a process for you."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "improved",
      "title": "Search connectors and stored procedures",
      "description": "One XGRC Awesome API credential creates one connector per stored procedure, so the Connectors list grows quickly and had no way to search it. There is now a search box that matches connector name, stored procedure, endpoint and type. Editing a connector also offers the same searchable stored-procedure list the add form does, instead of asking you to type the name from memory."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "fixed",
      "title": "The canvas zoom controls stay on screen",
      "description": "The canvas pane was sized from a fixed guess at how much page sat above it, so on a laptop its bottom-left zoom controls hung below the window - and because the canvas uses the wheel to zoom, the page could not be scrolled to reach them. The pane is now measured against its real position, so the controls are always visible. There is also a named Zoom out / Fit to screen / Zoom in group in the toolbar, the zoom range is wider (0.2 to 2.5), and a zoom button at its limit now reads as unavailable instead of looking broken."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "fixed",
      "title": "Flipping a diagram's orientation now moves the connection points with it",
      "description": "Converting a process between top-to-bottom and left-to-right kept every edge's anchor points on their literal sides, so a converted diagram drew its lines looping around the cards instead of flowing across them. The routing rules now follow the orientation - flow leaves the side the process is heading towards and arrives at the opposite one - and a connection point you pinned yourself rotates with the diagram rather than staying put."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "fixed",
      "title": "The Organization Profile logo field shows the whole logo",
      "description": "The logo preview cropped a wide logo into a small square and sat awkwardly against the file picker. It is now a proper frame that fits the whole image, with the file's name, pixel dimensions and size beside it, and clearly labelled Replace and Remove actions."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "improved",
      "title": "Requirement actions are named, and retiring one explains itself and can be undone",
      "description": "On a policy's requirements list, the two unlabelled icon buttons are gone. Actions now carry names, and retiring a requirement asks first and says what it does: the requirement leaves the live set, any AI process proposal still waiting on it is rejected, and a process already built from it keeps running. Nothing is deleted. A new \"Show retired\" switch brings retired requirements back into view, where they can be reactivated."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "improved",
      "title": "A policy's text is now laid out for reading, and the original file can be downloaded",
      "description": "A policy's extracted text is now laid out for reading: numbered clause headings, list items and real paragraphs, with the hard line wrapping from the original file undone. The exact, unaltered text is one click away under \"Exact text\", because a reviewer checking an AI proposal's source quote needs the characters the AI actually read. Every policy imported as a file can also be downloaded again from its own page. Extraction flattens tables and numbering, so where wording has to be trusted word for word, the original document is now there to open."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "fixed",
      "title": "The \"Running instances\" tile counts only runs that are actually running",
      "description": "The tile counted every run the list happened to return, whatever its state, so a cancelled or completed run could still be reported as running. It now counts running instances only, across all of your processes rather than the first page of them, and the Runs tab opens on Running so the number and the list beneath it agree. Choose \"All runs\" for completed and cancelled ones."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "improved",
      "title": "Processes now show which standard they serve",
      "description": "The Processes screen never said what a process was for. Each definition and each run now shows the standard and clause its requirement cites - for example \"ISO/IEC 42001:2023 AI Management System - 6.1.4\" - with the clause title on hover, and a run also shows the requirement it exists to satisfy. A requirement that cites internal policy rather than an external standard shows a dash rather than a guess."
    },
    {
      "version": "2026.09.03",
      "date": "2026-09-03",
      "category": "new",
      "title": "Process canvas: wider lanes, and connectors you can point where you want",
      "description": "Two things the canvas would not let you do. Lanes are now resizable: drag the tab on any lane boundary and every lane widens or narrows together, saved against that process and remembered. And a connector no longer has to accept the automatic routing - select it, choose Connection points, and pin which side it leaves the first step from and which side it enters the next one at. Either end can stay on Automatic, so you can straighten one awkward arrow without taking over the rest."
    },
    {
      "version": "2026.09.02",
      "date": "2026-09-02",
      "category": "fixed",
      "title": "An open tab keeps working across a release",
      "description": "A tab left open while a new version was released could hit a dead end on its next screen and show an error over work that had in fact succeeded. Previous versions' files are now kept available, and the app recovers by itself if it ever meets one that is missing."
    },
    {
      "version": "2026.09.02",
      "date": "2026-09-02",
      "category": "improved",
      "title": "A user's email address can be corrected",
      "description": "A mistyped address could only be fixed by deactivating the account and creating another, which lost that person's history. Administrators can now correct it in place from the Users screen: the same person keeps their tasks, approvals and audit trail, any outstanding password-reset link stops working, and the change is recorded with both addresses. Signing in is also no longer case-sensitive."
    },
    {
      "version": "2026.09.02",
      "date": "2026-09-02",
      "category": "new",
      "title": "One email address can sign in to more than one organisation",
      "description": "If your address has an account in several organisations, signing in now asks which one you want rather than choosing for you. A single account is unaffected: you go straight in as before. Forgotten-password requests now send one link per account, each naming its organisation."
    },
    {
      "version": "2026.09.02",
      "date": "2026-09-02",
      "category": "new",
      "title": "Support access: your provider can help inside your site, without an account in it",
      "description": "A consultant from your provider can now work in your site under their own name - no user account here, no licensed seat used, and every action recorded in your audit trail against them. They can configure and advise; they cannot approve, attest or complete your work on your behalf. Support access is on by default and you can switch it off at any time on the Organisation Profile, which ends any session in progress immediately. That screen also lists who has had access and when they last used it."
    },
    {
      "version": "2026.08.31",
      "date": "2026-08-31",
      "category": "improved",
      "title": "Step SLAs can be entered in days as well as hours",
      "description": "A step's SLA target had to be typed in hours, so a two-week deadline meant working out 336. The editor now takes days or hours, converting for you. The stored value is unchanged, so nothing about existing SLAs or escalation moves."
    },
    {
      "version": "2026.08.31",
      "date": "2026-08-31",
      "category": "fixed",
      "title": "Process canvas: undo now covers a newly drawn connection",
      "description": "Adding a connection could not be undone - Ctrl+Z skipped straight past it to the previous change. Drawing an edge now records a proper undo entry, and the confirmation says so."
    },
    {
      "version": "2026.08.31",
      "date": "2026-08-31",
      "category": "fixed",
      "title": "Process canvas: rewiring an edge to a different step now works",
      "description": "Dragging an edge's endpoint onto another step reported success but silently created a new edge instead: the drag anchor sits on the same pixel as the destination step's own connection handle, and the handle won every time. Select an edge and use Rewire to pick a new From/To step - it goes through the same, already-correct rewire path the gesture was meant to reach."
    },
    {
      "version": "2026.08.27",
      "date": "2026-08-27",
      "category": "improved",
      "title": "Audit Trail: KPI row, actor/date filters, and CSV export",
      "description": "The Audit Trail now opens with a KPI row (events on record, events today, SLA breaches, most active actor), adds actor and date-range filters alongside the existing entity-type filter, and can export the current page to CSV. Click an actor's name or the most-active-actor tile to filter the trail to just their events."
    },
    {
      "version": "2026.08.27",
      "date": "2026-08-27",
      "category": "new",
      "title": "My Profile: track your own XLOGIC journey",
      "description": "A new personal profile screen shows badges for the first time you did something governance-relevant - imported a policy, gave an approval, filed an attestation, proposed a process, or decided a requirement. Each badge and its count is computed live from your own activity, distinct from the tenant-wide progress on \"How XLOGIC works\". Find it under Overview > My Profile."
    },
    {
      "version": "2026-08-23",
      "date": "2026-08-23",
      "category": "improved",
      "title": "\"How XLOGIC works\" is now a live, searchable map of your own tenant",
      "description": "Every stage now shows your own real, live numbers instead of a static diagram - click any stage to see exactly what it means and jump straight into the real screen. A new global search (Search XLOGIC, or Ctrl+K) finds any module or answers a quick question from anywhere in the app, and a \"Your XLOGIC journey\" badge strip marks real milestones as you reach them."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "new",
      "title": "Ten more frameworks: ISO 9001, 14001, 45001, 27001, 20000, 31000, 22301, 37001, 22000, 13485",
      "description": "Alongside ISO/IEC 42001, XLOGIC now ships the real clause structure for ISO 9001 (Quality), ISO 14001 (Environmental), ISO 45001 (Occupational Health & Safety), ISO/IEC 27001:2022 (Information Security), ISO/IEC 20000-1 (IT Service Management), ISO 31000 (Risk Management), ISO 22301 (Business Continuity), ISO 37001 (Anti-Bribery), ISO 22000 (Food Safety), and ISO 13485 (Medical Devices) - ready to link requirements against."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "new",
      "title": "Default Lane Groups to get you started",
      "description": "A new tenant used to start with zero lane groups and nothing to assign a role into on the canvas. Four sensible defaults - Governance & Oversight, Risk & Compliance, Technology & Security, and Operations - are now there from day one, ready to rename, reorder, or assign your own roles into."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "fixed",
      "title": "Clearer explanation when you lack permission for an action",
      "description": "A permission error used to show a bare technical code with no explanation. It now says what the action needs in plain English, and names which role(s) in your tenant can actually do it - so you know exactly who to ask."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "new",
      "title": "Process Templates: preview a template before applying it, and ten to choose from",
      "description": "Every template card now has a Preview button showing its real step-by-step shape (owners, evidence, cadence, SLA) before you commit to it. The catalog also grew from 2 templates to 10: task-with-escalation, evidence-gated release, decision-routed review, two-stage sign-off, incident response, change request lifecycle, third-party risk assessment, and recurring training completion, alongside the original approval-with-evidence and periodic-review-with-escalation."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "improved",
      "title": "Processes: status badges now explain what they mean",
      "description": "DRAFT, APPROVED, RETIRED, RUNNING, COMPLETED and CANCELLED status badges on the Processes screen now show a one-line explanation of what the status means and what to do next, on hover."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "new",
      "title": "Policy decomposition flags a policy with no approval or decision content",
      "description": "When a policy is decomposed and none of the extracted requirements involve an approval or a risk-tier condition, XLOGIC now raises a review item in Cockpit rather than staying silent. Confirm the policy genuinely has none, or send it back for another look."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "new",
      "title": "Overdue tasks with no Escalation step now email the task owner directly",
      "description": "Escalation is optional when a process is designed. Where a task breaches its SLA target and has no Escalation step configured, the step's owner role is now emailed the moment the breach is recorded, instead of relying only on Worklist or Cockpit to notice it."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "improved",
      "title": "What's New: easier to scan at a glance",
      "description": "Each entry now shows a clear New/Improved/Fixed/Security label and a matching colour accent, so a release with several changes is easy to scan instead of reading like one continuous block."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "fixed",
      "title": "Feedback form: Submit is always visible now",
      "description": "The Submit button used to sit below the bottom of the screen on the Feedback & Bugs form. The description box and screenshot preview take up less room, and Submit always stays in view."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "fixed",
      "title": "Processes tables no longer overflow the screen",
      "description": "The Runs table sometimes gave one column most of the row's width, pushing the others out of alignment, and the process list's action buttons could get clipped at the edge. Both tables now share space properly."
    },
    {
      "version": "2026-08-20",
      "date": "2026-08-20",
      "category": "fixed",
      "title": "\"How XLOGIC works\" step descriptions no longer get cut off",
      "description": "Some of the longer step descriptions on the How XLOGIC works page were being cut short mid-sentence. The full text now always shows."
    },
    {
      "version": "2026-08-15",
      "date": "2026-08-15",
      "category": "new",
      "title": "Canvas: connect from any side; a Decision with no real branch is flagged",
      "description": "A step can now connect on its left or right side, not just top and bottom, so steps in adjacent lanes connect with a straight line. Activating a process now warns if a Decision step has no real branching condition set, or has no outgoing edges at all."
    },
    {
      "version": "2026-08-15",
      "date": "2026-08-15",
      "category": "improved",
      "title": "Cockpit and Lifecycle: real motion, colour and depth",
      "description": "The Cockpit and \"How XLOGIC works\" pages now use one shared design language - hover feedback, a real chart for trend data, per-stage colour and depth on the lifecycle diagram, and consistent button sizing across screens instead of each page inventing its own."
    },
    {
      "version": "2026-08-13",
      "date": "2026-08-13",
      "category": "new",
      "title": "Clickable links inside Info panels",
      "description": "When an Info panel tells you to go do something on another screen, it now takes you there directly with a real link, instead of just describing where to look."
    },
    {
      "version": "2026-08-12",
      "date": "2026-08-12",
      "category": "new",
      "title": "Revise an approved process",
      "description": "An APPROVED process definition never changes in place, but you can now start a real revision from it - a fresh DRAFT pre-populated with its steps and edges, ready to edit and re-activate - instead of having no path to change one at all."
    },
    {
      "version": "2026-08-05",
      "date": "2026-08-05",
      "category": "new",
      "title": "Per-screen Info panels",
      "description": "Every real screen now has an info icon next to its heading, opening a panel that explains what the screen is for, why it matters, and the common tasks done there."
    }
  ]
};
