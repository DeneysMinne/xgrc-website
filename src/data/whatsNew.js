// GENERATED FILE -- do not hand-edit.
// Produced by scripts/sync-release-notes.mjs from XRM's and XLOGIC's own
// databases (rows flagged public_facing in each). Re-run that script to
// refresh; the hourly cron job (see xgrc-scheduled-deploys/) already does
// this automatically.

export const whatsNew = {
  "xrm": [
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
