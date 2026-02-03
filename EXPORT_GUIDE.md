# Website Export Guide

## 🎉 NEW: ZIP Package Export

Your website builder now supports **multi-page ZIP export** - a complete package with separate HTML files for each page!

### What's Included in ZIP Export:

1. **index.html** - Your homepage (first page)
2. **[page-name].html** - Separate HTML file for each additional page
3. **styles.css** - All CSS styles and 30+ animation keyframes
4. **script.js** - JavaScript for navigation and interactions
5. **README.txt** - Instructions for using and hosting your website

### Features:

✅ **Separate HTML Files** - Each page gets its own HTML file (like a real website!)
✅ **Shared Styles** - All pages use the same styles.css file
✅ **Working Navigation** - Navigation bar and button links work properly
✅ **All Animations** - Includes fadeIn, slideIn, bounce, rotate, flip, pulse, shake, and more
✅ **Ready to Host** - Upload to Netlify, Vercel, GitHub Pages, or any hosting service

### How to Use:

1. Click **Export** button in editor header
2. Select **Export ZIP Package** (first option with purple highlight)
3. Wait for download to complete
4. Extract the ZIP file
5. Open **index.html** in your browser to test
6. Upload all files to your web hosting service

### Export Options:

| Option | Description | Best For |
|--------|-------------|----------|
| **Export ZIP Package** | Complete multi-page website | Production websites, hosting |
| Export JSON | Project file format | Backup, re-importing |
| Export HTML | Single HTML file with all pages | Quick preview, single-page sites |
| Export React | React component code | React projects |

### Page Navigation:

- **Navigation Bar**: Fixed at top, automatically generated from your pages
- **Button Links**: Buttons with page links use `data-link` attribute
- **JavaScript**: Handles page transitions and animations

### File Structure:

```
website-export.zip
├── index.html        (Homepage)
├── about.html        (About page)
├── contact.html      (Contact page)
├── styles.css        (All styles + animations)
├── script.js         (Navigation + interactions)
└── README.txt        (Instructions)
```

### Hosting Services:

Upload your extracted files to any of these:

- **Netlify**: Drag & drop the folder
- **Vercel**: Deploy via CLI or GitHub
- **GitHub Pages**: Push to repository
- **Cloudflare Pages**: Connect Git repo
- **Neocities**: Upload via web interface

### Animations Included:

- fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight
- zoomIn, zoomOut
- slideInUp, slideInDown, slideInLeft, slideInRight
- bounce, bounceIn
- rotateIn
- flipInX, flipInY
- pulse, shake, swing, tada, wobble, jello

All animations are customizable with duration, delay, and infinite loop options!

---

**Pro Tip**: Test your website locally by opening index.html in a browser before uploading to hosting. Make sure all page links and animations work as expected.
