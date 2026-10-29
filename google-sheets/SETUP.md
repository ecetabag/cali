# California TODO — connect the existing cal_todo Google Sheet

This guide uses **your existing spreadsheet**, not a replacement:
[cal_todo](https://docs.google.com/spreadsheets/d/1Ngl7b794tK86DbN3uBBaCoy1Wzi8EoSrD7m/edit).

The website is [California TODO](https://ecetabag.github.io/cali/).

## 1. Install the current code into the existing Sheet

1. Open **cal_todo** with its Google owner account.
2. Choose **Extensions → Apps Script**.
3. Copy the entire contents of [Code.gs](Code.gs) into the script editor, replacing any old copy.
4. Click **Project Settings** (gear icon), scroll to **Script properties**, and **Add script property**:
   - Property: `FAMILY_CODE`
   - Value: a new random private passphrase, **at least 16 characters**.
5. Save. Do **not** put the actual passphrase in the public GitHub file or share it in a conversation. Never reuse the previously public short password.

## 2. Prepare the existing workbook (without destroying Places records)

1. At the top of the Apps Script editor select `setupCaliforniaTodo`.
2. Click **Run** and complete the Google authorization screen. If a warning appears about an unverified script, check that the script is your own project and that you trust the permissions before proceeding.
3. The script saves the original spreadsheet ID and creates/formats four tabs: **Itinerary**, **Food Guide**, **Liked**, and **Places**.
4. **Places is editable**. The other three tabs are automatically rebuilt, so do not type into them expecting changes to persist.
5. On later runs, setup retains existing Places data, but it resets the header row and the three generated views. Keep a version-history checkpoint before changing a populated workbook.

## 3. Publish the web app

1. Click **Deploy → New deployment**.
2. Select **Web app** as the deployment type.
3. Choose **Execute as: Me** and **Who has access: Anyone**.
4. Click **Deploy** and grant requested authorization.
5. Copy the generated URL ending in `/exec`. This is **not** the Sheet URL or Sheet ID.
6. For later script changes use **Deploy → Manage deployments → Edit → New version → Deploy** so the existing /exec URL runs the latest code.

**Security:** a public-access web app executes as the owner. The website uses a shared code, not real user authentication. The code is stored in the browser and transmitted to the web app; it also appears in JSONP GET request URLs. Treat this as a low-security family-only tool. Do not store sensitive information. Anyone who obtains the code and /exec URL can read or change the data.

## 4. Connect your family website

1. Open [California TODO](https://ecetabag.github.io/cali/).
2. Click **Connect Google Sheet**.
3. Paste the **/exec** URL and the private family code.
4. Enter your name (Ece, Albert, Kaan, or Işıl), then select **Connect**.
5. Verify the status says **Google Sheet synced** and that the Sheet opens through **Open itinerary sheet**.

The site reads the sheet when opened and refreshes periodically. If your Sheet starts empty, click **Import my current board**, review the confirmation, and import. The import only adds missing IDs and does not replace existing IDs. Do not delete browser backups until you have checked that favorites, dates and notes match.

**Important:** local favorites are stored in each person's browser. Import them from that same browser *before* overwriting its local data. If more than one family member has local-only changes, migrate them individually.

## 5. Troubleshooting

- If setup says the family code is missing, check **Project Settings → Script properties → FAMILY_CODE**. It must be at least 16 characters.
- If the website says offline or times out, check that the deployed Apps Script is the latest version, URL ends in **/exec**, and access is set to **Anyone**.
- If a write cannot be verified, check the Places tab before retrying; network requests can fail without a readable POST result.
- If a place was edited simultaneously, refresh and try again instead of overwriting someone else's change.
- The Google Sheet is the source of truth once connected. Generated tabs display data from **Places**, not vice versa.
- The Grove – Yerba Buena should be stored as an American / Californian restaurant at 690 Mission St, San Francisco. Its original supplied photograph must be added manually if unavailable in the repository.

There is no Supabase requirement or paid Google Maps API. The map uses OpenStreetMap/Leaflet for visual pins and Google Maps links for directions.
