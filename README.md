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
| `/quiz/` | the quizzes – see below |
| `/lectures/` | lecture slides – see below |

The URLs are identical to the old WordPress ones, so existing Google results and bookmarks keep working.

**New page:** copy any folder (e.g. `library/`), rename it, edit its `index.html`, and add it to `menu` in `assets/site.js`.
**New image / PDF:** put it in `assets/uploads/` and reference it as `../assets/uploads/yourfile.jpg` (one `../` per folder level).

## The quizzes (`/quiz/`)

One interactive quiz per lesson of the first cycle, based on the lesson summaries:

| URL | Files |
|---|---|
| `/quiz/` | `quiz/index.html` – the list of quizzes |
| `/quiz/mathima-1/` | `quiz/mathima-1/index.html` (page) + `quiz/mathima-1/questions.js` (questions) |
| `/quiz/mathima-2/` | `quiz/mathima-2/index.html` (page) + `quiz/mathima-2/questions.js` (questions) |

The questions are plain text in `questions.js` – each one is a few lines (question, answers, which answer is correct, explanation), with instructions at the top of the file. Add, remove or reword questions there; the page picks them up automatically. The game logic is in `assets/quiz.js` and the styling at the end of `assets/style.css`.

**New quiz (e.g. lesson 3):** copy the folder `quiz/mathima-2/` to `quiz/mathima-3/`, edit `questions.js` and the texts in `index.html`, then add it to the `menu` in `assets/site.js`, to the list in `quiz/index.html`, and to `sitemap.xml`.

## The lecture slides (`/lectures/`)

Slide decks for students who missed a class, built with [reveal.js](https://revealjs.com) (a copy of version 5.1.0 is stored in `lectures/vendor/reveal/`, so nothing is loaded from other sites).

| URL | Files |
|---|---|
| `/lectures/` | `lectures/index.html` – the list of decks |
| `/lectures/mathima-1/` | `lectures/mathima-1/index.html` – the slides of lesson 1 |

Each slide is a `<section>…</section>` block inside `lectures/mathima-1/index.html`; edit the text there. Useful building blocks (all styled in `lectures/deck.css`):
- `<div class="example"><p>…</p></div>` – the green-edged "Παράδειγμα" box;
- `class="fragment"` on any element – it appears with the next click/arrow;
- playing cards: `<span class="pc">♠K</span>` (add `red` for ♥ ♦, `sm` or `xs` for smaller);
- a trick diagram, a hand, an auction table: copy an existing slide and change the cards.

**New deck (e.g. lesson 2):** copy `lectures/mathima-1/` to `lectures/mathima-2/`, replace the slides, then add a tile to `lectures/index.html`, and the page to `sitemap.xml`.
Keyboard shortcuts while viewing: arrows/Space = next/previous, **Esc** = overview of all slides, **F** = full screen, **?** = help. To print or save as PDF, open the deck with `?print-pdf` at the end of the address and print from the browser.

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
