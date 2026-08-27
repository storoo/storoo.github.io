# Teaching Pages Guide

Everything about the Teaching section lives in three places:

| What | Where |
|------|-------|
| The list of courses, headings, semesters, terms | `data/site-config.json` → `teaching` |
| The content of each course page (text, tables, videos) | `data/teaching/content/<slug>.en.md` and `<slug>.fr.md` |
| The registry connecting the two | `data/teaching/content/index.ts` |
| Downloadable files (PDFs, …) | `public/teaching/files/` |

You never need to edit anything under `app/` or `components/`.

## How pages are laid out

- `/teaching` — the index: **Current Courses** (grouped by semester) then
  **Previously Taught Courses** (grouped by university).
- `/teaching/<slug>` — one page per course, generated automatically for every
  course that has a `"slug"`. Archived courses keep their pages, so old links
  never break.

---

## Adding a new course

### 1. Pick a slug

A short lowercase name with dashes, e.g. `functions-real-variable`. It becomes
the URL: `https://storoo.fr/teaching/functions-real-variable/`.

### 2. Create the two content files

```
data/teaching/content/<slug>.en.md
data/teaching/content/<slug>.fr.md
```

They accept Markdown, raw HTML and LaTeX math between `$$ … $$`. Copy an
existing file (`linear-algebra.fr.md` is the most complete example) to start.

### 3. Register them in `data/teaching/content/index.ts`

```ts
import mySlugEn from './<slug>.en.md'
import mySlugFr from './<slug>.fr.md'

const teachingContent: Record<string, LocalizedContent> = {
  // …
  '<slug>': { en: mySlugEn, fr: mySlugFr },
}
```

### 4. Add the course to `data/site-config.json`

Inside `teaching.currentCourses`:

```json
{
  "slug": "<slug>",
  "contentRef": "<slug>",
  "title": {
    "en": "English title",
    "fr": "Titre en français"
  },
  "semester": { "en": "Semester 2", "fr": "Semestre 2" },
  "schedule": "TD1: Mon 09:00-10:30",
  "summary": {
    "en": "One or two sentences shown on the /teaching index.",
    "fr": "Une ou deux phrases affichées sur la page /teaching."
  },
  "keywords": [],
  "materials": []
}
```

| Field | Required | Meaning |
|-------|----------|---------|
| `slug` | yes (for a page) | URL of the course page. Without it, no page is created. |
| `contentRef` | yes | Key registered in `index.ts`. Usually the same as `slug`. |
| `title` | yes | Shown everywhere. Supports LaTeX, e.g. `"Arithmetic over $$\mathbb{Z}$$"`. |
| `semester` | no | Groups courses under a sub-heading on the index. Same value ⇒ same group. Omit it and the course shows without a sub-heading. |
| `schedule` | no | Small line under the title. Leave `""` to hide it. |
| `summary` | no | Short blurb on the index. The full content stays on the course page. |
| `keywords` | no | Small grey badges. |
| `materials` | no | Extra buttons: `[{ "type": "Syllabus", "url": "./files/syllabus.pdf" }]`. |

That's it — the page appears at `/teaching/<slug>` on the next build.

### Changing the year in the heading

`teaching.currentCoursesHeading` and `teaching.pastCoursesHeading` control the
two section titles, in both languages. Edit them there, not in the code.

---

## Linking to files (PDFs and friends)

**Rule: put the file in `public/teaching/files/` and link it as `./files/<name>`.**

```markdown
[TD 1](./files/Fiche_1_2026.pdf)
```

A `./files/…` path is rewritten at render time to `/teaching/files/…`, which is
an address from the root of the site. That means **the same link works from the
index page and from any course page** — you never have to adjust it when a
course is moved or archived, and you never have to write `../`.

Other forms that also work:

| You write | It resolves to |
|-----------|----------------|
| `./files/notes.pdf` (on a teaching page) | `/teaching/files/notes.pdf` |
| `./research/files/paper.pdf` | `/research/files/paper.pdf` |
| `/profile.jpg` | `/profile.jpg` (anything in `public/`) |
| `https://moodle.univ-artois.fr/` | opens in a new tab |

PDFs open in a new tab; other file types download. See `FILE_ORGANIZATION.md`
for the full list of recognised extensions.

A worksheet table, as used in Linear Algebra:

```markdown
| Fiche de TD | Corrections |
|-------------|-------------|
| [TD 1](./files/Fiche_1_2026.pdf) | [Correction](./files/Fiche_1_cor.pdf) |
| [TD 2](./files/Fiche_2_2026.pdf) |  |
```

Leave a cell empty when the correction is not out yet.

---

## Archiving a course at the end of the year

1. Cut its entry out of `teaching.currentCourses`.
2. Paste it into the `"courses"` list of the matching university block in
   `teaching.pastCourses` — create the block if that university isn't listed:

   ```json
   {
     "university": "Université d'Artois",
     "courses": [ … ]
   }
   ```
3. Replace `"semester"` with `"terms"`, e.g. `"terms": ["Fall 2025"]`.
4. Leave `"slug"` and `"contentRef"` alone.

**Nothing else moves.** The Markdown files stay in `data/teaching/content/`, the
PDFs stay in `public/teaching/files/`, and `/teaching/<slug>` keeps working —
the course title in the "Previously Taught Courses" card simply becomes a link
to it. Courses archived without a `slug` (the older Angers / Brest / Medellín
ones) stay as plain text, exactly as before.

---

## Publishing

```bash
npm run build   # writes the static site to out/
npm run deploy  # pushes out/ to GitHub Pages
```
