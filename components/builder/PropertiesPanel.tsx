'use client';

import { useEditorStore, ComponentData } from '@/store/editorStore';
import { SketchPicker } from 'react-color';
import { useState, useRef } from 'react';
import { 
  Type, Palette, Move, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline, Image as ImageIcon, Lock, Eye, Box, File, Plus, Trash2, Globe, Sparkles
} from 'lucide-react';

// Reusable color picker component
const ColorInput = ({ label, color, onChange }: { label: string, color: string, onChange: (color: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-1">
      <span className="text-gray-500 text-xs">{label}</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-2 flex items-center gap-2 hover:border-gray-600 transition-colors"
        >
          <div 
            className="w-5 h-5 rounded border border-gray-600 shadow-sm"
            style={{ backgroundColor: color }}
          />
          <span className="text-gray-300 text-xs font-mono flex-1 text-left truncate">
            {color}
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-50 mt-2 right-0 shadow-xl rounded-lg overflow-hidden ring-1 ring-black ring-opacity-5">
            <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
            <SketchPicker
              color={color}
              onChange={(c) => onChange(c.hex)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable input component
const NumberInput = ({ label, value, onChange, min, max, unit = 'px' }: { label: string, value: number, onChange: (val: number) => void, min?: number, max?: number, unit?: string }) => (
  <div className="space-y-1">
    <span className="text-gray-500 text-xs">{label}</span>
    <div className="flex items-center bg-[#2a2a3e] border border-gray-700 rounded overflow-hidden hover:border-gray-500 transition-colors">
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        className="w-full bg-transparent p-2 text-white text-xs outline-none"
      />
      {unit && <span className="text-gray-500 text-xs pr-2 select-none">{unit}</span>}
    </div>
  </div>
);

export default function PropertiesPanel() {
  const { 
    components, selectedId, updateComponent, updateComponentStyles, 
    pages, currentPageId, addPage, switchPage, deletePage, updatePageName,
    canvasWidth, canvasHeight, setCanvasSize 
  } = useEditorStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');

  const selected = components.find((c) => c.id === selectedId);

  const handleAddPage = (e: React.FormEvent) => {
      e.preventDefault();
      if (newPageName.trim()) {
          addPage(newPageName);
          setNewPageName('');
          setIsAddingPage(false);
      }
  };

  if (!selected) {
    const currentPage = pages.find(p => p.id === currentPageId);

    return (
      <div className="w-80 bg-[#1a1a2e] border-l border-gray-800 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="p-4 border-b border-gray-800 bg-[#151525]">
          <h2 className="text-gray-200 font-semibold text-sm uppercase tracking-wider">Page Settings</h2>
        </div>
        
        <div className="p-4 space-y-8">
            {/* Page Management */}
            <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-white text-xs font-semibold uppercase tracking-wider text-gray-400">Structure</h3>
                    <button 
                         onClick={() => setIsAddingPage(true)}
                         className="p-1 hover:bg-purple-600/20 text-purple-400 rounded transition-colors"
                         title="Add New Page"
                    >
                        <Plus size={14} />
                    </button>
                 </div>
                 
                 {isAddingPage && (
                     <form onSubmit={handleAddPage} className="flex gap-2">
                         <input 
                            autoFocus
                            type="text" 
                            value={newPageName}
                            onChange={(e) => setNewPageName(e.target.value)}
                            placeholder="Page Name"
                            className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-white focus:border-purple-500 outline-none"
                         />
                         <button type="submit" className="text-xs bg-purple-600 px-2 rounded text-white">Add</button>
                         <button onClick={() => setIsAddingPage(false)} type="button" className="text-xs bg-gray-700 px-2 rounded text-gray-300">X</button>
                     </form>
                 )}

                 <div className="space-y-1">
                     {pages.map(page => (
                         <div 
                            key={page.id}
                            onClick={() => switchPage(page.id)}
                            className={`flex items-center justify-between p-2 rounded cursor-pointer group border ${currentPageId === page.id ? 'bg-purple-600/20 border-purple-500/50' : 'bg-[#2a2a3e]/50 border-transparent hover:bg-[#2a2a3e]'}`}
                         >
                             <div className="flex items-center gap-2 overflow-hidden">
                                 <File size={14} className={currentPageId === page.id ? 'text-purple-400' : 'text-gray-500'} />
                                 <span className={`text-xs truncate ${currentPageId === page.id ? 'text-white font-medium' : 'text-gray-400'}`}>{page.name}</span>
                             </div>
                             
                             {pages.length > 1 && (
                                 <button
                                    onClick={(e) => { e.stopPropagation(); if(confirm(`Delete ${page.name}?`)) deletePage(page.id); }}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-gray-600 transition-opacity"
                                 >
                                     <Trash2 size={12} />
                                 </button>
                             )}
                         </div>
                     ))}
                 </div>
            </div>

            {/* Rename Current Page */}
            {currentPage && (
                <div className="space-y-2">
                     <span className="text-gray-500 text-xs">Current Page Name</span>
                     <input 
                        type="text"
                        value={currentPage.name}
                        onChange={(e) => updatePageName(currentPage.id, e.target.value)}
                        className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-2 text-white text-xs outline-none focus:border-purple-500 transition-colors"
                     />
                     <p className="text-[10px] text-gray-500">URL Slug: <span className="font-mono text-purple-400">/{currentPage.slug}</span></p>
                </div>
            )}

            <div className="border-t border-gray-800/50 pt-6 space-y-4">
                <h3 className="text-white text-xs font-semibold uppercase tracking-wider text-gray-400">Canvas Dimensions</h3>
                <div className="grid grid-cols-2 gap-2">
                    <NumberInput 
                        label="Width (px)" 
                        value={canvasWidth} 
                        onChange={(val) => setCanvasSize(val, canvasHeight)} 
                        min={320} 
                        max={3840}
                    />
                    <NumberInput 
                        label="Height (px)" 
                        value={canvasHeight} 
                        onChange={(val) => setCanvasSize(canvasWidth, val)} 
                        min={600} 
                        max={10000}
                    />
                </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-purple-400 font-medium">Pro Tip:</span> Each page has its own canvas height. You can link buttons to any page in your project.
                </p>
            </div>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateComponent(selectedId!, { src: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 bg-[#1a1a2e] border-l border-gray-800 flex flex-col h-full overflow-hidden text-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-[#151525] flex justify-between items-center">
        <div>
          <h2 className="text-white font-semibold truncate max-w-[150px]">{selected.name}</h2>
          <p className="text-purple-400 text-xs mt-0.5 capitalize flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            {selected.type}
          </p>
        </div>
        <div className="flex gap-1">
            <button 
                title={selected.visible ? "Hide" : "Show"}
                onClick={() => updateComponent(selectedId!, { visible: !selected.visible })}
                className={`p-1.5 rounded hover:bg-gray-700 ${!selected.visible ? 'text-gray-500' : 'text-gray-400'}`}
            >
                <Eye size={14} />
            </button>
            <button 
                title={selected.locked ? "Unlock" : "Lock"}
                onClick={() => updateComponent(selectedId!, { locked: !selected.locked })}
                className={`p-1.5 rounded hover:bg-gray-700 ${selected.locked ? 'text-red-400' : 'text-gray-400'}`}
            >
                <Lock size={14} />
            </button>
        </div>
      </div>

      {/* Properties Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* GROUP 1: CONTENT */}
        {(selected.type === 'text' || selected.type === 'button' || selected.type === 'input') && (
          <div className="p-4 border-b border-gray-800 space-y-3">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Type size={12} /> Content
            </label>
            {selected.type !== 'input' ? (
                <textarea
                value={selected.content || ''}
                onChange={(e) => updateComponent(selectedId!, { content: e.target.value })}
                className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-2 text-white text-xs resize-none focus:border-purple-500 focus:outline-none transition-colors"
                rows={3}
                placeholder="Enter text content..."
                />
            ) : (
                <input
                value={selected.placeholder || ''}
                onChange={(e) => updateComponent(selectedId!, { placeholder: e.target.value })}
                className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-2 text-white text-xs focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Placeholder text..."
                />
            )}
          </div>
        )}

        {/* Link Action for Buttons */}
        {selected.type === 'button' && (
             <div className="p-4 border-b border-gray-800 space-y-3">
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Globe size={12} /> Link Action
                </label>
                
                <div className="space-y-1">
                    <span className="text-gray-500 text-xs">Navigate to Page</span>
                    <select
                        value={selected.linkToPageId || ''}
                        onChange={(e) => updateComponent(selectedId!, { linkToPageId: e.target.value })}
                        className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-2 text-white text-xs outline-none focus:border-purple-500"
                    >
                        <option value="">-- No Action --</option>
                        {pages.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} {currentPageId === p.id ? '(Current)' : ''}
                            </option>
                        ))}
                    </select>
                </div>
             </div>
        )}

        {selected.type === 'image' && (
          <div className="p-4 border-b border-gray-800 space-y-3">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <ImageIcon size={12} /> Source
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="space-y-2">
                <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[#2a2a3e] border border-dashed border-gray-600 rounded p-4 text-gray-400 text-xs hover:border-purple-500 hover:text-purple-400 transition-colors flex flex-col items-center gap-2"
                >
                <ImageIcon size={24} />
                <span>{selected.src ? 'Change Image' : 'Upload Image'}</span>
                </button>
                <input 
                    type="text" 
                    placeholder="Or enter image URL" 
                    value={selected.src || ''}
                    onChange={(e) => updateComponent(selectedId!, { src: e.target.value })}
                    className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-2 text-white text-xs focus:border-purple-500 focus:outline-none"
                />
            </div>
            
          </div>
        )}

        {/* GROUP 2: LAYOUT & POSITION */}
        <div className="p-4 border-b border-gray-800 space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Move size={12} /> Layout
          </label>
          
          <div className="grid grid-cols-2 gap-3">
            <NumberInput label="X Position" value={selected.styles.x} onChange={(v) => updateComponentStyles(selectedId!, { x: v })} />
            <NumberInput label="Y Position" value={selected.styles.y} onChange={(v) => updateComponentStyles(selectedId!, { y: v })} />
            <NumberInput label="Width" value={selected.styles.width} onChange={(v) => updateComponentStyles(selectedId!, { width: v })} />
            <NumberInput label="Height" value={selected.styles.height} onChange={(v) => updateComponentStyles(selectedId!, { height: v })} />
            
            <NumberInput label="Rotation" value={selected.styles.rotation || 0} onChange={(v) => updateComponentStyles(selectedId!, { rotation: v })} unit="°" />
            <NumberInput label="Z-Index" value={selected.styles.zIndex || 0} onChange={(v) => updateComponentStyles(selectedId!, { zIndex: v })} unit="" />
          </div>
        </div>

        {/* GROUP 3: TYPOGRAPHY */}
        {(selected.type === 'text' || selected.type === 'button' || selected.type === 'input') && (
          <div className="p-4 border-b border-gray-800 space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Type size={12} /> Typography
            </label>
            
            <div className="space-y-3">
                <div className="flex gap-2">
                    <select
                        value={selected.styles.fontFamily || 'Arial'}
                        onChange={(e) => updateComponentStyles(selectedId!, { fontFamily: e.target.value })}
                        className="flex-1 bg-[#2a2a3e] border border-gray-700 rounded p-1.5 text-white text-xs focus:border-purple-500 focus:outline-none"
                    >
                        <option value="Arial">Arial</option>
                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                        <option value="'Courier New', Courier, monospace">Courier New</option>
                        <option value="Helvetica, sans-serif">Helvetica</option>
                        <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
                        <option value="'Roboto', sans-serif">Roboto</option>
                        <option value="'Open Sans', sans-serif">Open Sans</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <NumberInput label="Size" value={selected.styles.fontSize || 16} onChange={(v) => updateComponentStyles(selectedId!, { fontSize: v })} />
                    <NumberInput label="Line Height" value={selected.styles.lineHeight || 1.2} onChange={(v) => updateComponentStyles(selectedId!, { lineHeight: v })} unit="" />
                </div>

                 <div className="flex gap-1 bg-[#2a2a3e] p-1 rounded border border-gray-700">
                     {[
                         { icon: Bold, key: 'fontWeight', val: 'bold', def: 'normal' as const },
                         { icon: Italic, key: 'fontStyle', val: 'italic', def: 'normal' as const },
                         { icon: Underline, key: 'textDecoration', val: 'underline', def: 'none' as const },
                     ].map((item, i) => (
                         <button
                            key={i}
                             onClick={() => updateComponentStyles(selectedId!, { [item.key]: (selected.styles as any)[item.key] === item.val ? item.def : item.val })}
                             className={`flex-1 p-1.5 rounded transition-colors flex justify-center ${
                                 (selected.styles as any)[item.key] === item.val 
                                 ? 'bg-purple-600 text-white' 
                                 : 'text-gray-400 hover:text-white'
                             }`}
                         >
                             <item.icon size={14} />
                         </button>
                     ))}
                 </div>
                 
                 <div className="flex gap-1 bg-[#2a2a3e] p-1 rounded border border-gray-700">
                  {[
                    { value: 'left', icon: AlignLeft },
                    { value: 'center', icon: AlignCenter },
                    { value: 'right', icon: AlignRight },
                    { value: 'justify', icon: AlignJustify },
                  ].map(({ value, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateComponentStyles(selectedId!, { textAlign: value as any })}
                      className={`flex-1 p-1.5 rounded transition-colors flex justify-center ${
                        selected.styles.textAlign === value 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </div>

                <ColorInput 
                    label="Text Color" 
                    color={selected.styles.textColor || '#ffffff'} 
                    onChange={(hex) => updateComponentStyles(selectedId!, { textColor: hex })} 
                />
            </div>
          </div>
        )}

        {/* GROUP 4: APPEARANCE */}
        <div className="p-4 border-b border-gray-800 space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Palette size={12} /> Appearance
          </label>
          
          <div className="space-y-4">
             <div className="space-y-2">
                <ColorInput 
                    label="Background Color" 
                    color={selected.styles.backgroundColor || 'transparent'} 
                    onChange={(hex) => updateComponentStyles(selectedId!, { backgroundColor: hex })} 
                />
             </div>

             <div className="space-y-2">
                <span className="text-gray-500 text-xs block">Opactiy</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={(selected.styles.opacity || 1) * 100}
                    onChange={(e) => updateComponentStyles(selectedId!, { opacity: Number(e.target.value) / 100 })}
                    className="w-full accent-purple-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
             </div>
             
             <div className="grid grid-cols-2 gap-3">
                 <NumberInput label="Radius" value={selected.styles.borderRadius || 0} onChange={(v) => updateComponentStyles(selectedId!, { borderRadius: v })} />
                 <NumberInput label="Padding" value={selected.styles.padding || 0} onChange={(v) => updateComponentStyles(selectedId!, { padding: v })} />
             </div>
          </div>
        </div>

        {/* GROUP 5: BORDER & SHADOW */}
        <div className="p-4 border-b border-gray-800 space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
             <Box size={12} /> Border
          </label>
            
          <div className="grid grid-cols-2 gap-3">
             <NumberInput label="Width" value={selected.styles.borderWidth || 0} onChange={(v) => updateComponentStyles(selectedId!, { borderWidth: v })} />
             <div className="space-y-1">
                 <span className="text-gray-500 text-xs">Style</span>
                 <select
                    value={selected.styles.borderStyle || 'solid'}
                    onChange={(e) => updateComponentStyles(selectedId!, { borderStyle: e.target.value as any })}
                    className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-1.5 text-white text-xs focus:border-purple-500 focus:outline-none"
                 >
                     <option value="solid">Solid</option>
                     <option value="dashed">Dashed</option>
                     <option value="dotted">Dotted</option>
                 </select>
             </div>
          </div>
          
          {selected.styles.borderWidth ? (
               <ColorInput 
               label="Border Color" 
               color={selected.styles.borderColor || '#000000'} 
               onChange={(hex) => updateComponentStyles(selectedId!, { borderColor: hex })} 
           />
          ) : null}
        </div>

        {/* GROUP 6: ANIMATIONS */}
        <div className="p-4 border-b border-gray-800 space-y-4">
             <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                 <Sparkles size={12} /> Animations
             </label>

             <div className="space-y-3">
                 <div className="space-y-1">
                     <span className="text-gray-500 text-xs">Entrance Animation</span>
                     <select
                        value={selected.animation?.type || ''}
                        onChange={(e) => updateComponent(selectedId!, { 
                            animation: { 
                                ...selected.animation, 
                                type: e.target.value,
                                duration: selected.animation?.duration || 1,
                                delay: selected.animation?.delay || 0,
                                infinite: selected.animation?.infinite || false
                            } 
                        })}
                        className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-1.5 text-white text-xs focus:border-purple-500 focus:outline-none custom-scrollbar"
                     >
                         <option value="">None</option>
                         <optgroup label="Fades">
                             <option value="fade-in">Fade In</option>
                             <option value="fade-in-up">Fade In Up</option>
                             <option value="fade-in-down">Fade In Down</option>
                             <option value="fade-in-left">Fade In Left</option>
                             <option value="fade-in-right">Fade In Right</option>
                         </optgroup>
                         <optgroup label="Zooms">
                                <option value="zoom-in">Zoom In</option>
                                <option value="zoom-out">Zoom Out</option>
                         </optgroup>
                         <optgroup label="Slides">
                                <option value="slide-in-up">Slide In Up</option>
                                <option value="slide-in-down">Slide In Down</option>
                                <option value="slide-in-left">Slide In Left</option>
                                <option value="slide-in-right">Slide In Right</option>
                         </optgroup>
                         <optgroup label="Bounces">
                                <option value="bounce">Bounce</option>
                                <option value="bounce-in">Bounce In</option>
                         </optgroup>
                         <optgroup label="Rotations">
                                <option value="rotate-in">Rotate In</option>
                                <option value="rotate-in-down-left">Rotate In Down Left</option>
                                <option value="rotate-in-down-right">Rotate In Down Right</option>
                         </optgroup>
                         <optgroup label="Flips">
                                <option value="flip-in-x">Flip In X</option>
                                <option value="flip-in-y">Flip In Y</option>
                         </optgroup>
                         <optgroup label="Attention Seekers">
                                <option value="pulse">Pulse</option>
                                <option value="shake">Shake</option>
                                <option value="swing">Swing</option>
                                <option value="tada">Tada</option>
                                <option value="wobble">Wobble</option>
                                <option value="jello">Jello</option>
                         </optgroup>
                     </select>
                 </div>

                 {selected.animation?.type && (
                     <>
                        <div className="grid grid-cols-2 gap-3">
                             <NumberInput 
                                label="Duration (s)" 
                                value={selected.animation.duration} 
                                onChange={(v) => updateComponent(selectedId!, { animation: { ...selected.animation!, duration: v } })} 
                                min={0.1}
                                max={10}
                                unit="s"
                             />
                             <NumberInput 
                                label="Delay (s)" 
                                value={selected.animation.delay} 
                                onChange={(v) => updateComponent(selectedId!, { animation: { ...selected.animation!, delay: v } })} 
                                min={0}
                                max={10}
                                unit="s"
                             />
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox"
                                id="anim-infinite"
                                checked={selected.animation.infinite}
                                onChange={(e) => updateComponent(selectedId!, { animation: { ...selected.animation!, infinite: e.target.checked } })}
                                className="accent-purple-500"
                            />
                            <label htmlFor="anim-infinite" className="text-gray-400 text-xs cursor-pointer select-none">Loop Animation</label>
                        </div>
                     </>
                 )}
             </div>
        </div>

        {/* GROUP 7: INTERACTIONS */}
        <div className="p-4 border-b border-gray-800 space-y-4 mb-20">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
             <Globe size={12} /> Interactions
          </label>
          
          <div className="space-y-2">
             <span className="text-gray-500 text-xs">On Click Navigate To</span>
             <select
                value={selected.linkToPageId || ''}
                onChange={(e) => updateComponent(selectedId!, { linkToPageId: e.target.value })}
                className="w-full bg-[#2a2a3e] border border-gray-700 rounded p-1.5 text-white text-xs focus:border-purple-500 focus:outline-none"
             >
                 <option value="">-- No Action --</option>
                 {pages.map(p => (
                     <option key={p.id} value={p.id}>{p.name}</option>
                 ))}
             </select>
          </div>
        </div>
      </div>
    </div>
  );
}
