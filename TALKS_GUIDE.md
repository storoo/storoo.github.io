# Talks Page Guide

Everything about the Talks page (`/talks`) lives in three places:

| What | Where |
|------|-------|
| The list of talks and working groups | `data/site-config.json` → `talks` |
| The page of a working group (program, references, …) | `data/talks/content/<slug>.en.md` and/or `<slug>.fr.md` |
| Downloadable files (slides, notes, …) | `public/talks/files/` |

You never need to edit anything under `app/` or `components/`.

## How the page is laid out

- `/talks` has two sections, **Talks** and **Working groups**, each shown only
  when it has at least one entry.
- Talks are grouped by year, newest first (sorted automatically). Within one
  year, entries keep the order you wrote them in, so put the latest first.
- Working groups appear in the order you wrote them, so put the latest first.
- `/talks/<slug>` is a dedicated page, generated for every working group that
  has a `"slug"`.

Each talk shows as:

```
2026 │ Event · Place · Date                 ← small grey line
     │ Title of the talk                    ← prominent
     │ Expository talk on [paper] by …      ← optional note
     │ Slides · Notes · Paper               ← optional links
```

---

## Adding a talk

Inside `talks.talks` in `data/site-config.json`:

```json
{
  "year": "2026",
  "date": { "en": "October", "fr": "octobre" },
  "event": "Working group on …",
  "place": "Université d'Artois, Lens",
  "title": "Title of my talk",
  "note": {
    "en": "Expository talk on [A. Author, *Paper title*](https://arxiv.org/abs/XXXX.XXXXX).",
    "fr": "Exposé sur l'article [A. Auteur, *Titre*](https://arxiv.org/abs/XXXX.XXXXX)."
  },
  "links": [
    { "type": { "en": "Slides", "fr": "Transparents" }, "url": "./files/2026-wg-slides.pdf" },
    { "type": "Paper", "url": "https://arxiv.org/abs/XXXX.XXXXX" }
  ]
}
```

| Field | Required | Meaning |
|-------|----------|---------|
| `year` | yes | Year heading in the left column. |
| `event` | yes | Name of the seminar / conference / working group. Can be a link: `"[Séminaire X](https://…)"`. |
| `title` | yes | Title of the talk. LaTeX works: `"$$C_2$$-isovariant …"`. |
| `place` | no | Institution, city. |
| `date` | no | Shown at the end of the grey line, e.g. `"October"` or `"14 Oct."`. |
| `note` | no | One line of context. For an expository talk, credit the paper here. |
| `links` | no | Small links under the talk. `type` is the label you see. |
| `hidden` | no | `true` keeps the entry in the file but off the site (useful for drafts). |

Every text field can be a plain string or `{ "en": "…", "fr": "…" }`.
Markdown (links, *italics*) and `$$ … $$` math work in all of them.

### Several talks at the same event

Replace `title` / `note` / `links` with a `talks` list:

```json
{
  "year": "2023",
  "event": "Journées de topologie",
  "place": "Angers",
  "talks": [
    { "title": "Part I: …", "links": [{ "type": "Slides", "url": "./files/part1.pdf" }] },
    { "title": "Part II: …", "note": "Continuation of part I." }
  ]
}
```

---

## Adding a working group

Inside `talks.workingGroups`:

```json
{
  "period": "2025–2026",
  "name": { "en": "Working group on …", "fr": "Groupe de travail sur …" },
  "place": "Université d'Artois, Lens",
  "role": { "en": "Organizer", "fr": "Organisateur" },
  "summary": {
    "en": "One or two sentences shown on /talks.",
    "fr": "Une ou deux phrases affichées sur /talks."
  },
  "links": [{ "type": "Website", "url": "https://…" }]
}
```

`period`, `name` are required; `place`, `role`, `summary`, `links`, `hidden`
are optional.

### Giving a working group its own page

For a group with a lot of material (typically one you organized):

1. Add a `"slug"`, a short lowercase name with dashes, to its entry:
   `"slug": "infinity-cosmoi"`. It becomes the URL
   `https://storoo.fr/talks/infinity-cosmoi/`, and the group's name on `/talks`
   becomes a link with an arrow.
2. Create `data/talks/content/infinity-cosmoi.en.md` and/or
   `infinity-cosmoi.fr.md`. If you write only one language, it is shown in
   both. Without any file, the page shows the `summary`.

That's it. There is no registry to update: the files are found automatically.

The Markdown file accepts headings, lists, tables, links, raw HTML and
`$$ … $$` math. A typical page:

```markdown
This working group reads Riehl–Verity's book on $$\infty$$-cosmoi.

## Program

| Date | Speaker | Topic | Material |
|------|---------|-------|----------|
| 3 Oct. | S. Toro | Introduction | [Slides](./files/wg-cosmoi-01.pdf) |
| 10 Oct. | A. Speaker | Cartesian fibrations | |

## References

- E. Riehl, D. Verity, *Elements of ∞-category theory*.
```

To point a talk at its working group's page, link the event:
`"event": "[Working group on …](/talks/infinity-cosmoi/)"`.

---

## Linking to files

**Put the file in `public/talks/files/` and link it as `./files/<name>`.**
Create the folder the first time. The same `./files/…` link works on `/talks`
and on every working-group page. PDFs open in a new tab.

Use descriptive names, since all talks share one folder, e.g.
`2026-10-wg-cosmoi-slides.pdf`. A group with many files can have a
subfolder: `public/talks/files/infinity-cosmoi/…` → `./files/infinity-cosmoi/…`.

---

## Other settings

Optional keys directly under `talks` in `site-config.json`:

| Key | Effect |
|-----|--------|
| `intro` | Paragraph under the page title. |
| `talksHeading`, `workingGroupsHeading` | Override the section titles, e.g. `{ "en": "Selected talks", "fr": "Exposés choisis" }`. |
| `disableTalks`, `disableWorkingGroups` | `true` hides that section. |

Each section can be linked directly: `https://storoo.fr/talks/#talks` and
`https://storoo.fr/talks/#working-groups`.

---

## Checking locally before publishing

One-time setup: install Node.js (`sudo dnf install nodejs` on Fedora). The
`node_modules/` folder is already in the repository folder, so nothing else is
needed. If a command complains about a missing package, run `npm ci` once.

**While editing:** a live preview that reloads on every save.

```bash
npm run dev
# open http://localhost:3000/talks/   (Ctrl+C to stop)
```

**Before publishing:** build exactly what will go online, and look at it.
Stop `npm run dev` first (Ctrl+C): both commands write to the `.next/` folder
and break each other when they run at the same time.

```bash
npm run build                        # stops with an error if something is broken
python3 -m http.server 8000 -d out   # serve the built site
# open http://localhost:8000/talks/  (Ctrl+C to stop)
```

Warnings like `Attempted to load @next/swc-linux-x64-gnu, but it was not
installed` are harmless. A broken `site-config.json` (missing comma, extra
comma before `]`) shows up as a build error that names the file.

## Publishing

```bash
git add -A
git commit -m "Add talk at …"
git push
```

Pushing to `main` makes GitHub Actions rebuild the site and publish it on
https://storoo.fr within a few minutes (progress in the repository's
**Actions** tab). Files in `public/talks/files/` must be committed to appear
online. To keep a draft file local, list it in `.gitignore`.
