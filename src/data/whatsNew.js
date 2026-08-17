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
