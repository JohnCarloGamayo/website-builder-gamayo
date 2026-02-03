import { ComponentData, Page } from '@/store/editorStore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Animation keyframes to include in exported CSS
const ANIMATION_CSS = `
/* Animation Keyframes */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 100%, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translate3d(0, -100%, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes fadeInLeft { from { opacity: 0; transform: translate3d(-100%, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes fadeInRight { from { opacity: 0; transform: translate3d(100%, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes zoomIn { from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } 50% { opacity: 1; } }
@keyframes zoomOut { from { opacity: 1; } 50% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } to { opacity: 0; } }
@keyframes slideInUp { from { transform: translate3d(0, 100%, 0); visibility: visible; } to { transform: translate3d(0, 0, 0); } }
@keyframes slideInDown { from { transform: translate3d(0, -100%, 0); visibility: visible; } to { transform: translate3d(0, 0, 0); } }
@keyframes slideInLeft { from { transform: translate3d(-100%, 0, 0); visibility: visible; } to { transform: translate3d(0, 0, 0); } }
@keyframes slideInRight { from { transform: translate3d(100%, 0, 0); visibility: visible; } to { transform: translate3d(0, 0, 0); } }
@keyframes bounce { from, 20%, 53%, 80%, to { transform: translate3d(0,0,0); } 40%, 43% { transform: translate3d(0, -30px, 0); } 70% { transform: translate3d(0, -15px, 0); } 90% { transform: translate3d(0,-4px,0); } }
@keyframes bounceIn { from, 20%, 40%, 60%, 80%, to { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); } 0% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } 20% { transform: scale3d(1.1, 1.1, 1.1); } 40% { transform: scale3d(0.9, 0.9, 0.9); } 60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); } 80% { transform: scale3d(0.97, 0.97, 0.97); } to { opacity: 1; transform: scale3d(1, 1, 1); } }
@keyframes rotateIn { from { transform-origin: center; transform: rotate3d(0, 0, 1, -200deg); opacity: 0; } to { transform-origin: center; transform: translate3d(0, 0, 0); opacity: 1; } }
@keyframes flipInX { from { transform: perspective(400px) rotate3d(1, 0, 0, 90deg); animation-timing-function: ease-in; opacity: 0; } 40% { transform: perspective(400px) rotate3d(1, 0, 0, -20deg); } 60% { transform: perspective(400px) rotate3d(1, 0, 0, 10deg); opacity: 1; } 80% { transform: perspective(400px) rotate3d(1, 0, 0, -5deg); } to { transform: perspective(400px); } }
@keyframes flipInY { from { transform: perspective(400px) rotate3d(0, 1, 0, 90deg); animation-timing-function: ease-in; opacity: 0; } 40% { transform: perspective(400px) rotate3d(0, 1, 0, -20deg); } 60% { transform: perspective(400px) rotate3d(0, 1, 0, 10deg); opacity: 1; } 80% { transform: perspective(400px) rotate3d(0, 1, 0, -5deg); } to { transform: perspective(400px); } }
@keyframes pulse { from { transform: scale3d(1, 1, 1); } 50% { transform: scale3d(1.05, 1.05, 1.05); } to { transform: scale3d(1, 1, 1); } }
@keyframes shake { from, to { transform: translate3d(0, 0, 0); } 10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); } 20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); } }
@keyframes swing { 20% { transform: rotate3d(0, 0, 1, 15deg); } 40% { transform: rotate3d(0, 0, 1, -10deg); } 60% { transform: rotate3d(0, 0, 1, 5deg); } 80% { transform: rotate3d(0, 0, 1, -5deg); } to { transform: rotate3d(0, 0, 1, 0deg); } }
@keyframes tada { from { transform: scale3d(1, 1, 1); } 10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); } 30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); } 40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); } to { transform: scale3d(1, 1, 1); } }
@keyframes wobble { from { transform: translate3d(0, 0, 0); } 15% { transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); } 30% { transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); } 45% { transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); } 60% { transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); } 75% { transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); } to { transform: translate3d(0, 0, 0); } }
@keyframes jello { from, 11.1%, to { transform: translate3d(0, 0, 0); } 22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); } 33.3% { transform: skewX(6.25deg) skewY(6.25deg); } 44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); } 55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); } 66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); } 77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); } 88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); } }

/* Animation utility classes */
.animate-fade-in { animation: fadeIn 1s ease forwards; }
.animate-fade-in-up { animation: fadeInUp 1s ease forwards; }
.animate-fade-in-down { animation: fadeInDown 1s ease forwards; }
.animate-fade-in-left { animation: fadeInLeft 1s ease forwards; }
.animate-fade-in-right { animation: fadeInRight 1s ease forwards; }
.animate-zoom-in { animation: zoomIn 1s ease forwards; }
.animate-zoom-out { animation: zoomOut 1s ease forwards; }
.animate-slide-in-up { animation: slideInUp 1s ease forwards; }
.animate-slide-in-down { animation: slideInDown 1s ease forwards; }
.animate-slide-in-left { animation: slideInLeft 1s ease forwards; }
.animate-slide-in-right { animation: slideInRight 1s ease forwards; }
.animate-bounce { animation: bounce 1s ease infinite; }
.animate-bounce-in { animation: bounceIn 1s ease forwards; }
.animate-rotate-in { animation: rotateIn 1s ease forwards; }
.animate-flip-in-x { animation: flipInX 1s ease forwards; }
.animate-flip-in-y { animation: flipInY 1s ease forwards; }
.animate-pulse { animation: pulse 2s ease infinite; }
.animate-shake { animation: shake 1s ease forwards; }
.animate-swing { animation: swing 1s ease forwards; }
.animate-tada { animation: tada 1s ease forwards; }
.animate-wobble { animation: wobble 1s ease forwards; }
.animate-jello { animation: jello 1s ease forwards; }
`;

const BASE_CSS = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  background: white;
}

.page-section {
  background: white;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
}

.component {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-component, .button-component {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.button-component {
  cursor: pointer;
  border: none;
  outline: none;
  transition: opacity 0.2s, transform 0.2s;
}

.button-component:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.image-component {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.input-component {
  border: 1px solid #ccc;
  padding: 8px;
  outline: none;
  width: 100%;
}

.input-component:focus {
  border-color: #4f46e5;
}

/* Responsive scaling */
@media (max-width: 1440px) {
  .page-section {
    transform-origin: top left;
  }
}

@media (max-width: 768px) {
  .page-section .component {
    /* Components will scale based on viewport */
  }
}

@media (max-width: 480px) {
  body {
    font-size: 14px;
  }
}
`;

const NAVIGATION_JS = `
// Page navigation and interactions
document.addEventListener('DOMContentLoaded', function() {
  // Handle internal page links (buttons with data-link)
  document.querySelectorAll('[data-link]').forEach(button => {
    button.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-link');
      window.location.href = targetPage + '.html';
    });
  });

  // Trigger animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = 'visible';
      }
    });
  }, observerOptions);

  document.querySelectorAll('[class*="animate-"]').forEach(el => {
    observer.observe(el);
  });
});
`;

export function generateHTMLExport(pages: Page[], canvasWidth: number): string {
  const generateStyles = (comp: ComponentData): string => {
    const styles = comp.styles;
    const hasBorder = styles.borderWidth && styles.borderWidth > 0 && styles.borderColor;
    
    return `
      width: ${styles.width}px;
      height: ${styles.height}px;
      position: absolute;
      left: ${styles.x}px;
      top: ${styles.y}px;
      ${styles.backgroundColor ? `background-color: ${styles.backgroundColor};` : ''}
      ${styles.textColor ? `color: ${styles.textColor};` : ''}
      ${styles.fontSize ? `font-size: ${styles.fontSize}px;` : ''}
      ${styles.fontWeight ? `font-weight: ${styles.fontWeight};` : ''}
      ${styles.fontFamily ? `font-family: ${styles.fontFamily};` : ''}
      ${styles.borderRadius ? `border-radius: ${styles.borderRadius}px;` : ''}
      ${styles.opacity !== undefined ? `opacity: ${styles.opacity};` : ''}
      ${styles.padding ? `padding: ${styles.padding}px;` : ''}
      ${styles.textAlign ? `text-align: ${styles.textAlign};` : ''}
      ${hasBorder ? `border: ${styles.borderWidth}px ${styles.borderStyle || 'solid'} ${styles.borderColor};` : 'border: none;'}
      ${styles.boxShadow ? `box-shadow: ${styles.boxShadow};` : ''}
      ${styles.rotation ? `transform: rotate(${styles.rotation}deg);` : ''}
      z-index: ${styles.zIndex || 0};
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    `.trim();
  };

  const generateAnimationClass = (comp: ComponentData): string => {
    if (!comp.animation) return '';
    const animClass = `animate-${comp.animation.type}`;
    return animClass;
  };

  const generateAnimationStyle = (comp: ComponentData): string => {
    if (!comp.animation) return '';
    return `animation-duration: ${comp.animation.duration}s; animation-delay: ${comp.animation.delay}s; ${comp.animation.infinite ? 'animation-iteration-count: infinite;' : ''}`;
  };

  const findPageByCompId = (pageId: string): Page | undefined => {
    return pages.find(p => p.id === pageId);
  };

  const generateComponent = (comp: ComponentData): string => {
    const style = generateStyles(comp);
    const animClass = generateAnimationClass(comp);
    const animStyle = generateAnimationStyle(comp);
    const fullStyle = animStyle ? `${style} ${animStyle}` : style;
    const classAttr = animClass ? `class="${animClass}"` : '';
    
    // Handle page links
    const linkedPage = comp.linkToPageId ? findPageByCompId(comp.linkToPageId) : null;
    const onclickAttr = linkedPage ? `onclick="document.getElementById('${linkedPage.slug}').scrollIntoView({behavior: 'smooth'})"` : '';
    
    switch (comp.type) {
      case 'text':
        return `<div ${classAttr} style="${fullStyle}">${comp.content || ''}</div>`;
      case 'button':
        return `<button ${classAttr} ${onclickAttr} style="${fullStyle}">${comp.content || 'Button'}</button>`;
      case 'image':
        return `<img src="${comp.src || ''}" alt="${comp.name}" ${classAttr} style="${fullStyle}" />`;
      case 'input':
        return `<input type="text" placeholder="${comp.placeholder || ''}" ${classAttr} style="${fullStyle}" />`;
      case 'video':
        return `<video controls ${classAttr} style="${fullStyle}"><source src="${comp.src || ''}" /></video>`;
      case 'divider':
        return `<hr ${classAttr} style="${fullStyle}" />`;
      case 'container':
        return `<div ${classAttr} style="${fullStyle}"></div>`;
      default:
        return `<div ${classAttr} style="${fullStyle}">${comp.content || ''}</div>`;
    }
  };

  const generatePageHTML = (page: Page): string => {
    const componentsHTML = page.components
      .filter(c => c.visible !== false)
      .map(comp => generateComponent(comp))
      .join('\n    ');

    return `
  <section id="${page.slug}" class="page-section" style="position: relative; width: 100%; min-height: ${page.canvasHeight}px; overflow: hidden;">
    ${componentsHTML}
  </section>`;
  };

  const allPagesHTML = pages.map(page => generatePageHTML(page)).join('\n');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      background: white;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    
    .page-section {
      background: white;
      margin: 0;
      padding: 0;
      width: 100%;
      overflow: hidden;
    }
    
    .text-component, .button-component {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
    }
    
    .button-component {
      cursor: pointer;
      border: none;
      outline: none;
    }
    
    .button-component:hover {
      opacity: 0.8;
    }
    
    .image-component {
      object-fit: cover;
    }
    
    .input-component {
      border: 1px solid #ccc;
      padding: 8px;
      outline: none;
    }
    
    .input-component:focus {
      border-color: #4f46e5;
    }
    
    ${ANIMATION_CSS}
  </style>
</head>
<body>
${allPagesHTML}
</body>
</html>
  `.trim();
}

// Generate complete multi-page ZIP package
export async function generateZipExport(pages: Page[], canvasWidth: number): Promise<void> {
  const zip = new JSZip();
  const baseWidth = 1440; // Base design width

  // Helper functions for component generation - uses percentage for responsive
  const generateStyles = (comp: ComponentData): string => {
    const styles = comp.styles;
    // Convert to percentage for responsive layout
    const leftPercent = (styles.x / baseWidth) * 100;
    const widthPercent = (styles.width / baseWidth) * 100;
    // Scale height proportionally based on width ratio for better responsive
    const heightVw = (styles.height / baseWidth) * 100;
    
    // Determine if component needs border
    const hasBorder = styles.borderWidth && styles.borderWidth > 0 && styles.borderColor;
    
    return `
      width: ${widthPercent.toFixed(2)}%;
      height: max(${Math.round(styles.height * 0.5)}px, ${heightVw.toFixed(2)}vw);
      position: absolute;
      left: ${leftPercent.toFixed(2)}%;
      top: ${styles.y}px;
      ${styles.backgroundColor ? `background-color: ${styles.backgroundColor};` : ''}
      ${styles.textColor ? `color: ${styles.textColor};` : ''}
      ${styles.fontSize ? `font-size: clamp(${Math.round(styles.fontSize * 0.5)}px, ${(styles.fontSize / baseWidth * 100).toFixed(2)}vw, ${styles.fontSize}px);` : ''}
      ${styles.fontWeight ? `font-weight: ${styles.fontWeight};` : ''}
      ${styles.fontFamily ? `font-family: ${styles.fontFamily};` : ''}
      ${styles.borderRadius ? `border-radius: ${styles.borderRadius}px;` : ''}
      ${styles.opacity !== undefined ? `opacity: ${styles.opacity};` : ''}
      ${styles.padding ? `padding: ${styles.padding}px;` : ''}
      ${styles.textAlign ? `text-align: ${styles.textAlign};` : ''}
      ${hasBorder ? `border: ${styles.borderWidth}px ${styles.borderStyle || 'solid'} ${styles.borderColor};` : 'border: none;'}
      ${styles.boxShadow ? `box-shadow: ${styles.boxShadow};` : ''}
      ${styles.rotation ? `transform: rotate(${styles.rotation}deg);` : ''}
      z-index: ${styles.zIndex || 0};
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      overflow: hidden;
    `.trim();
  };

  // Special styles for images
  const generateImageStyles = (comp: ComponentData): string => {
    const styles = comp.styles;
    const leftPercent = (styles.x / baseWidth) * 100;
    const widthPercent = (styles.width / baseWidth) * 100;
    const heightVw = (styles.height / baseWidth) * 100;
    
    return `
      width: ${widthPercent.toFixed(2)}%;
      height: max(${Math.round(styles.height * 0.5)}px, ${heightVw.toFixed(2)}vw);
      position: absolute;
      left: ${leftPercent.toFixed(2)}%;
      top: ${styles.y}px;
      object-fit: cover;
      ${styles.borderRadius ? `border-radius: ${styles.borderRadius}px;` : ''}
      ${styles.opacity !== undefined ? `opacity: ${styles.opacity};` : ''}
      z-index: ${styles.zIndex || 0};
      border: none;
    `.trim();
  };

  const generateAnimationClass = (comp: ComponentData): string => {
    if (!comp.animation) return '';
    return `animate-${comp.animation.type}`;
  };

  const generateAnimationStyle = (comp: ComponentData): string => {
    if (!comp.animation) return '';
    return `animation-duration: ${comp.animation.duration}s; animation-delay: ${comp.animation.delay}s; ${comp.animation.infinite ? 'animation-iteration-count: infinite;' : ''}`;
  };

  const findPageByCompId = (pageId: string): Page | undefined => {
    return pages.find(p => p.id === pageId);
  };

  const generateComponent = (comp: ComponentData): string => {
    const animClass = generateAnimationClass(comp);
    const animStyle = generateAnimationStyle(comp);
    
    // Handle page links
    const linkedPage = comp.linkToPageId ? findPageByCompId(comp.linkToPageId) : null;
    const dataLinkAttr = linkedPage ? `data-link="${linkedPage.slug}"` : '';
    
    switch (comp.type) {
      case 'text':
        const textStyle = generateStyles(comp);
        const textFullStyle = animStyle ? `${textStyle} ${animStyle}` : textStyle;
        return `<div ${animClass ? `class="${animClass}"` : ''} style="${textFullStyle}">${comp.content || ''}</div>`;
      case 'button':
        const btnStyle = generateStyles(comp);
        const btnFullStyle = animStyle ? `${btnStyle} ${animStyle}` : btnStyle;
        return `<button ${animClass ? `class="${animClass}"` : ''} ${dataLinkAttr} style="${btnFullStyle}; cursor: pointer;">${comp.content || 'Button'}</button>`;
      case 'image':
        const imgStyle = generateImageStyles(comp);
        const imgFullStyle = animStyle ? `${imgStyle} ${animStyle}` : imgStyle;
        return `<img src="${comp.src || ''}" alt="${comp.name}" ${animClass ? `class="${animClass}"` : ''} style="${imgFullStyle}" />`;
      case 'input':
        const inputStyle = generateStyles(comp);
        const inputFullStyle = animStyle ? `${inputStyle} ${animStyle}` : inputStyle;
        return `<input type="text" placeholder="${comp.placeholder || ''}" ${animClass ? `class="${animClass}"` : ''} style="${inputFullStyle}" />`;
      case 'video':
        const videoStyle = generateImageStyles(comp);
        const videoFullStyle = animStyle ? `${videoStyle} ${animStyle}` : videoStyle;
        return `<video controls ${animClass ? `class="${animClass}"` : ''} style="${videoFullStyle}"><source src="${comp.src || ''}" /></video>`;
      case 'divider':
        const dividerStyle = generateStyles(comp);
        const dividerFullStyle = animStyle ? `${dividerStyle} ${animStyle}` : dividerStyle;
        return `<hr ${animClass ? `class="${animClass}"` : ''} style="${dividerFullStyle}" />`;
      case 'container':
        const containerStyle = generateStyles(comp);
        const containerFullStyle = animStyle ? `${containerStyle} ${animStyle}` : containerStyle;
        return `<div ${animClass ? `class="${animClass}"` : ''} style="${containerFullStyle}"></div>`;
      default:
        const defaultStyle = generateStyles(comp);
        const defaultFullStyle = animStyle ? `${defaultStyle} ${animStyle}` : defaultStyle;
        return `<div ${animClass ? `class="${animClass}"` : ''} style="${defaultFullStyle}">${comp.content || ''}</div>`;
    }
  };

  // Generate navigation HTML
  const generateNav = (currentPageSlug: string): string => {
    const navLinks = pages.map(page => 
      `<a href="${page.slug}.html"${page.slug === currentPageSlug ? ' class="active"' : ''}>${page.name}</a>`
    ).join('\n      ');
    
    return `
  <nav>
    ${navLinks}
  </nav>`;
  };

  // Generate individual page HTML
  const generatePageHTML = (page: Page): string => {
    const componentsHTML = page.components
      .filter(c => c.visible !== false)
      .map(comp => generateComponent(comp))
      .join('\n    ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.name} - My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <section class="page-section" style="width: 100%; min-height: ${page.canvasHeight}px; position: relative; margin: 0; padding: 0;">
    ${componentsHTML}
  </section>

  <script src="script.js"></script>
</body>
</html>`;
  };

  // Add CSS file
  zip.file('styles.css', BASE_CSS + '\n' + ANIMATION_CSS);

  // Add JavaScript file
  zip.file('script.js', NAVIGATION_JS);

  // Add each page as separate HTML file
  pages.forEach((page, index) => {
    const filename = index === 0 ? 'index.html' : `${page.slug}.html`;
    zip.file(filename, generatePageHTML(page));
  });

  // Add README
  const readme = `# Website Export

This package contains your exported website.

## Files:
- index.html - Homepage (first page)
${pages.slice(1).map(p => `- ${p.slug}.html - ${p.name} page`).join('\n')}
- styles.css - All styles and animations
- script.js - Navigation and interactions

## How to use:
1. Extract this ZIP file to a folder
2. Open index.html in your web browser
3. Upload all files to your web hosting service

## Hosting:
You can host this website on:
- Netlify (drag & drop the folder)
- Vercel
- GitHub Pages
- Any static hosting service

Generated by WebBuilder
`;
  
  zip.file('README.txt', readme);

  // Generate and download ZIP
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'website-export.zip');
}

export function generateReactExport(pages: Page[], canvasWidth: number): string {
  const generateStyles = (comp: ComponentData): string => {
    const styles = comp.styles;
    const styleObj: any = {
      width: `${styles.width}px`,
      height: `${styles.height}px`,
      position: 'absolute',
      left: `${styles.x}px`,
      top: `${styles.y}px`,
    };

    if (styles.backgroundColor) styleObj.backgroundColor = styles.backgroundColor;
    if (styles.textColor) styleObj.color = styles.textColor;
    if (styles.fontSize) styleObj.fontSize = `${styles.fontSize}px`;
    if (styles.fontWeight) styleObj.fontWeight = styles.fontWeight;
    if (styles.borderRadius) styleObj.borderRadius = `${styles.borderRadius}px`;
    if (styles.opacity !== undefined) styleObj.opacity = styles.opacity;
    if (styles.padding) styleObj.padding = `${styles.padding}px`;
    if (styles.textAlign) styleObj.textAlign = styles.textAlign;
    if (styles.rotation) styleObj.transform = `rotate(${styles.rotation}deg)`;
    if (styles.zIndex) styleObj.zIndex = styles.zIndex;

    // Add animation styles
    if (comp.animation) {
      styleObj.animation = `${comp.animation.type} ${comp.animation.duration}s ease ${comp.animation.delay}s ${comp.animation.infinite ? 'infinite' : 'forwards'}`;
    }

    return JSON.stringify(styleObj, null, 2);
  };

  const findPageByCompId = (pageId: string): Page | undefined => {
    return pages.find(p => p.id === pageId);
  };

  const generateComponent = (comp: ComponentData, index: number): string => {
    const style = generateStyles(comp);
    const key = `comp-${index}`;
    
    // Handle page links
    const linkedPage = comp.linkToPageId ? findPageByCompId(comp.linkToPageId) : null;
    const onClickHandler = linkedPage 
      ? ` onClick={() => document.getElementById('${linkedPage.slug}')?.scrollIntoView({behavior: 'smooth'})}` 
      : '';
    
    switch (comp.type) {
      case 'text':
        return `<div key="${key}" style={${style}}>${comp.content || ''}</div>`;
      case 'button':
        return `<button key="${key}"${onClickHandler} style={${style}}>${comp.content || 'Button'}</button>`;
      case 'image':
        return `<img key="${key}" src="${comp.src || ''}" alt="${comp.name}" style={${style}} />`;
      default:
        return `<div key="${key}" style={${style}}>${comp.content || ''}</div>`;
    }
  };

  const generatePageComponent = (page: Page, index: number): string => {
    const componentsJSX = page.components
      .filter(c => c.visible !== false)
      .map((comp, i) => `      ${generateComponent(comp, i)}`)
      .join('\n');

    return `
function ${page.name.replace(/\s+/g, '')}Page() {
  return (
    <section id="${page.slug}" style={{ position: 'relative', width: '100%', minHeight: '${page.canvasHeight}px' }}>
${componentsJSX}
    </section>
  );
}`;
  };

  const pageComponents = pages.map((page, index) => generatePageComponent(page, index)).join('\n\n');
  const pageNames = pages.map(p => `<${p.name.replace(/\s+/g, '')}Page />`).join('\n      ');

  return `
import React from 'react';
import './animations.css'; // Import animation styles

${pageComponents}

export default function App() {
  return (
    <div className="app">
      ${pageNames}
    </div>
  );
}

/* 
  Create animations.css file with the following content:
  
  ${ANIMATION_CSS}
*/
  `.trim();
}
