# Bilingual Content Guide (EN/FR)

Your website now supports English and French! Here's how it works:

## How It Works

1. **Language Switcher**: EN/FR buttons appear in the navigation bar (top right)
2. **Language Persistence**: The selected language is saved in the browser's localStorage
3. **Default Language**: English is the default when visiting for the first time

## Adding Bilingual Content

To make content bilingual, change from a simple string to an object with `en` and `fr` keys:

### Before (English only):
```json
"description": "This is my course description"
```

### After (Bilingual):
```json
"description": {
  "en": "This is my course description",
  "fr": "Ceci est la description de mon cours"
}
```

## Examples Already Converted

The following sections now have bilingual support:

1. **Personal Info** (Home page):
   - `title` - Your position/introduction
   - `bio` - Your biography

2. **Teaching Courses**:
   - Linear Algebra course description
   - Methods for Mathematics and Computer Science course description

## Adding More Bilingual Content

You can convert any text field to bilingual format. Common places to translate:

### Research Section:
```json
"overview": {
  "en": "In the past I worked on...",
  "fr": "Dans le passé, j'ai travaillé sur..."
}
```

### Research Areas:
```json
{
  "title": "Isovariant Homotopy Theory",
  "description": {
    "en": "I developed a simplicial approach...",
    "fr": "J'ai développé une approche simpliciale..."
  }
}
```

### Course Materials:
```json
"materials": [
  { 
    "type": {
      "en": "Syllabus",
      "fr": "Programme"
    }, 
    "url": "/syllabus.pdf" 
  }
]
```

## Technical Details

- **Component**: Language state is managed by `LanguageContext` in `lib/language-context.tsx`
- **Switcher**: The EN/FR button component is in `components/language-switcher.tsx`
- **Processing**: The `RichContent` component automatically detects and displays the correct language
- **Data Layer**: All data-fetching functions in `lib/site-data.ts` support language parameter

## Tips

1. **Gradual Translation**: You don't need to translate everything at once. Mixed content (some bilingual, some English-only) works fine.
2. **Markdown Support**: Both languages support full Markdown, HTML, and LaTeX math.
3. **Tables**: Tables work the same in both languages, just translate the text content.
4. **Links**: URLs don't need translation, but link text inside markdown links can be translated.

## Testing

To test your translations:
1. Run `npm run dev`
2. Click the EN/FR buttons in the navigation
3. Check that content changes appropriately

The language preference persists across page navigation and browser sessions!
