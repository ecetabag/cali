# California Board

A static, Pinterest-style travel planner with Places, Restaurants, Map, Calendar and Checklist. No build tools required.

## Preview locally
Open `index.html` in a browser. Places and checkmarks are saved only in that browser until Supabase is configured. Photos in the starter board are **illustrative category photos**, not verified photos of individual destinations; replace using Edit > Image URL. Map coordinates are approximate starter pins, not verified addresses.

## Create real multi-user collaboration (free-tier setup)
1. Create a Supabase project at https://supabase.com/ .
2. Open `setup.sql`. Replace ALL four `example.com` emails with actual addresses for Ece, Albert, Kaan, and Işıl. Execute the edited file in Supabase > SQL Editor.
3. Under Supabase Authentication > URL Configuration, set Site URL to your future GitHub Pages URL and add the same URL as a Redirect URL. Enable email OTP/magic link in your project.
4. Open the deployed site; click **Connect & share**; enter your Supabase Project URL and the **publishable/anon** key (NEVER service_role or secret keys); save connection.
5. Click Connect & share again, enter your invited email and display name, and request a sign-in email. Follow the emailed link.
6. Once signed in, click **Connect & share > Import starter places** exactly once. All four accounts will then see edits in the same database.
7. Each user must enter the same Supabase project URL and publishable key once on their device (stored locally). Share these non-secret public connection settings privately; the database is protected by authenticated email allowlisting and RLS.

## Publish free on GitHub Pages
1. Create a **public** GitHub repository named `california-board` (GitHub Free Pages requires a public repository).
2. Upload `index.html` and an empty `.nojekyll` file at repository root. Do **NOT** upload an edited `setup.sql` containing people's private email addresses: keep it locally. The unedited example template may be committed.
3. In GitHub repository Settings > Pages > Build and deployment, choose Deploy from a branch, select `main` and `/ (root)`, and Save.
4. Your public website URL should be `https://YOUR-GITHUB-USERNAME.github.io/california-board/`. The website HTML is public, but trip records remain private behind Supabase authentication and policies.
5. Configure Supabase Auth Site URL and Redirect URLs to match the actual public URL.

## Notes and limits
- The map is Leaflet with OpenStreetMap tiles. Attribution appears on the map. Public OSM tile servers are best-effort and subject to their usage policy.
- Driving directions open in Google Maps; the app does not calculate live drive times or automatically optimize stop order.
- The starter place coordinates are approximate and should be checked. Manually added places need lat/lng for pins.
- Search/import from Google Places, photo licensing, uploaded photo storage, comments, and advanced activity change history are not yet implemented. Basic `added_by`/`updated_by` is stored, but it is client-supplied attribution, not tamper-proof auditing.
- The `setup.sql` invite-list rows are private, and the included SQL grants allow only invited signed-in email users to read/write places.
- Images currently use Unsplash illustrations and may depend on network availability. They must not be treated as authentic photos of the named venues.

## Version 2 — dark Pinterest layout and photos
- Charcoal background, neutral monochrome controls, sans-serif typography, and compact masonry image boards.
- Cards attempt to load a relevant Wikipedia/Wikimedia thumbnail by place name in the visitor's browser, without a paid API. It uses conservative title matching; some places have no matching Wikimedia image and display an illustrative fallback. Photographs are **not** guaranteed to correspond to the exact business or attraction; review them and enter an authoritative image URL in the place editor if needed.
- Photos fetched from Wikipedia may require credit/license compliance for redistribution or reuse. Check the source page and license before republishing any images outside its source service.
- Existing Supabase integration and local preview are preserved.

## Publish with GitHub Pages
1. Create a **public** GitHub repository named `california-board`.
2. Upload `index.html`, `setup.sql`, `README.md`, and `.nojekyll` into the repository root (do not upload the ZIP file).
3. In **Settings → Pages**, choose **Deploy from a branch**, then `main` / `(root)` and save.
4. Open the published URL (usually `https://YOUR-USERNAME.github.io/california-board/`).
5. Create a free Supabase project, replace the four placeholder emails in `setup.sql`, and execute that SQL in the Supabase SQL Editor.
6. In the published app, choose **Connect & share**, enter the project URL and **publishable/anon** API key (never the service-role secret), then have one invited user sign in via the email link and import the starter board once.
7. Other invited users can sign in from their own devices. Their changes then sync through Supabase. Without this setup, local preview is not collaborative.

Note: As with any published app, configure the relevant Supabase Auth **Site URL** and redirect URLs to the final GitHub Pages address. GitHub Pages is public hosting; the invite-only data access is provided by Supabase RLS, not by making the website itself private.