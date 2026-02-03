'use client';

import { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { templates } from '@/lib/templates';
import { X, LayoutTemplate } from 'lucide-react';

interface TemplateModalProps {
  onCheckEmpty?: () => void;
}

export default function TemplateModal({ onCheckEmpty }: TemplateModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { setComponents, components, setCanvasSize } = useEditorStore();

  // Only show if components are empty
  if (components.length > 0 || !isOpen) return null;

  const handleSelectTemplate = (template: typeof templates[0]) => {
    setComponents(template.components);
    // Determine canvas size from content or default
    // Check for max width in components to ensure NO cutoff
    const maxX = Math.max(...template.components.map(c => c.styles.x + c.styles.width), 1440);
    const maxY = Math.max(...template.components.map(c => c.styles.y + c.styles.height), 800);
    
    // Force a small buffer to be safe
    const safeWidth = Math.max(maxX, 1440);
    const safeHeight = Math.max(maxY, 1200);

    setCanvasSize(safeWidth, safeHeight);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a2e] border border-gray-700 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-[#151525] flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <LayoutTemplate className="text-purple-500" />
                    Choose a Template
                </h2>
                <p className="text-gray-400 text-sm mt-1">Start from scratch or select a pre-made design</p>
            </div>
            {/* <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
            </button> */}
        </div>
        
        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
                <button
                    key={index}
                    onClick={() => handleSelectTemplate(template)}
                    className="group relative flex flex-col text-left bg-[#0d0d1a] border border-gray-700 hover:border-purple-500 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:-translate-y-1"
                >
                    {/* Preview Skeleton */}
                    <div className="h-40 bg-[#05050a] w-full p-4 relative overflow-hidden">
                        {template.name === 'Blank Canvas' ? (
                             <div className="w-full h-full border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center text-gray-600">
                                 Blank
                             </div>
                        ) : (
                             <div className="w-full h-full bg-gray-800/20 rounded-lg transform group-hover:scale-105 transition-transform duration-500">
                                 {/* Mini representation of template components */}
                                {template.components.slice(0, 5).map((c, i) => (
                                    <div 
                                        key={c.id} 
                                        className="absolute bg-gray-700/50 rounded-sm"
                                        style={{
                                            left: `${(c.styles.x / 1440) * 100}%`,
                                            top: `${(c.styles.y / 1000) * 100}%`,
                                            width: `${(c.styles.width / 1440) * 100}%`,
                                            height: `${(c.styles.height / 1000) * 100}%`,
                                            backgroundColor: c.styles.backgroundColor || '#374151'
                                        }}
                                    />
                                ))}
                             </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 border-t border-gray-800 group-hover:border-purple-500/30 transition-colors">
                        <h3 className="text-white font-semibold text-lg">{template.name}</h3>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{template.description}</p>
                    </div>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
}
