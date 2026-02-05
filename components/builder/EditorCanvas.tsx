'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useEditorStore, ComponentData } from '@/store/editorStore';
import { Rnd } from 'react-rnd';
import ContextMenu from './ContextMenu';
import * as LucideIcons from 'lucide-react';

export default function EditorCanvas() {
  const { 
    components, selectedId, selectedIds, hoveredId, zoom, showGrid, snapToGrid, canvasWidth, canvasHeight,
    selectComponent, hoverComponent, moveComponent, resizeComponent, saveHistory, setCanvasSize,
    groupSelected, ungroupSelected, duplicateComponent, removeComponent, selectAllComponents, setZoom,
    baseCanvasWidth, previewMode
  } = useEditorStore();
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const [handle, setHandle] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; componentId: string | null } | null>(null);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Ignore if user is typing in an input
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

        const isCtrl = e.ctrlKey || e.metaKey;
        const isShift = e.shiftKey;

        // Grouping: Ctrl + G
        if (isCtrl && e.key === 'g') {
            e.preventDefault();
            if (isShift) {
                ungroupSelected();
            } else {
                groupSelected();
            }
        }

        // Duplicate: Ctrl + D
        if (isCtrl && e.key === 'd') {
            e.preventDefault();
            if (selectedId) duplicateComponent(selectedId);
        }

        // Select All: Ctrl + A
        if (isCtrl && e.key === 'a') {
            e.preventDefault();
            selectAllComponents();
        }

        // Deselect: Esc
        if (e.key === 'Escape') {
            e.preventDefault();
            selectComponent(null);
        }

        // Zoom: + or - keys
        if (e.key === '=' || e.key === '+') {
            e.preventDefault();
            setZoom(Math.min(200, zoom + 10));
        }
        if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            setZoom(Math.max(25, zoom - 10));
        }

        // Delete: Delete or Backspace
        if (e.key === 'Delete' || e.key === 'Backspace') {
            // Prevent Backspace from navigating back if not in input
            // But be careful with Backspace on some browsers.
            if (selectedId) {
                e.preventDefault();
                // Handle multi-deletion if supported, otherwise single
                if (selectedIds && selectedIds.length > 0) {
                     selectedIds.forEach(id => removeComponent(id));
                } else if (selectedId) {
                     removeComponent(selectedId);
                }
            }
        }

        // Undo/Redo: Ctrl + Z / Ctrl + Y (or Ctrl + Shift + Z)
        if (isCtrl && e.key === 'z') {
            e.preventDefault();
             // Assuming undo is available in store and destructured
             const state = useEditorStore.getState();
             state.undo();
        }
        if ((isCtrl && e.key === 'y') || (isCtrl && isShift && e.key === 'z')) {
            e.preventDefault();
            const state = useEditorStore.getState();
            state.redo();
        }

        // Arrow Keys Nudging
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            const step = isShift ? 10 : 1;
            
            const targets = selectedIds && selectedIds.length > 0 ? selectedIds : (selectedId ? [selectedId] : []);
            
            if (targets.length > 0) {
                targets.forEach(id => {
                    const comp = components.find(c => c.id === id);
                    if (comp && !comp.locked) {
                        let newX = comp.styles.x;
                        let newY = comp.styles.y;

                        switch (e.key) {
                            case 'ArrowLeft': newX -= step; break;
                            case 'ArrowRight': newX += step; break;
                            case 'ArrowUp': newY -= step; break;
                            case 'ArrowDown': newY += step; break;
                        }
                        moveComponent(id, newX, newY);
                    }
                });
                // Debounce history saving? Or save on keyUp?
                // For simplicity, we might not save history on every pixel move to avoid spamming.
                // But we should save eventually. 
                // Let's assume user accepts history spam for now or we add a cleanup.
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [groupSelected, ungroupSelected, selectedId, selectedIds, components, duplicateComponent, moveComponent, removeComponent, selectAllComponents, selectComponent, zoom, setZoom]);

  // Mouse wheel zoom: Ctrl + Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        setZoom(Math.max(25, Math.min(200, zoom + delta)));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [zoom, setZoom]);

  // Snap to grid helper
  const snapToGridValue = (value: number, gridSize = 10) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  };

  // Responsive scaling factor
  const scaleFactor = canvasWidth / (baseCanvasWidth || 1440);
  
  // Apply scale to component dimensions for responsive preview
  const getScaledValue = (value: number) => {
    if (previewMode === 'desktop') return value;
    return Math.round(value * scaleFactor);
  };

  // Scale height proportionally (maintains aspect ratio better)
  const getScaledHeight = (value: number) => {
    if (previewMode === 'desktop') return value;
    // Scale height but with a minimum to prevent components from becoming too small
    return Math.max(Math.round(value * scaleFactor), Math.round(value * 0.5));
  };

  // Scale font size for responsive
  const getScaledFontSize = (value: number | undefined) => {
    if (!value) return value;
    if (previewMode === 'desktop') return value;
    return Math.max(Math.round(value * scaleFactor), Math.round(value * 0.6));
  };

  const startResizeCanvas = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startY = e.clientY;
    const startHeight = canvasHeight;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = (moveEvent.clientY - startY) * (100 / zoom); // Fix for zoom scaling
      const newHeight = Math.max(600, Math.round(startHeight + deltaY));
      setCanvasSize(canvasWidth, newHeight);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectComponent(null);
    }
  };

  const renderComponent = (comp: ComponentData, index: number, isDirectChild: boolean = true) => {
    if (!comp.visible) return null;

    const isSelected = selectedId === comp.id || (selectedIds && selectedIds.includes(comp.id));
    const isHovered = hoveredId === comp.id;

    // Use components array order for zIndex (Higher index = Front)
    const calculatedZIndex = index + (comp.styles.zIndex || 0);

    // Scale font size and other values for responsive preview
    const scaledFontSize = getScaledFontSize(comp.styles.fontSize);
    const scaledPadding = comp.styles.padding ? getScaledValue(comp.styles.padding) : undefined;
    const scaledBorderRadius = comp.styles.borderRadius ? Math.max(getScaledValue(comp.styles.borderRadius), 2) : undefined;

    // Base Styles
    const style: React.CSSProperties = {
      width: '100%',
      height: '100%',
      backgroundColor: comp.styles.backgroundColor,
      color: comp.styles.textColor,
      fontSize: scaledFontSize,
      fontWeight: comp.styles.fontWeight,
      fontFamily: comp.styles.fontFamily,
      fontStyle: comp.styles.fontStyle,
      textDecoration: comp.styles.textDecoration,
      borderRadius: scaledBorderRadius,
      opacity: comp.styles.opacity,
      textAlign: comp.styles.textAlign,
      lineHeight: comp.styles.lineHeight,
      padding: scaledPadding,
      borderStyle: comp.styles.borderWidth ? (comp.styles.borderStyle || 'solid') : 'none',
      borderWidth: comp.styles.borderWidth || 0,
      borderColor: comp.styles.borderColor || 'transparent',
      boxShadow: comp.styles.boxShadow,
      overflow: 'hidden',
      cursor: comp.locked ? 'not-allowed' : 'move',
      userSelect: 'none',
      transform: `rotate(${comp.styles.rotation || 0}deg)`,
      pointerEvents: 'auto',
      clipPath: comp.styles.clipPath || undefined,
    };
    
    // Flex Styles for content alignment
    const wrapperStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: comp.type === 'button' ? 'center' : 'flex-start',
        justifyContent: comp.type === 'button' ? 'center' : comp.styles.textAlign === 'center' ? 'center' : comp.styles.textAlign === 'right' ? 'flex-end' : 'flex-start',
    };

    // Find Children (if it's a group/container)
    const children = components.filter(c => c.parentId === comp.id);
    const isGroup = children.length > 0;

    let content = null;
    
    switch (comp.type) {
        case 'image':
            content = comp.src ? <img src={comp.src} alt={comp.name} className="w-full h-full object-cover select-none pointer-events-none" draggable={false} /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Image</div>;
            break;
        case 'icon':
            (() => {
              const IconComponent = comp.iconName && (LucideIcons as any)[comp.iconName];
              if (IconComponent) {
                content = (
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent 
                      size={Math.min(comp.styles.width, comp.styles.height) * 0.6} 
                      strokeWidth={2}
                      style={{ color: comp.styles.textColor || comp.styles.backgroundColor || '#6366f1' }}
                    />
                  </div>
                );
              } else {
                content = <div className="w-full h-full flex items-center justify-center text-4xl">🔷</div>;
              }
            })();
            break;
        case 'video':
            content = <div className="w-full h-full bg-black flex items-center justify-center text-white"><span className="text-3xl">▶</span></div>;
            break;
        case 'input':
            content = <input type="text" placeholder={comp.placeholder || 'Input'} className="w-full h-full bg-transparent border-none outline-none" disabled />;
            break;
        case 'divider':
            // Logic handled in return
            break; 
        case 'button':
            if (comp.content) {
                // Determine layout for button
                style.display = 'flex';
                style.alignItems = 'center';
                style.justifyContent = 'center';
            }
            content = comp.content;
            break;
        case 'container':
             // Render children inside
             if (isGroup) {
                 content = (
                    <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                        {children.map((child) => {
                            return (
                                <div 
                                    key={child.id}
                                    style={{
                                        position: 'absolute',
                                        left: child.styles.x,
                                        top: child.styles.y,
                                        width: child.styles.width,
                                        height: child.styles.height,
                                        zIndex: child.styles.zIndex || 0,
                                        pointerEvents: 'auto',
                                    }}
                                >
                                   {renderComponentContent(child)} 
                                </div>
                            );
                        })}
                    </div>
                 );
             }
             break;
        default:
             content = comp.content;
             break;
    }

    if (comp.type === 'divider') {
         return (
             <Rnd
                key={comp.id}
                position={{ x: getScaledValue(comp.styles.x), y: comp.styles.y }}
                size={{ width: getScaledValue(comp.styles.width), height: getScaledHeight(comp.styles.height) }}
                scale={zoom / 100}
                onMouseDown={(e) => { 
                  e.stopPropagation();
                  if (e.ctrlKey || e.metaKey) {
                       selectComponent(comp.id, true);
                  } else if (selectedId !== comp.id && !selectedIds?.includes(comp.id)) {
                      selectComponent(comp.id); 
                  }
                }}
                onDrag={(e, d) => { 
                  const baseX = previewMode === 'desktop' ? d.x : Math.round(d.x / scaleFactor);
                  moveComponent(comp.id, baseX, d.y); 
                }}
                onDragStop={(e, d) => { 
                  const baseX = previewMode === 'desktop' ? d.x : Math.round(d.x / scaleFactor);
                  moveComponent(comp.id, baseX, d.y); 
                  saveHistory(); 
                }}
                onResize={(e, direction, ref, delta, position) => { 
                  const baseWidth = previewMode === 'desktop' ? parseInt(ref.style.width) : Math.round(parseInt(ref.style.width) / scaleFactor);
                  const baseX = previewMode === 'desktop' ? position.x : Math.round(position.x / scaleFactor);
                  resizeComponent(comp.id, baseWidth, parseInt(ref.style.height)); 
                  moveComponent(comp.id, baseX, position.y); 
                }}
                onResizeStop={(e, direction, ref, delta, position) => { 
                  const baseWidth = previewMode === 'desktop' ? parseInt(ref.style.width) : Math.round(parseInt(ref.style.width) / scaleFactor);
                  const baseX = previewMode === 'desktop' ? position.x : Math.round(position.x / scaleFactor);
                  resizeComponent(comp.id, baseWidth, parseInt(ref.style.height)); 
                  moveComponent(comp.id, baseX, position.y); 
                  saveHistory(); 
                }}
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); }}
                onMouseEnter={() => hoverComponent(comp.id)}
                onMouseLeave={() => hoverComponent(null)}
                disableDragging={comp.locked}
                enableResizing={!comp.locked}
                bounds="parent"
                style={{ zIndex: calculatedZIndex, transform: `rotate(${comp.styles.rotation || 0}deg)` }}
                className={`${isSelected ? 'ring-2 ring-purple-500' : ''} ${isHovered && !isSelected ? 'ring-1 ring-blue-400' : ''}`}
             >
                <div style={{ width: '100%', height: '100%', backgroundColor: comp.styles.backgroundColor }} />
             </Rnd>
        );
    }

    return (
      <Rnd
        key={comp.id}
        position={{ x: getScaledValue(comp.styles.x), y: comp.styles.y }}
        size={{ width: getScaledValue(comp.styles.width), height: getScaledHeight(comp.styles.height) }}
        scale={zoom / 100}
        onMouseDown={(e) => { 
          // Select only if not already selected to minimize re-renders during interaction start
          e.stopPropagation();
          if (e.ctrlKey || e.metaKey) {
             selectComponent(comp.id, true);
          } else if (selectedId !== comp.id && !selectedIds?.includes(comp.id)) {
            selectComponent(comp.id);
          }
        }}
        onDrag={(e, d) => {
          // Convert back to base canvas coordinates when dragging
          const baseX = previewMode === 'desktop' ? d.x : Math.round(d.x / scaleFactor);
          const snappedX = snapToGridValue(baseX);
          const snappedY = snapToGridValue(d.y);
          moveComponent(comp.id, snappedX, snappedY);
        }}
        onDragStop={(e, d) => {
          const baseX = previewMode === 'desktop' ? d.x : Math.round(d.x / scaleFactor);
          const snappedX = snapToGridValue(baseX);
          const snappedY = snapToGridValue(d.y);
          moveComponent(comp.id, snappedX, snappedY);
          saveHistory();
        }}
        onResize={(e, direction, ref, delta, position) => {
          const baseWidth = previewMode === 'desktop' ? parseInt(ref.style.width) : Math.round(parseInt(ref.style.width) / scaleFactor);
          const baseX = previewMode === 'desktop' ? position.x : Math.round(position.x / scaleFactor);
          resizeComponent(comp.id, baseWidth, parseInt(ref.style.height));
          moveComponent(comp.id, baseX, position.y);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          const baseWidth = previewMode === 'desktop' ? parseInt(ref.style.width) : Math.round(parseInt(ref.style.width) / scaleFactor);
          const baseX = previewMode === 'desktop' ? position.x : Math.round(position.x / scaleFactor);
          resizeComponent(comp.id, baseWidth, parseInt(ref.style.height));
          moveComponent(comp.id, baseX, position.y);
          saveHistory();
        }}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
        onContextMenu={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          selectComponent(comp.id);
          setContextMenu({ x: e.clientX, y: e.clientY, componentId: comp.id });
        }}
        onMouseEnter={() => hoverComponent(comp.id)}
        onMouseLeave={() => hoverComponent(null)}
        disableDragging={comp.locked}
        enableResizing={!comp.locked}
        bounds="parent"
        style={{ zIndex: calculatedZIndex }}
        className={`
          ${isSelected ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0d0d1a]' : ''}
          ${isHovered && !isSelected ? 'ring-1 ring-blue-400' : ''}
        `}
        resizeHandleStyles={isSelected ? {
          bottomRight: { width: 10, height: 10, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: '50%', right: -6, bottom: -6 },
          bottomLeft: { width: 10, height: 10, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: '50%', left: -6, bottom: -6 },
          topRight: { width: 10, height: 10, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: '50%', right: -6, top: -6 },
          topLeft: { width: 10, height: 10, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: '50%', left: -6, top: -6 },
          top: { width: 10, height: 4, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: 2, top: -2, left: '50%', marginLeft: -5 },
          bottom: { width: 10, height: 4, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: 2, bottom: -2, left: '50%', marginLeft: -5 },
          left: { width: 4, height: 10, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: 2, left: -2, top: '50%', marginTop: -5 },
          right: { width: 4, height: 10, backgroundColor: '#ffffff', border: '1px solid #9333ea', borderRadius: 2, right: -2, top: '50%', marginTop: -5 },
        } : undefined}
      >
        <div style={style}>
            {comp.type === 'text' || comp.type === 'button' ? (
                <div style={wrapperStyle}>
                    {content}
                </div>
            ) : content}
        </div>
      </Rnd>
    );
  };
  
  // Helper to render content of children without Rnd wrapper
  const renderComponentContent = (comp: ComponentData) => {
      // Duplicate style logic partially or create a shared style generator?
      // For simplicity, inline standard styles.
      const style: React.CSSProperties = {
        width: '100%',
        height: '100%',
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
        letterSpacing: comp.styles.letterSpacing,
        padding: comp.styles.padding,
        borderStyle: comp.styles.borderStyle || 'solid',
        borderWidth: comp.styles.borderWidth,
        borderColor: comp.styles.borderColor || 'transparent',
        boxShadow: comp.styles.boxShadow,
        overflow: 'hidden',
        pointerEvents: 'none', // Static inside group
        clipPath: comp.styles.clipPath || undefined,
      };
      
      const wrapperStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: comp.type === 'button' ? 'center' : 'flex-start',
        justifyContent: comp.type === 'button' ? 'center' : comp.styles.textAlign === 'center' ? 'center' : comp.styles.textAlign === 'right' ? 'flex-end' : 'flex-start',
    };

      // Handle different component types
      switch (comp.type) {
        case 'image':
          return <img src={comp.src || 'https://via.placeholder.com/150'} alt={comp.alt || 'Image'} style={style} className="object-cover" />;
        
        case 'video':
          return <video src={comp.src} controls style={style} className="object-cover" />;
        
        case 'audio':
          return <audio src={comp.src} controls style={{...style, height: 'auto'}} />;
        
        case 'embed':
          return <div style={style} dangerouslySetInnerHTML={{ __html: comp.content || '' }} />;
        
        case 'icon':
          (() => {
            const IconComponent = comp.iconName && (LucideIcons as any)[comp.iconName];
            if (IconComponent) {
              return (
                <div style={style}>
                  <div style={{...wrapperStyle, alignItems: 'center', justifyContent: 'center'}}>
                    <IconComponent 
                      size={Math.min(comp.styles.width, comp.styles.height) * 0.6} 
                      strokeWidth={2}
                      style={{ color: comp.styles.textColor || comp.styles.backgroundColor || '#6366f1' }}
                    />
                  </div>
                </div>
              );
            }
          })();
          return <div style={style}><div style={{...wrapperStyle, alignItems: 'center', justifyContent: 'center'}}>🔷</div></div>;
        
        case 'text':
        case 'button':
          return <div style={style}><div style={wrapperStyle}>{comp.content}</div></div>;
        
        case 'heading':
          return <h1 style={style}><div style={wrapperStyle}>{comp.content || 'Heading'}</div></h1>;
        
        case 'paragraph':
          return <p style={style}>{comp.content || 'Paragraph text'}</p>;
        
        case 'link':
          return <a href={comp.href || '#'} style={{...style, textDecoration: comp.styles.textDecoration || 'underline', cursor: 'pointer'}}>{comp.content || 'Link'}</a>;
        
        case 'quote':
          return <blockquote style={{...style, borderLeft: `${comp.styles.borderWidth || 4}px ${comp.styles.borderStyle || 'solid'} ${comp.styles.borderColor || '#666'}`, paddingLeft: comp.styles.padding || 16, fontStyle: 'italic'}}>{comp.content || 'Quote'}</blockquote>;
        
        case 'container':
        case 'section':
        case 'card':
          return <div style={style}><div style={{...wrapperStyle, alignItems: 'center'}}>{comp.content || ''}</div></div>;
        
        case 'grid':
          return <div style={{...style, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: comp.styles.padding || 10}}><div style={{background: '#f0f0f0', borderRadius: 4, padding: 8}}>Grid Item</div><div style={{background: '#f0f0f0', borderRadius: 4, padding: 8}}>Grid Item</div><div style={{background: '#f0f0f0', borderRadius: 4, padding: 8}}>Grid Item</div></div>;
        
        case 'flex':
          return <div style={{...style, display: 'flex', gap: '10px', padding: comp.styles.padding || 10}}><div style={{background: '#f0f0f0', borderRadius: 4, padding: 8, flex: 1}}>Flex Item</div><div style={{background: '#f0f0f0', borderRadius: 4, padding: 8, flex: 1}}>Flex Item</div></div>;
        
        case 'input':
          return <input type="text" placeholder={comp.placeholder || 'Enter text'} value={comp.value || ''} style={{...style, border: `${comp.styles.borderWidth || 1}px ${comp.styles.borderStyle || 'solid'} ${comp.styles.borderColor || '#ccc'}`}} readOnly />;
        
        case 'textarea':
          return <textarea placeholder={comp.placeholder || 'Enter text'} value={comp.value || ''} style={{...style, border: `${comp.styles.borderWidth || 1}px ${comp.styles.borderStyle || 'solid'} ${comp.styles.borderColor || '#ccc'}`, resize: 'none'}} readOnly />;
        
        case 'checkbox':
          return <input type="checkbox" checked={comp.checked || false} style={{...style, width: 'auto', height: 'auto', cursor: 'pointer'}} readOnly />;
        
        case 'radio':
          return <input type="radio" checked={comp.checked || false} style={{...style, width: 'auto', height: 'auto', cursor: 'pointer'}} readOnly />;
        
        case 'select':
          return <select style={{...style, border: `${comp.styles.borderWidth || 1}px ${comp.styles.borderStyle || 'solid'} ${comp.styles.borderColor || '#ccc'}`}} disabled>{(comp.options || ['Option 1', 'Option 2']).map((opt, i) => <option key={i}>{opt}</option>)}</select>;
        
        case 'badge':
        case 'tag':
          return <span style={{...style, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap'}}>{comp.content || 'Badge'}</span>;
        
        case 'alert':
          return <div style={{...style, display: 'flex', alignItems: 'center', gap: '8px'}}><span>ℹ️</span><span>{comp.content || 'Alert message'}</span></div>;
        
        case 'tooltip':
          return <div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: comp.styles.fontSize || 12}}>{comp.content || 'Tooltip'}</div>;
        
        case 'avatar':
          return <div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: comp.styles.fontSize || 24}}>👤</div>;
        
        case 'rating':
          return <div style={{...style, display: 'flex', alignItems: 'center'}}>{comp.content || '★★★★☆'}</div>;
        
        case 'navbar':
          return <nav style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: comp.styles.padding || 16}}><div style={{fontWeight: 'bold'}}>Brand</div><div style={{display: 'flex', gap: '16px'}}><span>Home</span><span>About</span><span>Contact</span></div></nav>;
        
        case 'menu':
          return <ul style={{...style, listStyle: 'none', padding: comp.styles.padding || 8}}><li style={{padding: '8px', borderBottom: '1px solid #eee'}}>Menu Item 1</li><li style={{padding: '8px', borderBottom: '1px solid #eee'}}>Menu Item 2</li><li style={{padding: '8px'}}>Menu Item 3</li></ul>;
        
        case 'breadcrumb':
          return <div style={style}>{comp.content || 'Home / Products / Item'}</div>;
        
        case 'list':
          return <div style={{...style, whiteSpace: 'pre-wrap'}}>{comp.content || '• Item 1\n• Item 2\n• Item 3'}</div>;
        
        case 'table':
          return <table style={{...style, borderCollapse: 'collapse'}}><thead><tr><th style={{border: '1px solid #ddd', padding: '8px'}}>Header 1</th><th style={{border: '1px solid #ddd', padding: '8px'}}>Header 2</th></tr></thead><tbody><tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Data 1</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Data 2</td></tr></tbody></table>;
        
        case 'accordion':
          return <div style={{...style, cursor: 'pointer'}}><div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span>{comp.content || 'Accordion'}</span><span>▼</span></div></div>;
        
        case 'tabs':
          return <div style={style}><div style={{display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '8px'}}><div style={{padding: '8px 16px', borderBottom: '2px solid #3b82f6'}}>Tab 1</div><div style={{padding: '8px 16px'}}>Tab 2</div></div><div style={{padding: '16px'}}>Tab content</div></div>;
        
        case 'progress':
          return <div style={{...style, backgroundColor: '#e5e7eb', borderRadius: comp.styles.borderRadius || 10, overflow: 'hidden'}}><div style={{width: `${comp.value || 70}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 0.3s'}}></div></div>;
        
        case 'slider':
          return <input type="range" value={comp.value || 50} style={{...style, height: 'auto', cursor: 'pointer'}} readOnly />;
        
        case 'modal':
          return <div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}><div style={{backgroundColor: '#fff', padding: '24px', borderRadius: '8px', maxWidth: '400px'}}><h3 style={{margin: '0 0 16px 0'}}>Modal Title</h3><p>{comp.content || 'Modal content'}</p></div></div>;
        
        case 'divider':
          return <hr style={{...style, border: 'none', borderTop: `${comp.styles.height || 2}px ${comp.styles.borderStyle || 'solid'} ${comp.styles.backgroundColor || '#000'}`}} />;
        
        case 'shape':
          return <div style={style}></div>;
        
        // New Components
        case 'spacer':
          return <div style={{...style, backgroundColor: 'transparent'}} title="Spacer"></div>;
        
        case 'row':
        case 'column':
          return <div style={{...style, display: 'flex', flexDirection: comp.type === 'row' ? 'row' : 'column', gap: '10px', alignItems: 'flex-start'}}><div style={{flex: 1, background: '#f0f0f0', borderRadius: 4, padding: 8, minHeight: 40}}>Item 1</div><div style={{flex: 1, background: '#f0f0f0', borderRadius: 4, padding: 8, minHeight: 40}}>Item 2</div></div>;
        
        case 'sidebar':
          return <div style={{...style, background: comp.styles.backgroundColor || '#1f2937', color: comp.styles.textColor || '#ffffff', padding: comp.styles.padding || 16}}><div style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16}}>Sidebar</div><div style={{display: 'flex', flexDirection: 'column', gap: 8}}><div style={{padding: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4}}>Menu Item 1</div><div style={{padding: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4}}>Menu Item 2</div></div></div>;
        
        case 'switch':
          return <div style={{...style, position: 'relative', cursor: 'pointer', backgroundColor: comp.checked ? '#3b82f6' : '#d1d5db', transition: 'background 0.2s'}}><div style={{position: 'absolute', top: '2px', left: comp.checked ? 'calc(100% - 22px)' : '2px', width: '20px', height: '20px', background: '#ffffff', borderRadius: '50%', transition: 'left 0.2s'}}></div></div>;
        
        case 'chip':
          return <span style={{...style, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', whiteSpace: 'nowrap', cursor: 'pointer'}}>{comp.content || 'Chip'} <span style={{fontSize: '0.8em', opacity: 0.7}}>\u00d7</span></span>;
        
        case 'spinner':
          return <div style={{...style, border: `${comp.styles.borderWidth || 4}px solid ${comp.styles.borderColor || '#3b82f6'}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'}} />;
        
        case 'skeleton':
          return <div style={{...style, backgroundColor: comp.styles.backgroundColor || '#e5e7eb', borderRadius: comp.styles.borderRadius || 4, background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite'}} />;
        
        case 'pagination':
          return <div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}><button style={{padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#fff', cursor: 'pointer'}}>\u2190</button><button style={{padding: '8px 12px', border: '1px solid #3b82f6', borderRadius: '4px', background: '#3b82f6', color: '#fff', cursor: 'pointer'}}>1</button><button style={{padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#fff', cursor: 'pointer'}}>2</button><button style={{padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#fff', cursor: 'pointer'}}>\u2192</button></div>;
        
        case 'stepper':
          return <div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: comp.styles.padding || 16}}>{comp.content || 'Step 1 \u2192 Step 2 \u2192 Step 3'}</div>;
        
        case 'footer':
          return <div style={{...style, display: 'flex', flexDirection: 'column', gap: '16px', padding: comp.styles.padding || 20, backgroundColor: comp.styles.backgroundColor || '#1f2937', color: comp.styles.textColor || '#ffffff'}}><div style={{display: 'flex', justifyContent: 'space-between'}}><div><div style={{fontWeight: 'bold', marginBottom: '8px'}}>Company</div><div style={{fontSize: '0.9em', opacity: 0.8}}>About \u2022 Contact \u2022 Careers</div></div><div><div style={{fontWeight: 'bold', marginBottom: '8px'}}>Resources</div><div style={{fontSize: '0.9em', opacity: 0.8}}>Blog \u2022 Docs \u2022 Support</div></div></div><div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', fontSize: '0.85em', opacity: 0.7, textAlign: 'center'}}>\u00a9 2024 Company Name. All rights reserved.</div></div>;
        
        case 'timeline':
          return <div style={{...style, display: 'flex', flexDirection: 'column', gap: '16px', padding: comp.styles.padding || 16}}><div style={{display: 'flex', gap: '12px'}}><div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '4px'}}></div><div><div style={{fontWeight: 'bold'}}>{comp.content || '2024 - Event'}</div><div style={{fontSize: '0.9em', opacity: 0.7, marginTop: '4px'}}>Description of the event</div></div></div></div>;
        
        case 'stats':
          return <div style={{...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px'}}><div style={{fontSize: '2em', fontWeight: 'bold', color: '#3b82f6'}}>{comp.content || '1.2K'}</div><div style={{fontSize: '0.85em', opacity: 0.7, textAlign: 'center'}}>Total Users</div></div>;
        
        case 'metric':
          return <div style={{...style, display: 'flex', alignItems: 'center', gap: '8px', fontSize: comp.styles.fontSize || 32, fontWeight: comp.styles.fontWeight || 'bold', color: comp.styles.textColor || '#10b981'}}><span>\u2191</span>{comp.content || '+24%'}</div>;
        
        case 'pricing-card':
          return <div style={{...style, display: 'flex', flexDirection: 'column', gap: '16px', padding: comp.styles.padding || 24}}><div style={{fontSize: '1.2em', fontWeight: 'bold'}}>Pro Plan</div><div style={{fontSize: '2.5em', fontWeight: 'bold'}}>{comp.content || '$99'}<span style={{fontSize: '0.4em', fontWeight: 'normal', opacity: 0.7}}>/month</span></div><ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px'}}><li>\u2713 Feature 1</li><li>\u2713 Feature 2</li><li>\u2713 Feature 3</li></ul><button style={{padding: '12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Get Started</button></div>;
        
        case 'feature-card':
          return <div style={{...style, padding: comp.styles.padding || 20, display: 'flex', flexDirection: 'column', gap: '12px'}}><div style={{width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px'}}>\u2728</div><div style={{fontSize: '1.2em', fontWeight: 'bold'}}>{comp.content || 'Feature Title'}</div><div style={{fontSize: '0.9em', opacity: 0.7}}>Description of this amazing feature that helps users achieve their goals.</div></div>;
        
        case 'testimonial':
          return <div style={{...style, padding: comp.styles.padding || 20, display: 'flex', flexDirection: 'column', gap: '16px'}}><div style={{fontSize: '1.1em', fontStyle: 'italic'}}>{comp.content || '\"Amazing product!\"'}</div><div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#d1d5db'}}></div><div><div style={{fontWeight: 'bold'}}>John Doe</div><div style={{fontSize: '0.85em', opacity: 0.7}}>CEO, Company</div></div></div></div>;
        
        case 'cta-button':
          return <button style={{...style, backgroundColor: comp.styles.backgroundColor || '#6366f1', color: comp.styles.textColor || '#ffffff', border: 'none', borderRadius: comp.styles.borderRadius || 8, fontSize: comp.styles.fontSize || 18, fontWeight: comp.styles.fontWeight || 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.2s', padding: comp.styles.padding || 16}}>{comp.content || 'Get Started'}</button>;
        
        case 'gradient-box':
          return <div style={{...style, background: `linear-gradient(135deg, ${comp.styles.backgroundColor || '#a855f7'} 0%, ${comp.styles.textColor || '#6366f1'} 100%)`}}></div>;
        
        case 'glow-card':
          return <div style={{...style, position: 'relative', overflow: 'visible'}}><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #6366f1, #a855f7)', opacity: 0.5, filter: 'blur(20px)', borderRadius: comp.styles.borderRadius || 12}}></div><div style={{position: 'relative', width: '100%', height: '100%', backgroundColor: comp.styles.backgroundColor || '#1e293b', borderRadius: comp.styles.borderRadius || 12, border: '1px solid rgba(99,102,241,0.3)'}}></div></div>;
        
        case 'image-gallery':
          return <div style={{...style, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '16px'}}>{[1,2,3,4,5,6].map(i => <div key={i} style={{aspectRatio: '1', background: '#d1d5db', borderRadius: '4px'}}></div>)}</div>;
        
        case 'carousel':
          return <div style={{...style, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{position: 'absolute', left: '16px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>\u2190</div><div style={{backgroundColor: '#6366f1', width: '80%', height: '80%', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5em'}}>Slide 1</div><div style={{position: 'absolute', right: '16px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>\u2192</div></div>;
        
        case 'banner':
          return <div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: comp.styles.fontWeight || 'bold', fontSize: comp.styles.fontSize || 24}}>{comp.content || 'Special Offer!'}</div>;
        
        case 'announcement':
          return <div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: comp.styles.padding || 12}}><div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><span>\ud83d\udce2</span><span>{comp.content || 'New Update Available'}</span></div><button style={{background: 'rgba(255,255,255,0.2)', border: 'none', padding: '6px 12px', borderRadius: '4px', color: 'inherit', cursor: 'pointer', fontWeight: 'bold'}}>Learn More</button></div>;
        
        default:
          return <div style={style}>{comp.content || comp.type}</div>;
      }
  };

  // Check for components that overflow in responsive mode
  const overflowingComponents = components.filter(comp => {
    if (previewMode === 'desktop') return false;
    const componentRight = comp.styles.x + comp.styles.width;
    const viewportWidth = previewMode === 'mobile' ? 375 : 768;
    return componentRight > viewportWidth;
  });

  // Auto-fix overflowing components
  const fixOverflowingComponents = () => {
    const viewportWidth = previewMode === 'mobile' ? 375 : previewMode === 'tablet' ? 768 : 1440;
    
    overflowingComponents.forEach(comp => {
      const componentRight = comp.styles.x + comp.styles.width;
      if (componentRight > viewportWidth) {
        // Calculate new width to fit within viewport with 20px margin
        const maxWidth = viewportWidth - comp.styles.x - 20;
        if (maxWidth > 50) { // Ensure minimum usable width
          resizeComponent(comp.id, maxWidth, comp.styles.height);
        } else {
          // If component is too far right, move it and resize
          const newX = 20;
          const newWidth = viewportWidth - 40;
          moveComponent(comp.id, newX, comp.styles.y);
          resizeComponent(comp.id, newWidth, comp.styles.height);
        }
      }
    });
    
    saveHistory();
  };

  // Fix single component overflow
  const fixSingleComponent = (comp: ComponentData) => {
    const viewportWidth = previewMode === 'mobile' ? 375 : previewMode === 'tablet' ? 768 : 1440;
    const componentRight = comp.styles.x + comp.styles.width;
    
    if (componentRight > viewportWidth) {
      const maxWidth = viewportWidth - comp.styles.x - 20;
      if (maxWidth > 50) {
        resizeComponent(comp.id, maxWidth, comp.styles.height);
      } else {
        const newX = 20;
        const newWidth = viewportWidth - 40;
        moveComponent(comp.id, newX, comp.styles.y);
        resizeComponent(comp.id, newWidth, comp.styles.height);
      }
    }
    
    saveHistory();
  };

  // Device frame styles
  const getDeviceFrameStyles = () => {
    if (previewMode === 'mobile') {
      return {
        padding: '40px 12px 40px 12px',
        background: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)',
        borderRadius: '42px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(255,255,255,0.1)',
        position: 'relative' as const,
      };
    } else if (previewMode === 'tablet') {
      return {
        padding: '32px 20px 32px 20px',
        background: 'linear-gradient(135deg, #252525 0%, #333333 100%)',
        borderRadius: '32px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 0 0 2px rgba(255,255,255,0.08)',
        position: 'relative' as const,
      };
    }
    return {};
  };

  const deviceFrameStyles = getDeviceFrameStyles();
  const hasDeviceFrame = previewMode !== 'desktop';

  return (
    <div className="flex-1 bg-[#0d0d1a] overflow-auto relative custom-scrollbar">
      {/* Responsive Warning Banner */}
      {overflowingComponents.length > 0 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[100] animate-in slide-in-from-top duration-300">
          <div className="bg-amber-500/95 backdrop-blur-xl text-amber-950 px-6 py-3 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-4">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold text-sm">{overflowingComponents.length} component{overflowingComponents.length > 1 ? 's' : ''} exceed viewport width</span>
              <span className="text-xs opacity-80">Some elements may be cut off on {previewMode} devices</span>
            </div>
            <button
              onClick={fixOverflowingComponents}
              className="ml-4 bg-amber-950 hover:bg-amber-900 text-amber-100 px-4 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Fix All
            </button>
          </div>
        </div>
      )}

      {/* Device Info Display */}
      {previewMode !== 'desktop' && (
        <div className="absolute top-4 right-4 z-[100]">
          <div className="bg-gray-900/95 backdrop-blur-xl text-gray-100 px-4 py-2 rounded-xl shadow-xl border border-gray-700/50 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              previewMode === 'mobile' ? 'bg-blue-400' : 'bg-purple-400'
            } animate-pulse`} />
            <span className="text-xs font-medium uppercase tracking-wider">
              {previewMode === 'mobile' ? 'iPhone 13 Pro' : 'iPad Pro 11"'}
            </span>
            <span className="text-xs opacity-60">•</span>
            <span className="text-xs opacity-80">{canvasWidth}×{canvasHeight}px</span>
          </div>
        </div>
      )}

      {/* Canvas Container */}
      <div 
        className="min-h-full p-8 flex items-start justify-center overflow-auto"
        style={{ 
          backgroundImage: showGrid 
            ? 'radial-gradient(circle, #333 1px, transparent 1px)' 
            : 'none',
          backgroundSize: '20px 20px',
        }}
      >
        {/* Device Frame Wrapper */}
        {hasDeviceFrame ? (
          <div style={deviceFrameStyles}>
            {/* Device Notch/Camera (Mobile only) */}
            {previewMode === 'mobile' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-gray-800 rounded-full" />
              </div>
            )}
            
            {/* Device Home Indicator (Mobile only) */}
            {previewMode === 'mobile' && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
            )}

            {/* Actual Canvas */}
            <div
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="relative bg-white transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                minWidth: canvasWidth,
                width: canvasWidth,
                minHeight: canvasHeight,
                height: canvasHeight,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                borderRadius: previewMode === 'mobile' ? '4px' : '8px',
              }}
            >
              {/* Canvas content */}
              {renderCanvasContent()}
            </div>
          </div>
        ) : (
          /* Desktop Canvas */
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="relative bg-white shadow-2xl transition-all duration-200 ease-in-out"
            style={{
              minWidth: canvasWidth,
              width: canvasWidth,
              minHeight: canvasHeight,
              height: canvasHeight,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Canvas content */}
            {renderCanvasContent()}
          </div>
        )}
      </div>

      {/* Zoom indicator */}
      <div className="fixed bottom-6 left-6 bg-gray-900/90 backdrop-blur border border-gray-700 px-3 py-1.5 rounded-full text-gray-300 text-xs shadow-lg">
        {zoom}%
      </div>
    </div>
  );

  // Render canvas content function
  function renderCanvasContent() {
    return (
      <>
          {/* Viewport Width Guides */}
          <div className="absolute top-0 left-0 w-full h-8 border-b border-dashed border-gray-300 flex justify-between px-2 text-[10px] text-gray-400 select-none pointer-events-none z-50">
             <span>0px</span>
             <span>{canvasWidth}px</span>
          </div>
          
          {/* Canvas Height Resize Handle (Bottom) */}
          <div 
             className="absolute -bottom-4 left-0 w-full h-6 flex items-center justify-center cursor-ns-resize group z-50 hover:bg-purple-500/10 transition-colors rounded-b-lg"
             onMouseDown={startResizeCanvas}
             title="Drag to resize canvas height"
          >
             <div className="w-16 h-1 bg-gray-300 rounded-full group-hover:bg-purple-500 transition-colors shadow-sm" />
             <span className="absolute right-2 text-[10px] text-gray-400 group-hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
               {canvasHeight}px
             </span>
          </div>

        {/* Viewport Width Guides */}
        <div className="absolute top-0 left-0 w-full h-8 border-b border-dashed border-gray-300 flex justify-between px-2 text-[10px] text-gray-400 select-none pointer-events-none z-50">
          <span>0px</span>
          <span>{canvasWidth}px</span>
        </div>
        
        {/* Canvas Height Resize Handle (Bottom) */}
        <div 
          className="absolute -bottom-4 left-0 w-full h-6 flex items-center justify-center cursor-ns-resize group z-50 hover:bg-purple-500/10 transition-colors rounded-b-lg"
          onMouseDown={startResizeCanvas}
          title="Drag to resize canvas height"
        >
          <div className="w-16 h-1 bg-gray-300 rounded-full group-hover:bg-purple-500 transition-colors shadow-sm" />
          <span className="absolute right-2 text-[10px] text-gray-400 group-hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {canvasHeight}px
          </span>
        </div>

        {/* Render all components */}
        {components.map((comp, index) => {
          // Only render root components (items not in a group)
          // Children are rendered recursively by their parent container
          if (comp.parentId) return null;
          
          // Add overflow warning for this component
          const isOverflowing = previewMode !== 'desktop' && 
            (comp.styles.x + comp.styles.width) > canvasWidth;
          
          return (
            <React.Fragment key={comp.id}>
              {renderComponent(comp, index)}
              {isOverflowing && (
                <div
                  className="absolute pointer-events-none z-[60]"
                  style={{
                    left: getScaledValue(comp.styles.x),
                    top: comp.styles.y,
                    width: getScaledValue(comp.styles.width),
                    height: getScaledHeight(comp.styles.height),
                  }}
                >
                  <div className="absolute -top-8 right-0 bg-red-500 text-white text-[10px] px-2 py-1 rounded-md shadow-lg flex items-center gap-2 pointer-events-auto">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Overflow</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fixSingleComponent(comp);
                      }}
                      className="ml-1 bg-white text-red-500 px-2 py-0.5 rounded text-[9px] font-bold hover:bg-red-50 transition-colors"
                    >
                      Fix
                    </button>
                  </div>
                  <div className="absolute inset-0 border-2 border-red-500 border-dashed rounded-lg bg-red-500/5 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Empty state */}
        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 select-none">
            <div className="text-center">
              <p className="text-xl font-medium mb-2">Start Building</p>
              <p className="text-sm">Drag and drop elements from the left panel</p>
            </div>
          </div>
        )}
      </>
    );
  }
}
