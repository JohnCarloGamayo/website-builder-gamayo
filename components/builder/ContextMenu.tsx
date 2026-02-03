'use client';

import { useEditorStore } from '@/store/editorStore';
import { Copy, Trash2, Lock, Unlock, Eye, EyeOff, ArrowUp, ArrowDown, Edit3, Layers } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  componentId: string | null;
  onClose: () => void;
}

export default function ContextMenu({ x, y, componentId, onClose }: ContextMenuProps) {
  const { 
    components, duplicateComponent, removeComponent, updateComponent, 
    reorderComponent, groupSelected, ungroupSelected, selectedIds 
  } = useEditorStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const component = components.find(c => c.id === componentId);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!component) return null;

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#1e1e2e] border border-gray-700 rounded-lg shadow-2xl py-1 z-[9999] min-w-[180px]"
      style={{ left: x, top: y }}
    >
      <button
        onClick={() => handleAction(() => duplicateComponent(component.id))}
        className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
      >
        <Copy size={14} /> Duplicate <span className="ml-auto text-xs text-gray-500">Ctrl+D</span>
      </button>

      <button
        onClick={() => handleAction(() => removeComponent(component.id))}
        className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-800 flex items-center gap-2"
      >
        <Trash2 size={14} /> Delete <span className="ml-auto text-xs text-gray-500">Del</span>
      </button>

      <div className="h-px bg-gray-700 my-1" />

      <button
        onClick={() => handleAction(() => updateComponent(component.id, { locked: !component.locked }))}
        className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
      >
        {component.locked ? <Unlock size={14} /> : <Lock size={14} />}
        {component.locked ? 'Unlock' : 'Lock'}
      </button>

      <button
        onClick={() => handleAction(() => updateComponent(component.id, { visible: !component.visible }))}
        className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
      >
        {component.visible !== false ? <EyeOff size={14} /> : <Eye size={14} />}
        {component.visible !== false ? 'Hide' : 'Show'}
      </button>

      <div className="h-px bg-gray-700 my-1" />

      <button
        onClick={() => handleAction(() => reorderComponent(component.id, 'up'))}
        className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
      >
        <ArrowUp size={14} /> Bring Forward
      </button>

      <button
        onClick={() => handleAction(() => reorderComponent(component.id, 'down'))}
        className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
      >
        <ArrowDown size={14} /> Send Backward
      </button>

      {selectedIds.length > 1 && (
        <>
          <div className="h-px bg-gray-700 my-1" />
          <button
            onClick={() => handleAction(groupSelected)}
            className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
          >
            <Layers size={14} /> Group Selection <span className="ml-auto text-xs text-gray-500">Ctrl+G</span>
          </button>
        </>
      )}
    </div>
  );
}
