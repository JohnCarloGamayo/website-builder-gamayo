import { ComponentData, Page } from '@/store/editorStore';

export function generateHTMLExport(pages: Page[], canvasWidth: number): string {
  const generateStyles = (comp: ComponentData): string => {
    const styles = comp.styles;
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
      ${styles.borderWidth ? `border: ${styles.borderWidth}px ${styles.borderStyle || 'solid'} ${styles.borderColor || '#000'};` : ''}
      ${styles.boxShadow ? `box-shadow: ${styles.boxShadow};` : ''}
      ${styles.rotation ? `transform: rotate(${styles.rotation}deg);` : ''}
      z-index: ${styles.zIndex || 0};
    `.trim();
  };

  const generateComponent = (comp: ComponentData): string => {
    const style = generateStyles(comp);
    
    switch (comp.type) {
      case 'text':
        return `<div class="text-component" style="${style}">${comp.content || ''}</div>`;
      case 'button':
        return `<button class="button-component" style="${style}">${comp.content || 'Button'}</button>`;
      case 'image':
        return `<img src="${comp.src || ''}" alt="${comp.name}" class="image-component" style="${style}" />`;
      case 'input':
        return `<input type="text" placeholder="${comp.placeholder || ''}" class="input-component" style="${style}" />`;
      case 'video':
        return `<video controls class="video-component" style="${style}"><source src="${comp.src || ''}" /></video>`;
      case 'divider':
        return `<hr class="divider-component" style="${style}" />`;
      case 'container':
        return `<div class="container-component" style="${style}"></div>`;
      default:
        return `<div style="${style}">${comp.content || ''}</div>`;
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
      background: #f5f5f5;
    }
    
    .page-section {
      background: white;
      margin: 0 auto;
      max-width: ${canvasWidth}px;
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
  </style>
</head>
<body>
${allPagesHTML}
</body>
</html>
  `.trim();
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

    return JSON.stringify(styleObj, null, 2);
  };

  const generateComponent = (comp: ComponentData, index: number): string => {
    const style = generateStyles(comp);
    const key = `comp-${index}`;
    
    switch (comp.type) {
      case 'text':
        return `<div key="${key}" style={${style}}>${comp.content || ''}</div>`;
      case 'button':
        return `<button key="${key}" style={${style}}>${comp.content || 'Button'}</button>`;
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

${pageComponents}

export default function App() {
  return (
    <div className="app">
      ${pageNames}
    </div>
  );
}
  `.trim();
}
