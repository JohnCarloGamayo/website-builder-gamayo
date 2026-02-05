'use client';

import { useEditorStore } from '@/store/editorStore';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { 
  Undo2, Redo2, Save, Download, Upload, Eye, 
  Grid3X3, ZoomIn, ZoomOut, RotateCcw, Home, Check, Magnet, Monitor, Tablet, Smartphone, Code, FileJson, FileArchive, Loader2
} from 'lucide-react';
import { generateHTMLExport, generateReactExport, generateZipExport } from '@/lib/export';

export default function EditorHeader() {
  const router = useRouter();
  const { 
    zoom, setZoom, showGrid, toggleGrid, snapToGrid, toggleSnapToGrid,
    undo, redo, exportDesign, importDesign, resetToDefault,
    history, historyIndex, saveHistory, setPreviewMode, previewMode,
    currentProjectId, setCurrentProjectId
  } = useEditorStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const supabase = createClient();

  const handleExport = () => {
    const data = exportDesign();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-design.json';
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleExportHTML = () => {
    const state = useEditorStore.getState();
    const html = generateHTMLExport(state.pages, state.canvasWidth);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleExportReact = () => {
    const state = useEditorStore.getState();
    const react = generateReactExport(state.pages, state.canvasWidth);
    const blob = new Blob([react], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'App.jsx';
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleExportZip = async () => {
    const state = useEditorStore.getState();
    await generateZipExport(state.pages, state.canvasWidth);
    setShowExportMenu(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        importDesign(json);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    saveHistory(); // Local history
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            toast.error("Please login to save your work");
            // Optionally redirect, but might lose work. Better to let them login in a new tab or modal?
            // For now, simple redirect warning
            if (confirm("You are not logged in. Navigate to login? Your work might be lost if not manually exported.")) {
                router.push('/login');
            }
            return;
        }

        const state = useEditorStore.getState();

        if (currentProjectId) {
            // Update existing
            const { error } = await supabase
                .from('projects')
                .update({ 
                    pages: state.pages, 
                    updated_at: new Date().toISOString() 
                })
                .eq('id', currentProjectId);
            
            if (error) throw error;
            toast.success("Project saved!");
        } else {
            // Create new
            const name = window.prompt("Enter project name:", "My Awesome Site");
            if (!name) {
                setIsSaving(false);
                return;
            }

            const { data, error } = await supabase
                .from('projects')
                .insert({
                    user_id: user.id,
                    name,
                    pages: state.pages
                })
                .select()
                .single();
            
            if (error) throw error;
            if (data) {
                setCurrentProjectId(data.id);
                toast.success("Project created!");
            }
        }
        
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);

    } catch (error: any) {
        console.error(error);
        toast.error("Failed to save: " + error.message);
    } finally {
        setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Save first, then navigate to preview
    saveHistory();
    router.push('/preview');
  };

  const handlePreviewMode = (mode: 'desktop' | 'tablet' | 'mobile') => {
    setPreviewMode(mode);
  };

  return (
    <header className="h-14 bg-[#12121f] border-b border-gray-800 flex items-center justify-between px-4">
      {/* Left - Logo & Back */}
      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <Home size={18} />
          <span className="text-sm">Back to Site</span>
        </Link>
        
        <div className="h-6 w-px bg-gray-700" />
        
        <h1 className="text-white font-semibold">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Website Builder
          </span>
        </h1>
      </div>

      {/* Center - Tools */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center bg-gray-800 rounded-lg">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={18} />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-700" />

        {/* Zoom */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-lg px-2">
          <button
            onClick={() => setZoom(zoom - 10)}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-gray-300 text-sm min-w-[50px] text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(zoom + 10)}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {/* Grid Toggle */}
        <button
          onClick={toggleGrid}
          className={`p-2 rounded-lg transition-colors ${
            showGrid ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
          title="Toggle Grid"
        >
          <Grid3X3 size={18} />
        </button>

        {/* Snap to Grid Toggle */}
        <button
          onClick={toggleSnapToGrid}
          className={`p-2 rounded-lg transition-colors ${
            snapToGrid ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
          title="Snap to Grid"
        >
          <Magnet size={18} />
        </button>

        <div className="h-6 w-px bg-gray-700" />

        {/* Responsive Preview Modes */}
        <div className="flex items-center gap-1 bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-xl p-1 shadow-lg">
          <button
            onClick={() => handlePreviewMode('desktop')}
            className={`p-2.5 rounded-lg transition-all duration-200 relative group ${
              previewMode === 'desktop' 
                ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            title="Desktop (1440px)"
          >
            <Monitor size={18} className={previewMode === 'desktop' ? 'animate-pulse' : ''} />
            {previewMode === 'desktop' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-purple-400 rounded-full" />
            )}
          </button>
          <button
            onClick={() => handlePreviewMode('tablet')}
            className={`p-2.5 rounded-lg transition-all duration-200 relative group ${
              previewMode === 'tablet' 
                ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            title="Tablet (768px)"
          >
            <Tablet size={18} className={previewMode === 'tablet' ? 'animate-pulse' : ''} />
            {previewMode === 'tablet' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-purple-400 rounded-full" />
            )}
          </button>
          <button
            onClick={() => handlePreviewMode('mobile')}
            className={`p-2.5 rounded-lg transition-all duration-200 relative group ${
              previewMode === 'mobile' 
                ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            title="Mobile (375px)"
          >
            <Smartphone size={18} className={previewMode === 'mobile' ? 'animate-pulse' : ''} />
            {previewMode === 'mobile' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-purple-400 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={resetToDefault}
          className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
          title="Reset to Default"
        >
          <RotateCcw size={18} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm"
        >
          <Upload size={16} />
          <span className="hidden sm:inline">Import</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>

          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-[#1e1e2e] border border-gray-700 rounded-lg shadow-2xl py-1 z-50">
                <button
                  onClick={handleExportZip}
                  className="w-full px-4 py-2 text-left text-sm text-purple-400 hover:bg-gray-800 flex items-center gap-2 font-medium"
                >
                  <FileArchive size={14} /> Export ZIP Package
                </button>
                <div className="h-px bg-gray-700 my-1" />
                <button
                  onClick={handleExport}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                >
                  <FileJson size={14} /> Export JSON
                </button>
                <button
                  onClick={handleExportHTML}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                >
                  <Code size={14} /> Export HTML
                </button>
                <button
                  onClick={handleExportReact}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                >
                  <Code size={14} /> Export React
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            saved 
              ? 'bg-green-600 text-white' 
              : isSaving ? 'bg-purple-700 text-gray-200' : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {saved ? <Check size={16} /> : isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save'}</span>
        </button>

        <button
          onClick={handlePreview}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Eye size={16} />
          <span>Preview</span>
        </button>
      </div>
    </header>
  );
}
