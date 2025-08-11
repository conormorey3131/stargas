# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Stargas Ireland** - a professional static HTML website for Ireland's leading RENT FREE industrial gas supplier. The project is a multi-page corporate website built with vanilla HTML, CSS, and JavaScript.

## Architecture

- **Static HTML site** with no build process or package management
- **Multi-page structure** with consistent navigation and styling
- **Professional responsive design** using modern CSS with custom properties
- **Vanilla JavaScript** for interactivity (no frameworks)

### Core Components

1. **Main Pages**: `index.html` (homepage), product pages (`propane-gas.html`, `welding-gas.html`, etc.), `contact.html`, `store-locator.html`
2. **Shared Navigation**: Professional header with dropdown menus and mobile-responsive design
3. **CSS Architecture**: Single main stylesheet (`css/styles.css`) with professional design system using CSS custom properties
4. **JavaScript Modules**: Page-specific JS files in `js/` directory plus shared `main.js` and `chatbot.js`

### Key Features

- **Responsive Design**: Mobile-first approach with professional breakpoints
- **SEO Optimized**: Comprehensive meta tags, structured data (JSON-LD), and semantic HTML
- **Professional UI**: Modern design system with consistent spacing, typography, and color schemes
- **Accessibility**: Keyboard navigation, focus management, ARIA attributes
- **Interactive Elements**: Mobile menu, dropdown navigation, smooth scrolling, intersection observer animations

## File Structure

```
/
├── *.html                    # Main site pages
├── css/
│   ├── styles.css           # Main stylesheet with design system
│   └── *.css               # Page-specific styles
├── js/
│   ├── main.js             # Core site functionality
│   ├── chatbot.js          # AI chatbot implementation
│   ├── store-data.js       # Store location data
│   └── *.js               # Page-specific JavaScript
└── images/                 # Site assets and logos
```

## Development Guidelines

### No Build Process
This project uses vanilla web technologies with no build tools, bundlers, or package managers. All files are served directly.

### CSS Architecture
- Uses CSS custom properties for consistent design tokens
- Professional spacing scale, typography hierarchy, and color system
- Mobile-first responsive design with semantic breakpoints
- Modern CSS features (flexbox, grid, custom properties)

### JavaScript Patterns
- ES6+ features with backward compatibility considerations
- Modular approach with page-specific scripts
- Event delegation and performance optimizations
- Intersection Observer for scroll animations

### Code Style
- Semantic HTML5 structure with proper accessibility attributes
- BEM-inspired CSS naming where applicable
- Clean, professional JavaScript with consistent formatting
- Comprehensive commenting for complex interactions

## Common Operations

Since this is a static site with no build process:

- **File Serving**: Open HTML files directly in browser or use a local server
- **Development**: Edit files directly and refresh browser to see changes
- **Deployment**: Upload all files to web server (maintaining directory structure)
- **Testing**: Manual testing across browsers and devices

## Site Content Focus

The website promotes Stargas Ireland as a premium industrial gas supplier with emphasis on:
- RENT FREE cylinder policy (key differentiator)
- Professional B2B relationships with 60+ stockists
- ISO 9001:2015 certification and Guaranteed Irish status
- Comprehensive gas product range (propane, welding gas, nitrogen, etc.)
- Established since 2010 with strong Irish market presence