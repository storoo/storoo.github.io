# File Organization System

This document explains how to organize and reference files in your academic website.

## Directory Structure

```
public/
├── research/
│   └── files/
│       ├── research-project-1.pdf
│       ├── paper-draft.tex
│       └── data-analysis.xlsx
├── teaching/
│   └── files/
│       ├── course-notes-fall2025.pdf
│       ├── assignment-1.pdf
│       └── syllabus.docx
├── etc/
│   └── files/
│       ├── conference-presentation.pptx
│       ├── workshop-materials.zip
│       └── misc-document.pdf
└── [other files like profile.jpg, CV, etc.]
```

## How to Reference Files in JSON

### 1. Relative Paths Within Same Page
For files in the same page directory:
```json
{
  "description": "Download the [project report](./files/research-project-1.pdf) for details."
}
```

### 2. Cross-Page References
For files in other page directories:
```json
{
  "description": "See also [teaching materials](./teaching/files/course-notes.pdf) and [presentation slides](./etc/files/conference-slides.pptx)."
}
```

### 3. Mixed Content Example
```json
{
  "currentProjects": [
    {
      "title": "Advanced Mathematical Framework",
      "description": "This project explores novel approaches. View the [preliminary results](./files/results.pdf) and [methodology](./files/methods.docx). Related [teaching materials](./teaching/files/advanced-math.pdf) are also available.",
      "links": [
        { "type": "Draft Paper", "url": "./files/draft-paper.pdf" },
        { "type": "Data", "url": "./files/dataset.xlsx" }
      ]
    }
  ]
}
```

## Path Resolution Examples

The system automatically resolves paths based on context:

| JSON Context | Path in JSON | Resolved URL |
|-------------|-------------|-------------|
| Research page | `./files/project.pdf` | `/research/files/project.pdf` |
| Teaching page | `./files/notes.pdf` | `/teaching/files/notes.pdf` |
| Any page | `./research/files/paper.pdf` | `/research/files/paper.pdf` |
| Any page | `./teaching/files/syllabus.pdf` | `/teaching/files/syllabus.pdf` |

## Supported File Types

The system recognizes and handles these file types:

- **Documents**: PDF, DOC, DOCX, TXT, MD
- **Presentations**: PPT, PPTX  
- **Spreadsheets**: XLS, XLSX
- **Academic**: TEX, BIB
- **Archives**: ZIP, TAR, GZ
- **Media**: JPG, PNG, GIF, SVG, MP4, MP3

## Best Practices

1. **Use descriptive filenames**: `linear-algebra-notes.pdf` not `notes.pdf`
2. **Keep files organized**: Group related files together
3. **Use relative paths**: Start with `./` for better portability
4. **Include file extensions**: Always specify the complete filename
5. **Test links**: Verify file paths work before deploying

## File Upload Workflow

1. Add your file to the appropriate `/public/[page]/files/` directory
2. Reference it in your JSON using relative paths
3. The system automatically handles:
   - Path resolution
   - External link detection  
   - Download attributes for files
   - Proper link styling

## GitHub Pages Deployment

When deploying to GitHub Pages, all files in the `public` directory are served statically, so your file links will work seamlessly in production.
