# Church Next Steps - Website Scaffold

## Purpose
Next Steps / Discipleship focused website. Theme emphasizes retention, growth, and clear pathways with step-based content flow.

## Architecture
- Static HTML, SCSS, and vanilla JavaScript
- Gulp build system
- AOS (Animate On Scroll) for animations
- Image optimization with WebP conversion
- Isolated codebase (no shared dependencies)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build for production:
```bash
npm run build
```

3. Watch for development:
```bash
npm run watch
```

4. Create distribution zip:
```bash
gulp zip
```

## Structure

```
church-next-steps/
├── src/
│   ├── scss/
│   │   └── main.scss
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   └── placeholders/
│   │       ├── hero-placeholder.jpg
│   │       ├── section-placeholder.jpg
│   │       └── people-placeholder.jpg
│   └── fonts/
├── dist/          (generated)
├── index.html
├── gulpfile.js
└── package.json
```

## Image Placeholders Required

Place these placeholder images in `src/images/placeholders/`:
- `hero-placeholder.jpg`
- `section-placeholder.jpg`
- `people-placeholder.jpg`

The build process will optimize these and create WebP versions.

## Build Tasks

- `gulp build` - Full build (cleans, compiles, minifies, optimizes)
- `gulp watch` - Watch files and rebuild on changes
- `gulp clean` - Remove dist directory
- `gulp zip` - Build and create distribution zip

## Notes

- AOS library is loaded locally from node_modules
- All animations use data attributes only (no JS logic yet)
- Colors and fonts to be assigned later





