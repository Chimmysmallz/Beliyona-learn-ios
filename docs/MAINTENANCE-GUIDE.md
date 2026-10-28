# Study Egg: Maintenance Guide

Picture this. It is a month before JAMB, a student messages you to say one answer is wrong, and you want to add ten new physics questions while you are at it. This guide is for that day. Everything Study Egg is made of sits in this repository, and you can change any of it with free tools on your own computer.

Prepared by Chiamaka Nwabulue.

---

## 1. Free tools

| Tool | Why | Where |
|---|---|---|
| Python 3 | Runs BUILD, CHECK and SERVE. On Windows, tick "Add python.exe to PATH" when installing. | python.org/downloads |
| Visual Studio Code | A free editor that colours the code and flags broken brackets as you type | code.visualstudio.com |
| GitHub Desktop | Saves your changes to GitHub and keeps a full history you can undo | desktop.github.com |
| Node.js (optional) | Deeper error check and the automated tests | nodejs.org (LTS) |
| Any AI chat assistant | Writes lessons and questions in the right format (section 8) | any |

---

## 2. The everyday routine

1. Open the `src` folder in VS Code (File → Open Folder).
2. Make your edit (section 4 tells you which file).
3. Double-click **PREVIEW.bat** to see it in your browser. Press Ctrl+F5 after each save.
4. Double-click **BUILD.bat**. Continue only if it says **ALL GOOD**.
5. Want to see it on your phone first? Double-click **SERVE.bat** and open the address it shows in Safari.
6. In GitHub Desktop: write a short summary, **Commit to main**, **Push origin**. The live site updates in about two minutes.

A blank screen in preview almost always means a missing bracket, comma or quote. BUILD names the file section and line.

---

## 3. Map of the source files

| File | What lives there |
|---|---|
| `src/index.html` | Every screen's layout, including the tab bar (search `class="nav"`) |
| `src/css/styles.css` | All styling. **Midnight Focus** styles and the **phone layout** (`@media (max-width:720px)`) are at the very end |
| `src/manifest.json` | Home-screen name and colours |
| `src/assets/icon.png`, `apple-touch-icon.png` | Home-screen icons (512 × 512 and 180 × 180) |
| `js/01-questions-bank.js` | The exam question banks (`window.EXTRA.waec`, `.jamb`, `.ican`, `.cibn`, `.uni`, `.voc`, `.jss`, `.lang`, `.va`, `.pm`, `.cc` and top-ups) and the Virtual Assistant, Product Management and Content Creation lesson text |
| `js/02-content.js` | Core app: rank names (`RANKS`), rank tiers (`AVATARS`), bosses (`BOSSES`), tracks (`TRACKS`), built-in subjects, saving, quizzes, Boss Battle |
| `js/03-themes.js` | Colour themes. `midnight` is first and is the default |
| `js/04-cloud-backend-...js` | Optional cloud sync (Supabase) |
| `js/05-coin-shop.js` | Shop prices, badge styles, streak freeze |
| `js/06-free-craft-patterns.js` | Free crochet, sewing and bead patterns |
| `js/07-mock-...-paystack.js` | Mock exams, certificates, read-aloud, Paystack |
| `js/08-teacher-parent-...js` | Teacher and parent dashboards, invites, backup |
| `js/09-ai-deck-creation-...js` | AI deck creation and deck sharing |
| `js/10-career-mini-lessons.js` | Lesson reader, extra detail for VA/PM/CC lessons, and the **guided tours** |
| `js/11-extra-track-mini-lessons...js` | Lessons for WAEC, JAMB, Vocational, Languages, University, ICAN, CIBN |
| `js/12-study-egg-midnight-focus-add-ons.js` | The "More" sheet on phones, the one-time move to Midnight Focus, and the Dashboard startup fix |

In VS Code, **Ctrl+Shift+F** searches every file at once. Searching for a sentence you can see in the app is the fastest way to find where it lives.

---

## 4. Common edits

### 4.1 Add an exam question
In `js/01-questions-bank.js`, find the deck (for example search `pq_waec_sci`) and add a line inside its `cards: [ ... ]`:

```js
// Multiple choice: a = correct answer, w = three wrong answers
{ t: "mc", q: "What is the chemical symbol for sodium?", a: "Na", w: ["So", "Sd", "S"], e: "From its Latin name, natrium.", band: "senior" },
// True or false
{ t: "tf", q: "Lagos is the capital of Nigeria.", a: "False", e: "Abuja has been the capital since 1991.", band: "senior" },
// Type the answer (accepts = other spellings you also mark correct)
{ t: "type", q: "The powerhouse of the cell is the ______.", a: "mitochondrion", accepts: ["mitochondria"], e: "It releases energy as ATP.", band: "senior" },
```

Always include `e`, the explanation. That is where the learning happens. Copy the `band` used by the cards around yours (`senior` or `junior`).

### 4.2 Add a deck
Inside any `window.EXTRA.<track> = [ ... ]` list:

```js
{ id: "pq_waec_civic", name: "WAEC — Civic Education", emoji: "🏛️",
  cards: [ { t: "mc", q: "...", a: "...", w: ["...", "...", "..."], e: "...", band: "senior" } ] },
```

Never change an existing deck `id`. Learners' progress is saved against it.

### 4.3 Add or edit a mini-lesson
In `js/11-extra-track-mini-lessons...js`, each lesson looks like this:

```js
{t:"Lesson title", intro:"Two or three sentences on why this matters.", mins:3,
 points:["Key point one.","Key point two.","Key point three."],
 takeaways:["Remember this.","And this.","And this."],
 tryThis:"A short exercise the learner can do today.",
 keyTerms:[{t:"Term",d:"Plain-English definition."}]},
```

To give lessons to a new track, copy an `add("waec", ...)` block and change the id, name and emoji. The Mini-lessons banner appears automatically for any track that has lessons.

### 4.4 Add a track
In `js/02-content.js`, search `const TRACKS=[` and add `{id:'nursing',name:'Nursing Exams',emoji:'🩺',tier:'premium'},` (tier is `free`, `premium` or `ultra`). Add `window.EXTRA.nursing = [ ... ]` in the question bank, and add `'nursing'` to the list on the line in `02-content.js` that begins `['ican','cibn','uni','voc','va','pm','cc','lang'].forEach(`.

### 4.5 Change Midnight Focus colours
In `js/03-themes.js`, the first entry is `midnight:{...}`. The key colours:

| Key | Now | Used for |
|---|---|---|
| `bg` | `#0b0b0f` | Page background |
| `card` | `#16161c` | Cards and panels |
| `line` | `#26262f` | Hairline borders |
| `txt` / `muted` | `#f2f2f5` / `#8d8d9b` | Main and secondary text |
| `accent` | `#d4ff3a` | Lime buttons, progress bars, active tab |

If you change `bg`, also change `theme_color` and `background_color` in `src/manifest.json` and the `theme-color` line near the top of `src/index.html`. Midnight-only styling (button text colour, flat cards) is in `src/css/styles.css`, under the comment `Midnight Focus theme`.

### 4.6 Change the tab bar
The tabs are in `src/index.html` (search `class="nav"`). A tab with the class `nav-more-item` is hidden on phones and appears inside **More** instead. The list of views shown in More is `MORE_VIEWS` in `js/12-...add-ons.js`. Keep the bottom bar to five tabs plus More so the labels stay readable on small phones.

### 4.7 Ranks, bosses and Boss Battle difficulty
In `js/02-content.js`:
- `AVATARS` sets the rank tiers (Rookie at level 1, Bronze at 3, Silver at 5, Gold at 7, Platinum at 10, Elite at 14).
- `RANKS` sets the rank names shown beside the level ring.
- `BOSSES` sets the boss names.
- `BOSS_TIME=12` sets the seconds per question, and `lives:3` sets the lives per battle.

### 4.8 Guided tours
In `js/10-career-mini-lessons.js`, search `BL_HOME_STEPS` and `BL_LESSON_STEPS`. Reword `title` and `body` freely. Leave `sel` alone, because it tells the arrow where to point.

### 4.9 Payments and cloud sync (optional)
- **Paystack:** paste your **public** key (`pk_live_...`) into `const PAYSTACK_KEY = "";` in `js/07-...`. Never paste the secret key.
- **Supabase:** fill `const SQ_CONFIG = { url: "", anonKey: "" };` in `js/04-...` with your project URL and **anon public** key. Never the service-role key.

### 4.10 Change the icon
Replace `src/assets/icon.png` (512 × 512) and `src/assets/apple-touch-icon.png` (180 × 180) with square PNGs and keep the filenames. The full-size original is in `design/app-icon-1024.png`.

---

## 5. Protecting learners' progress

- **Same web address, always.** Progress lives on each learner's phone, tied to the site address. If you ever must move, ask learners to export from Profile → Your Data & Backup first, then import on the new site.
- **Never rename** `const KEY="studyquest_v2";` in `js/02-content.js`.
- **Never change existing deck ids.**

---

## 6. If you only have a single Study Egg file

Run `python tools/split.py yourfile.html src` (move any existing `src` folder out of the way first). You get an editable `src` folder back, and BUILD packs it again.

---

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| Blank screen | A broken bracket, comma or quote. Run BUILD, which names the section and line. |
| `python is not recognised` | Reinstall Python and tick "Add python.exe to PATH". |
| Red cross on GitHub | Usually `index.html` was not rebuilt. Run BUILD, then commit and push again. Open the **Actions** tab to read the exact message. |
| Change not on my phone | Wait two minutes after pushing, then close the app fully and reopen it. If it still looks old, remove the icon and add it to the home screen again. |
| SERVE address does not open on phone | Phone and computer must be on the same Wi-Fi. If Windows asks about the firewall, allow Python on private networks. |
| New track not showing | Check the id matches in `TRACKS`, in `window.EXTRA`, and in the loader list (4.4). |

---

## 8. Getting help from any AI assistant

Paste one file (or, for the large question bank, just the deck you are working on) with a prompt like this:

> I maintain a learning web app called Study Egg. Below is one JavaScript file from it, `[file name]`. Please [add five JAMB Chemistry multiple-choice questions on acids and bases]. Keep the exact same data format and do not change any `id` values or function names. Return the complete updated section only.

Paste the answer into VS Code, preview, run BUILD. If BUILD reports a problem, paste its message back to the AI. Double-check every exam answer against the official syllabus or past papers, because AI tools make confident mistakes.
