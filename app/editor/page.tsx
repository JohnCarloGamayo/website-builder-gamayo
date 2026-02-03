'use client';

import EditorHeader from '@/components/builder/EditorHeader';
import LayersPanel from '@/components/builder/LayersPanel'; // Acts as LeftSidebar
import EditorCanvas from '@/components/builder/EditorCanvas';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import FloatingToolbar from '@/components/builder/FloatingToolbar'; // New
import AutoSave from '@/components/builder/AutoSave';
import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Trash2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import TemplateModal from '@/components/builder/TemplateModal';
import { useState } from 'react';

export default function EditorPage() {
  const { resetToDefault, components } = useEditorStore();
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] overflow-hidden text-gray-300">
      <AutoSave />
      <TemplateModal />
      {/* Top Header */}
      <EditorHeader />
      
      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar (Toggleable) */}
        {showLeftSidebar && (
            <div className="h-full flex z-20">
                <LayersPanel />
            </div>
        )}
        
        {/* Sidebar Toggle Button (Absolute) */}
        <button
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            className="absolute top-4 z-30 p-1.5 bg-[#1e1e1e] border border-gray-700 rounded-r-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all shadow-md"
            style={{ left: showLeftSidebar ? '256px' : '0' }}
            title={showLeftSidebar ? "Hide Sidebar" : "Show Sidebar"}
        >
            {showLeftSidebar ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}
        </button>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0d0d1a] relative">
          {/* Floating Toolbar (Figma-style) */}
          <FloatingToolbar />

          {/* Canvas */}
          <EditorCanvas />
        </div>
        
        {/* Right - Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
}
