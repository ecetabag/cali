# California TODO × Google Sheets

Google Sheets is now the shared database and a formatted itinerary. No Supabase, Google Cloud billing, or API key.

## One-time setup (about 5 steps)
1. Open **https://sheets.new** and name the Sheet **California TODO — Family Itinerary**.
2. In the Sheet, choose **Extensions → Apps Script**. Replace the default code with [Code.gs](Code.gs).
3. Change `FAMILY_CODE` at the top of `Code.gs` to a **private phrase 12+ characters long**. Never commit your actual code to public GitHub.
4. In Apps Script choose `setupCaliforniaTodo` from the function dropdown and click **Run**, then approve Google's permission prompt. This creates the formatted **Itinerary**, **Food Guide**, **Liked**, and editable **Places** tabs.
5. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Copy the deployment URL ending in **/exec**.

Now open [California TODO](https://ecetabag.github.io/cali/), click **Connect Google Sheet**, paste the **/exec URL** and your family code, and save.

Click **Import my current board** to move existing locally saved places, likes, and dates into the new Sheet. It inserts only missing place IDs; existing sheet entries are not overwritten.

### Using it
The website is the easy Pinterest-style planner. The Google Sheet opens to the **Itinerary** tab, with each day, restaurants, cuisine, favorites, and Google Maps links. The **Places** tab contains every field and can be edited directly. The **Itinerary**, **Food Guide**, and **Liked** tabs are generated views—edit the **Places** tab, not the generated tabs. The website refreshes when opened, after saving, and about every 30 seconds while in use.

### Sharing / security
Share the website link, web-app URL, and private family code with each collaborator, or share the sheet itself through Google Sheets. The script executes as the Sheet owner. Anyone with **both URL and family code** can access and modify the trip records. Use it for non-sensitive travel planning only, not personal or financial secrets. Family code is stored in browser localStorage. Web app deployment must be updated to a **new version** after script changes.

### Troubleshooting
If connecting fails, confirm the script is deployed at **/exec**, access is set to **Anyone**, the code matches, and `setupCaliforniaTodo` was run successfully. If the Sheet is empty, use **Import my current board**. For frequent live edits, reload or refocus the website to refresh. Google Apps Script usage quotas and occasional browser restrictions may apply.
