'use client';

import { useEditorStore } from '@/store/editorStore';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Undo2, Redo2, Save, Download, Upload, Eye, 
  Grid3X3, ZoomIn, ZoomOut, RotateCcw, Home, Check
} from 'lucide-react';

export default function EditorHeader() {
  const router = useRouter();
  const { 
    zoom, setZoom, showGrid, toggleGrid,
    undo, redo, exportDesign, importDesign, resetToDefault,
    history, historyIndex, saveHistory
  } = useEditorStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);

  const handleExport = () => {
    const data = exportDesign();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-design.json';
    a.click();
    URL.revokeObjectURL(url);
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

  const handleSave = () => {
    // Save is automatic via zustand persist, but we can force it
    saveHistory();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePreview = () => {
    // Save first, then navigate to preview
    saveHistory();
    router.push('/preview');
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

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Export</span>
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            saved 
              ? 'bg-green-600 text-white' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          <span>{saved ? 'Saved!' : 'Save'}</span>
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
