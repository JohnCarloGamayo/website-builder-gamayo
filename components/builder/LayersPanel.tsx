'use client';

import { useEditorStore, ComponentData } from '@/store/editorStore';
import { 
  Eye, EyeOff, Lock, Unlock, Trash2, Copy, 
  Type, Image, Square, 
  MousePointer2, Layers, Video, FormInput, Circle, Minus, GripVertical, File, Plus, Search, ChevronDown, ChevronRight, Layout
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { 
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component
function SortableLayerItem({ comp, selectedId, selectedIds, selectComponent, updateComponent, getIcon }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: comp.id });

    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState(comp.name);

    useEffect(() => {
        setRenameValue(comp.name);
    }, [comp.name]);

    const handleRename = () => {
        if (renameValue.trim()) {
            updateComponent(comp.id, { name: renameValue });
        } else {
            setRenameValue(comp.name);
        }
        setIsRenaming(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleRename();
        if (e.key === 'Escape') {
            setRenameValue(comp.name);
            setIsRenaming(false);
        }
    };

    const isSelected = selectedIds?.includes(comp.id) || selectedId === comp.id;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : 'auto',
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-1 pointer-events-auto"> 
            <div
                onClick={(e) => {
                    // Multi-select with Ctrl key
                    if (e.ctrlKey || e.metaKey) {
                        selectComponent(comp.id, true);
                    } else {
                        selectComponent(comp.id);
                    }
                }}
                className={`
                group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all w-full
                ${isSelected 
                    ? 'bg-purple-600/30 border border-purple-500' 
                    : 'hover:bg-gray-800/50 border border-transparent bg-[#1e1e35]'
                }
                ${!comp.visible ? 'opacity-50' : ''}
                `}
            >
                {/* Drag Handle */}
                <div {...attributes} {...listeners} className="cursor-grab text-gray-600 hover:text-gray-400 touch-none">
                     <GripVertical size={14} />
                </div>

                {/* Icon */}
                <span className="text-gray-400">{getIcon(comp.type)}</span>
                
                {/* Name - Double click to rename */}
                {isRenaming ? (
                    <input
                        autoFocus
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={handleKeyDown}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-gray-900 text-white text-sm px-1 py-0.5 rounded border border-purple-500 outline-none min-w-0"
                    />
                ) : (
                    <span 
                        onDoubleClick={(e) => { e.stopPropagation(); setIsRenaming(true); }}
                        className="flex-1 text-sm text-white truncate text-left select-none"
                    >
                        {comp.name}
                    </span>
                )}
                
                {/* Actions */}
                <div className="flex items-center gap-1">
                <button
                    onClick={(e) => { e.stopPropagation(); updateComponent(comp.id, { visible: !comp.visible }); }}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                    title={comp.visible ? 'Hide' : 'Show'}
                >
                    {comp.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); updateComponent(comp.id, { locked: !comp.locked }); }}
                    className={`p-1 hover:bg-gray-700 rounded ${comp.locked ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                    title={comp.locked ? 'Unlock' : 'Lock'}
                >
                    {comp.locked ? <Lock size={12} /> : <Unlock size={12} />}
                </button>
                </div>
            </div>
        </div>
    );
}

export default function LayersPanel() {
  const { 
    components, selectedId, selectedIds, selectComponent, removeComponent, duplicateComponent, updateComponent, setComponents, saveHistory,
    pages, currentPageId, switchPage, addPage, updatePageName 
  } = useEditorStore();
  
  const [pagesCollapsed, setPagesCollapsed] = useState(false);
  const [layersCollapsed, setLayersCollapsed] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [isAddingPage, setIsAddingPage] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddPage = (e: React.FormEvent) => {
      e.preventDefault();
      if (newPageName.trim()) {
          addPage(newPageName);
          setNewPageName('');
          setIsAddingPage(false);
      }
  };
    
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
        const oldIndex = components.findIndex((c) => c.id === active.id);
        const newIndex = components.findIndex((c) => c.id === over?.id);
        
        // dnd-kit arrayMove
        const newComponents = arrayMove(components, oldIndex, newIndex);
        setComponents(newComponents);
        saveHistory();
    }
  };


  const getIcon = (type: ComponentData['type']) => {
    switch (type) {
      case 'text': return <Type size={14} />;
      case 'image': return <Image size={14} />;
      case 'button': return <MousePointer2 size={14} />;
      case 'container': return <Square size={14} />;
      case 'shape': return <Square size={14} />;
      case 'video': return <Video size={14} />;
      case 'input': return <FormInput size={14} />;
      case 'icon': return <Circle size={14} />;
      case 'divider': return <Minus size={14} />;
      default: return <Layers size={14} />;
    }
  };

  return (
    <div className="w-64 bg-[#1e1e1e] border-r border-[#333] flex flex-col h-full flex-shrink-0 select-none">
      
      {/* Pages Section */}
      <div className="flex flex-col border-b border-[#333]"> 
          <div 
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setPagesCollapsed(!pagesCollapsed)}
          >
              <div className="flex items-center gap-2 font-semibold text-xs text-gray-400">
                  {pagesCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  <span>Pages</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsAddingPage(true); }}
                className="hover:text-white text-gray-500"
              >
                  <Plus size={14} />
              </button>
          </div>

          {!pagesCollapsed && (
            <div className="px-2 pb-2">
                {isAddingPage && (
                    <form onSubmit={handleAddPage} className="flex gap-1 mb-2">
                        <input 
                            autoFocus
                            className="bg-[#333] text-white text-xs p-1 rounded w-full border border-gray-600 outline-none"
                            placeholder="Page name"
                            value={newPageName}
                            onChange={(e) => setNewPageName(e.target.value)}
                            onBlur={() => { if(!newPageName) setIsAddingPage(false); }}
                        />
                    </form>
                )}
                {pages.map(page => (
                    <div 
                        key={page.id}
                        onClick={() => switchPage(page.id)}
                        className={`
                            px-4 py-1.5 rounded-md text-sm cursor-pointer flex items-center gap-2
                            ${currentPageId === page.id ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
                        `}
                    >
                        <File size={12} className={currentPageId === page.id ? 'text-gray-200' : 'text-gray-600'} />
                        <span className="truncate">{page.name}</span>
                    </div>
                ))}
            </div>
          )}
      </div>

      {/* Layers Section */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
        <div 
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors border-b border-[#333]"
             onClick={() => setLayersCollapsed(!layersCollapsed)}
        >
            <div className="flex items-center gap-2 font-semibold text-xs text-gray-400">
                  {layersCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  <span>Layers</span>
           </div>
           <Search size={14} className="text-gray-600" />
        </div>

        {!layersCollapsed && (
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={components.map(c => c.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {components.map((comp) => (
                            <SortableLayerItem 
                                key={comp.id}
                                comp={comp}
                                selectedId={selectedId}
                                selectedIds={selectedIds}
                                selectComponent={selectComponent}
                                updateComponent={updateComponent}
                                getIcon={getIcon}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
                {components.length === 0 && (
                    <div className="text-center py-10 opacity-30 text-xs">
                        No layers on this page
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Footer / Selected Layer Actions */}
      {selectedId && (
        <div className="p-3 border-t border-gray-800 bg-[#151525]">
          <div className="flex items-center justify-between gap-2">
             <button
              onClick={() => removeComponent(selectedId)}
              className="flex-1 p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} /> Delete
            </button>
            <button
              onClick={() => duplicateComponent(selectedId)}
              className="flex-1 p-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-xs flex items-center justify-center gap-2 transition-colors"
              title="Duplicate"
            >
              <Copy size={14} /> Duplicate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
