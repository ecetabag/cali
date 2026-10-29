# California TODO

A free Pinterest-style family trip board for Northern California. Browse **Explore**, **Food**, **Liked**, **Ideas**, **Map**, **Calendar**, and **Checklist**; heart restaurants and attractions, schedule them for November 3–14, 2026, and open Google Maps.

## Google Sheets instead of Supabase

The current version uses a **Google Sheet** as its shared source of truth, with a styled **Itinerary**, **Food Guide**, **Liked**, and editable **Places** tab. No Supabase account, billing, or Google API key required.

**Start here: [Google Sheets setup](google-sheets/SETUP.md).** The full Google Apps Script backend lives in [Code.gs](google-sheets/Code.gs).

In brief: create a Sheet, open Extensions → Apps Script, paste Code.gs, set a private 12+ character family code, run `setupCaliforniaTodo`, and deploy it as a Web app (Execute as Me, Access Anyone). Back on [California TODO](https://ecetabag.github.io/cali/), click **Connect Google Sheet**, enter the /exec URL and family code, then **Import my current board** to migrate your local places and favorites.

The Sheet is editable directly through its **Places** tab. Other tabs are formatted views automatically rebuilt after website updates or Places-sheet edits.

## Privacy and images

Anyone with the Apps Script URL **and** family code can access the trip data, so use this only for non-sensitive travel planning, and never commit your private code to a public repository. Regular Google Sheets editing also uses Google's sharing settings.

The app uses restaurant photos only when a specific image URL is known or an exact public Wikimedia match exists. Otherwise it shows a labeled placeholder rather than pretending stock food images are pictures of that restaurant.

## Development

The app is a self-contained `index.html` hosted on GitHub Pages. A downloadable, styled initial itinerary workbook may be used as a preview or imported into Google Sheets. The legacy `setup.sql` file remains for historical Supabase users but **is not required** by the current app.
