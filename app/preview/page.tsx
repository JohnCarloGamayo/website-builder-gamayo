'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit3, ArrowLeft, RefreshCw } from 'lucide-react';
import { ComponentData, Page } from '@/store/editorStore';

export default function PreviewPage() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [activePageId, setActivePageId] = useState<string>('home');
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(1440);
  const [currentCanvasHeight, setCurrentCanvasHeight] = useState(1200);

  const loadDesign = () => {
    setLoading(true);
    // Load saved design from localStorage (zustand persist)
    const saved = localStorage.getItem('website-builder');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        // Handle new multi-page format
        if (data.state?.pages && data.state.pages.length > 0) {
             setPages(data.state.pages);
             // Default to home or first page if not set
             const initialPageId = activePageId === 'home' ? (data.state.currentPageId || data.state.pages[0].id) : activePageId;
             
             const page = data.state.pages.find((p: Page) => p.id === initialPageId) || data.state.pages[0];
             
             setComponents(page.components);
             setActivePageId(page.id);
             setCurrentCanvasHeight(page.canvasHeight || 1200);
        } 
        // Handle legacy single-page format
        else if (data.state?.components) {
          setComponents(data.state.components);
          setCurrentCanvasHeight(data.state.canvasHeight || 1200);
        }

        if (data.state?.canvasWidth) {
           setCanvasWidth(data.state.canvasWidth);
        }
      } catch (e) {
        console.error('Failed to load design:', e);
      }
    }
    setLoading(false);
    setKey(prev => prev + 1);
  };

  const navigateToPage = (pageId: string) => {
      const page = pages.find(p => p.id === pageId);
      if (page) {
          setLoading(true); // temporary flicker to simulate load
          setTimeout(() => {
            setComponents(page.components);
            setActivePageId(page.id);
            setCurrentCanvasHeight(page.canvasHeight || 1200);
            setLoading(false);
            window.scrollTo(0,0);
          }, 100);
      }
  };

  useEffect(() => {
    loadDesign();
  }, []);

  const renderComponent = (comp: ComponentData, index: number) => {
    if (!comp.visible) return null;

    // Remove automated full-width logic to ensure WYSIWYG precision
    // The editor uses absolute positioning, so the preview must respect it exactly.
    
    // Match the Z-Index logic from EditorCanvas (Higher index = Front)
    const calculatedZIndex = index + (comp.styles.zIndex || 0);

    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: comp.styles.x,
      top: comp.styles.y,
      width: comp.styles.width,
      height: comp.styles.height,
      backgroundColor: comp.styles.backgroundColor,
      color: comp.styles.textColor,
      fontSize: comp.styles.fontSize,
      fontWeight: comp.styles.fontWeight,
      fontFamily: comp.styles.fontFamily,
      fontStyle: comp.styles.fontStyle,
      textDecoration: comp.styles.textDecoration,
      borderRadius: comp.styles.borderRadius,
      opacity: comp.styles.opacity,
      textAlign: comp.styles.textAlign,
      lineHeight: comp.styles.lineHeight,
      padding: comp.styles.padding,
      zIndex: calculatedZIndex,
      borderStyle: comp.styles.borderStyle || 'solid',
      borderWidth: comp.styles.borderWidth || 0,
      borderColor: comp.styles.borderColor || 'transparent',
      boxShadow: comp.styles.boxShadow,
      transform: `rotate(${comp.styles.rotation || 0}deg)`,
      // Remove display flex from base container to match EditorCanvas structure
      // display: 'flex', 
      // alignItems: ...
      // justifyContent: ... 
      overflow: 'hidden',
      boxSizing: 'border-box',
    };
    
    // Flex wrapper for text/buttons to respect padding and alignment
    const wrapperStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: comp.type === 'button' ? 'center' : 'flex-start',
        justifyContent: comp.type === 'button' ? 'center' : comp.styles.textAlign === 'center' ? 'center' : comp.styles.textAlign === 'right' ? 'flex-end' : 'flex-start',
    };

    // Add hover effects for buttons
    const isButton = comp.type === 'button';
    const buttonClass = isButton ? 'cursor-pointer hover:opacity-90 transition-opacity' : '';

    // Handle Link Click
    const handleClick = () => {
        if (comp.linkToPageId) {
            navigateToPage(comp.linkToPageId);
        }
    };
    
    // Animation Styles
    const animationClass = comp.animation?.type ? `animate-${comp.animation.type}` : '';
    const animationStyle: React.CSSProperties = comp.animation?.type ? {
        animationDuration: `${comp.animation.duration || 1}s`,
        animationDelay: `${comp.animation.delay || 0}s`,
        animationIterationCount: comp.animation.infinite ? 'infinite' : 1,
        animationFillMode: 'both',
    } : {};
    
    // Combined Style
    const finalStyle = { ...baseStyle, ...animationStyle };
    const finalClass = `${buttonClass} ${animationClass}`;

    // Helper to find children
    const children = components.filter(c => c.parentId === comp.id);
    
    if (comp.type === 'container') {
         // Render container with children
         return (
             <div key={comp.id} style={finalStyle} className={finalClass} onClick={handleClick}>
                 {children.map((child) => {
                     // Find original index for Z-index calculation
                     const childIndex = components.findIndex(c => c.id === child.id);
                     return renderComponent(child, childIndex);
                 })}
             </div>
         );
    }

    if (comp.type === 'image' && comp.src) {
      return (
        <div key={comp.id} style={finalStyle} className={finalClass}>
          <img 
            src={comp.src} 
            alt={comp.name} 
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    
    if (comp.type === 'video') {
         return (
            <div key={comp.id} style={finalStyle} className={finalClass}>
                 <div className="w-full h-full bg-black flex items-center justify-center text-white"><span className="text-3xl">▶</span></div>
            </div>
         );
    }
    
    if (comp.type === 'input') {
         return (
             <div key={comp.id} style={finalStyle} className={finalClass}>
                <input type="text" placeholder={comp.placeholder || 'Input'} className="w-full h-full bg-transparent border-none outline-none" />
             </div>
         );
    }
    
    if (comp.type === 'divider') {
        return <div key={comp.id} style={finalStyle} className={finalClass} />;
    }

    return (
      <div 
        key={comp.id} 
        style={finalStyle} 
        className={finalClass}
        onClick={isButton ? handleClick : undefined}
      >
        <div style={wrapperStyle}>
             {comp.content}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <RefreshCw className="animate-spin" size={20} />
          Loading preview...
        </div>
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">No Saved Design Found</h2>
          <p className="text-gray-400">Create and save a design in the editor first</p>
        </div>
        <Link
          href="/editor"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-colors font-medium"
        >
          <Edit3 size={18} />
          Open Editor
        </Link>
      </div>
    );
  }

  // Calculate the actual height needed based on components, OR use the page's set canvas height
  // Prioritize the explicit canvas height setting for the page
  const maxY = Math.max(...components.map(c => c.styles.y + c.styles.height), currentCanvasHeight);

  return (
    <div className="min-h-screen bg-black" key={key}>
      {/* Floating Controls */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <Link
          href="/editor"
          className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur border border-gray-700 hover:border-purple-500 text-white rounded-lg transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to Editor
        </Link>
        <button
          onClick={loadDesign}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur border border-gray-700 hover:border-purple-500 text-white rounded-lg transition-colors text-sm"
          title="Refresh Preview"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <div className="px-4 py-2 bg-green-600/20 border border-green-500/50 text-green-400 rounded-full text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Preview Mode
        </div>
      </div>

      {/* Canvas - Render saved components */}
      <div 
        className="relative mx-auto bg-white"
        style={{ 
          width: canvasWidth, 
          minHeight: maxY + 100,
        }}
      >
        {components.filter(c => !c.parentId).map((comp, index) => renderComponent(comp, index))}
      </div>
    </div>
  );
}
