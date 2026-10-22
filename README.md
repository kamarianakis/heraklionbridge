# Όμιλος Μπριτζ Ηρακλείου – static website

Plain HTML/CSS/JS. No build step, no WordPress, no database. Everything in this folder is the website.

## The things you will change most often

All in **`assets/site.js`** (the `SITE` block at the very top – read the comments there):

| I want to… | Do this |
|---|---|
| **Turn the lesson popup on/off** | `popup.enabled: true` / `false` |
| **Show a new poster** | Upload the new image to `assets/img/`, change `popup.image`, and change `popup.id` (so people who closed the old poster see the new one) |
| Add / remove / rename a menu entry | Edit the `menu` list |
| Change address, hours, e-mail, phones | Edit the `footer` block |

The three big buttons on the home page ("Θέλω να παίξω", "Αποτελέσματα", "Αγωνιστικό Ημερολόγιο") and the orange "Θέλω να μάθω Bridge" button are in **`index.html`** – look for `class="btn …"` and change or delete the `<a …>…</a>` line.

## Editing a page

Each page is a folder with an `index.html` inside (e.g. `lessons/index.html` is the **Μαθήματα** page). The text is inside `<main>…</main>`. You can edit it directly on GitHub (pencil icon) – save ("Commit") and the site updates in about a minute.

| URL | File |
|---|---|
| `/` | `index.html` |
| `/lessons/` | `lessons/index.html` |
| `/library/` | `library/index.html` |
| `/directions_gr/` | `directions_gr/index.html` |
| `/ds/` | `ds/index.html` |
| `/γενικές-πληροφορίες-για-το-μπριτζ/`, `/γιατί-να-μάθετε-μπριτζ/`, `/χρήσιμα/` | the folders with those names |
| `/home/`, `/directions/` | English pages |
| `/nea/` | list of all news posts (add a line when you add a post) |

The URLs are identical to the old WordPress ones, so existing Google results and bookmarks keep working.

**New page:** copy any folder (e.g. `library/`), rename it, edit its `index.html`, and add it to `menu` in `assets/site.js`.
**New image / PDF:** put it in `assets/uploads/` and reference it as `../assets/uploads/yourfile.jpg` (one `../` per folder level).

## Preview on your computer

```bash
python3 -m http.server 8000
```
then open http://localhost:8000 (run it inside this folder).

## Publishing with GitHub Pages + your domain

1. Create a GitHub repository and upload the contents of this folder (the `CNAME` and `.nojekyll` files too).
2. Repository → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)`.
3. In the same page set **Custom domain** to `www.heraklion-bridge.gr` and tick **Enforce HTTPS** (once available).
4. At your domain registrar's DNS settings:
   - `www` → **CNAME** → `<your-github-username>.github.io`
   - apex (`heraklion-bridge.gr`) → four **A** records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
5. Wait for DNS (minutes to a few hours). Only then cancel the old hosting.

## Notes

- Not carried over from WordPress: the site search box, the photo galleries of two posts (*Κοπή πίτας*, *Εγκαίνια*), the "Ανάλυση Διανομών" tables page and the old unlisted pages (*Μαθήματα Ιανουαρίου*, old welcome page). The photos are still in the old WordPress media library if you want them.
- `minibridge/` exists but is not in the menu (it is from 2025 – update or delete it).
- External services are still used for: Google Forms, Google Maps embeds, YouTube videos (privacy-friendly `youtube-nocookie`), hellasbridge.org results.
