# Content Management Guide

This website uses a simple JSON-based content management system that allows you to easily update all content without touching the code.

## How to Update Content

All website content is stored in the `data/site-config.json` file. Simply edit this file to update any information on your website.

### Personal Information

Update your basic information in the `personal` section:

\`\`\`json
"personal": {
  "name": "Dr. [Your Name]",
  "title": "Mathematician & Researcher",
  "institution": "[University Name]",
  "department": "[Department Name]",
  "office": "[Building Name], Room [Number]",
  "email": "your.email@university.edu",
  "bio": "Your bio text here...",
  "profileImage": "/mathematician-portrait.png"
}
\`\`\`

### Research Content

Update research areas, projects, and publications in the `research` section:

- **Research Areas**: Add/edit research focus areas with descriptions and keywords
- **Current Projects**: Add new projects or update existing ones with status, descriptions, and links
- **Publications**: Add new papers with full citation information and links
- **Collaborations**: Update your academic collaborators and research groups

### Teaching Content

Update courses and teaching information in the `teaching` section:

- **Current Courses**: Update course codes, titles, schedules, and materials
- **Past Courses**: Add courses you've taught previously
- **Office Hours**: Update your availability and location
- **Teaching Philosophy**: Edit your teaching statement
- **Student Testimonials**: Add new student feedback

### Additional Content (Etc Page)

Update talks, awards, and service in the `etc` section:

- **Talks**: Add new presentations and conferences
- **Awards**: Update recognition and grants received
- **Service**: Update editorial and university service roles
- **Outreach**: Add public engagement and media appearances

## Adding New Pages

To add a new page to your website:

1. Create a new page file in the `app/` directory (e.g., `app/publications/page.tsx`)
2. Add the new page to the navigation in `components/navigation.tsx`
3. If needed, add corresponding data structure to `site-config.json`

## File Management

### Images
- Place images in the `public/` directory
- Reference them in the JSON config using paths like `/image-name.jpg`
- Update the `profileImage` path if you change your photo

### Documents (PDFs, etc.)
- Place documents in the `public/` directory
- Reference them in links using paths like `/cv.pdf` or `/syllabus.pdf`

## Tips for Easy Updates

1. **Regular Updates**: Update the JSON file whenever you have new publications, courses, or achievements
2. **Backup**: Keep a backup of your `site-config.json` file
3. **Validation**: Use a JSON validator to check your file if you encounter errors
4. **Consistent Formatting**: Follow the existing structure when adding new items

## Common Updates

### Adding a New Publication
\`\`\`json
{
  "title": "Your New Paper Title",
  "authors": ["Your Name", "Co-author"],
  "venue": "Journal Name, Volume, Year",
  "abstract": "Brief description...",
  "links": [
    { "type": "PDF", "url": "/papers/new-paper.pdf" },
    { "type": "DOI", "url": "https://doi.org/..." }
  ]
}
\`\`\`

### Adding a New Course
\`\`\`json
{
  "code": "MATH XXX",
  "title": "Course Title",
  "schedule": "Days Time",
  "enrollment": 30,
  "description": "Course description...",
  "keywords": ["Topic1", "Topic2"],
  "materials": [
    { "type": "Syllabus", "url": "/syllabi/course-syllabus.pdf" }
  ]
}
\`\`\`

### Adding a New Talk
\`\`\`json
{
  "title": "Talk Title",
  "date": "Month Year",
  "venue": "Conference/Institution Name",
  "type": "Invited/Seminar/Conference",
  "description": "Brief description...",
  "materials": [
    { "type": "Slides", "url": "/slides/talk-slides.pdf" }
  ]
}
\`\`\`

This system makes it very easy to keep your academic website up-to-date without needing to edit code files directly.
