'use client';

import { useEditorStore, ComponentData } from '@/store/editorStore';
import { 
  Eye, EyeOff, Lock, Unlock, Trash2, Copy, 
  Type, Image, Square, 
  MousePointer2, Layers, Video, FormInput, Circle, Minus, GripVertical, File, Plus, Search, ChevronDown, ChevronRight, Layout, FolderOpen, Folder
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

// Get icon for component type
const getLayerIcon = (type: ComponentData['type'], isGroup: boolean = false) => {
  if (isGroup) return <FolderOpen size={14} className="text-yellow-500" />;
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

// Layer Item Component with Figma-like nesting
function LayerItem({ 
  comp, 
  childComponents, 
  depth = 0,
  selectedId, 
  selectedIds, 
  selectComponent, 
  updateComponent,
  isGroup,
  isExpanded,
  onToggleExpand,
  allComponents
}: {
  comp: ComponentData;
  childComponents: ComponentData[];
  depth?: number;
  selectedId: string | null;
  selectedIds: string[];
  selectComponent: (id: string | null, multi?: boolean) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  isGroup: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  allComponents: ComponentData[];
}) {
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
    <div ref={setNodeRef} style={style}>
      <div
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey) {
            selectComponent(comp.id, true);
          } else {
            selectComponent(comp.id);
          }
        }}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className={`
          group flex items-center gap-1.5 py-1.5 pr-2 cursor-pointer transition-all
          ${isSelected 
            ? 'bg-purple-600/30 border-l-2 border-purple-500' 
            : 'hover:bg-gray-800/50 border-l-2 border-transparent'
          }
          ${!comp.visible ? 'opacity-50' : ''}
        `}
      >
        {/* Expand/Collapse for groups */}
        {isGroup ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
            className="text-gray-500 hover:text-white p-0.5 flex-shrink-0"
          >
            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
        ) : (
          <span className="w-4 flex-shrink-0" /> 
        )}

        {/* Drag Handle */}
        <div {...attributes} {...listeners} className="cursor-grab text-gray-600 hover:text-gray-400 touch-none flex-shrink-0">
          <GripVertical size={12} />
        </div>

        {/* Icon */}
        <span className={`flex-shrink-0 ${isGroup ? 'text-yellow-500' : 'text-gray-400'}`}>
          {getLayerIcon(comp.type, isGroup)}
        </span>
        
        {/* Name */}
        {isRenaming ? (
          <input
            autoFocus
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-gray-900 text-white text-xs px-1 py-0.5 rounded border border-purple-500 outline-none min-w-0"
          />
        ) : (
          <span 
            onDoubleClick={(e) => { e.stopPropagation(); setIsRenaming(true); }}
            className={`flex-1 text-xs truncate text-left select-none ${isGroup ? 'text-yellow-200 font-medium' : 'text-white'}`}
          >
            {comp.name}
          </span>
        )}
        
        {/* Quick Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); updateComponent(comp.id, { visible: !comp.visible }); }}
            className="p-0.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
            title={comp.visible ? 'Hide' : 'Show'}
          >
            {comp.visible !== false ? <Eye size={10} /> : <EyeOff size={10} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); updateComponent(comp.id, { locked: !comp.locked }); }}
            className={`p-0.5 hover:bg-gray-700 rounded ${comp.locked ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
            title={comp.locked ? 'Unlock' : 'Lock'}
          >
            {comp.locked ? <Lock size={10} /> : <Unlock size={10} />}
          </button>
        </div>
      </div>

      {/* Render Children (nested components in group) - Figma style */}
      {isGroup && isExpanded && childComponents.length > 0 && (
        <div className="relative">
          {/* Vertical line connecting children */}
          <div 
            className="absolute left-0 top-0 bottom-0 border-l border-gray-700"
            style={{ marginLeft: `${depth * 16 + 18}px` }}
          />
          {childComponents.map((child) => {
            const grandChildren = allComponents.filter(c => c.parentId === child.id);
            const childIsGroup = grandChildren.length > 0;
            return (
              <LayerItem
                key={child.id}
                comp={child}
                childComponents={grandChildren}
                depth={depth + 1}
                selectedId={selectedId}
                selectedIds={selectedIds}
                selectComponent={selectComponent}
                updateComponent={updateComponent}
                isGroup={childIsGroup}
                isExpanded={true}
                onToggleExpand={() => {}}
                allComponents={allComponents}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function LayersPanel() {
  const { 
    components, selectedId, selectedIds, selectComponent, removeComponent, duplicateComponent, updateComponent, setComponents, saveHistory,
    pages, currentPageId, switchPage, addPage, updatePageName, groupSelected, ungroupSelected 
  } = useEditorStore();
  
  const [pagesCollapsed, setPagesCollapsed] = useState(false);
  const [layersCollapsed, setLayersCollapsed] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

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

  const toggleGroupExpanded = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  // Get root components (not inside a group)
  const rootComponents = components.filter(c => !c.parentId);
  
  // Get children for a group
  const getChildren = (groupId: string) => components.filter(c => c.parentId === groupId);
  
  // Check if component is a group (has children)
  const isGroupCheck = (compId: string) => components.some(c => c.parentId === compId);

  // Filter based on search
  const filteredRootComponents = rootComponents.filter(comp => 
    searchQuery.trim() === '' || 
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Can group (2+ items selected)
  const canGroup = selectedIds.length >= 2;
  // Can ungroup (selected item is a group)
  const canUngroup = selectedId && isGroupCheck(selectedId);

  return (
    <div className="w-64 bg-[#1a1a2e] border-r border-[#2a2a4a] flex flex-col h-full flex-shrink-0 select-none">
      
      {/* Pages Section */}
      <div className="flex flex-col border-b border-[#2a2a4a]"> 
          <div 
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setPagesCollapsed(!pagesCollapsed)}
          >
              <div className="flex items-center gap-2 font-semibold text-xs text-gray-400 uppercase tracking-wider">
                  {pagesCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                  <span>Pages</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsAddingPage(true); }}
                className="hover:text-white text-gray-500 hover:bg-gray-800 p-1 rounded"
              >
                  <Plus size={12} />
              </button>
          </div>

          {!pagesCollapsed && (
            <div className="px-2 pb-2">
                {isAddingPage && (
                    <form onSubmit={handleAddPage} className="flex gap-1 mb-2">
                        <input 
                            autoFocus
                            className="bg-[#252540] text-white text-xs p-1.5 rounded w-full border border-gray-600 outline-none focus:border-purple-500"
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
                            px-3 py-1.5 rounded text-xs cursor-pointer flex items-center gap-2
                            ${currentPageId === page.id ? 'bg-purple-600/20 text-purple-300 border-l-2 border-purple-500' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
                        `}
                    >
                        <File size={12} />
                        <span className="truncate">{page.name}</span>
                    </div>
                ))}
            </div>
          )}
      </div>

      {/* Layers Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors border-b border-[#2a2a4a]"
             onClick={() => setLayersCollapsed(!layersCollapsed)}
        >
            <div className="flex items-center gap-2 font-semibold text-xs text-gray-400 uppercase tracking-wider">
                  {layersCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                  <span>Layers</span>
                  <span className="text-gray-600">({components.length})</span>
           </div>
        </div>

        {!layersCollapsed && (
            <>
            {/* Search Input */}
            <div className="px-2 pt-2 pb-1">
                <div className="relative">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text"
                        placeholder="Search layers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#252540] text-white text-xs pl-7 pr-2 py-1.5 rounded border border-[#3a3a5a] outline-none focus:border-purple-500"
                    />
                </div>
            </div>

            {/* Group/Ungroup Buttons */}
            <div className="px-2 py-1 flex gap-1">
              <button
                onClick={() => groupSelected()}
                disabled={!canGroup}
                className={`flex-1 text-xs py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors
                  ${canGroup ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30' : 'bg-gray-800/30 text-gray-600 cursor-not-allowed'}
                `}
              >
                <Folder size={10} /> Group
              </button>
              <button
                onClick={() => ungroupSelected()}
                disabled={!canUngroup}
                className={`flex-1 text-xs py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors
                  ${canUngroup ? 'bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30' : 'bg-gray-800/30 text-gray-600 cursor-not-allowed'}
                `}
              >
                <FolderOpen size={10} /> Ungroup
              </button>
            </div>

            {/* Layer Tree - Figma Style */}
            <div className="flex-1 overflow-y-auto py-1 custom-scrollbar">
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={filteredRootComponents.map(c => c.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {filteredRootComponents.map((comp) => {
                            const childComponents = getChildren(comp.id);
                            const isGroup = isGroupCheck(comp.id);
                            return (
                                <LayerItem 
                                    key={comp.id}
                                    comp={comp}
                                    childComponents={childComponents}
                                    depth={0}
                                    selectedId={selectedId}
                                    selectedIds={selectedIds}
                                    selectComponent={selectComponent}
                                    updateComponent={updateComponent}
                                    isGroup={isGroup}
                                    isExpanded={expandedGroups.has(comp.id)}
                                    onToggleExpand={() => toggleGroupExpanded(comp.id)}
                                    allComponents={components}
                                />
                            );
                        })}
                    </SortableContext>
                </DndContext>
                {filteredRootComponents.length === 0 && components.length > 0 && (
                    <div className="text-center py-8 text-gray-500 text-xs">
                        No matching layers
                    </div>
                )}
                {components.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-xs">
                        No layers yet.<br/>Drag components to canvas.
                    </div>
                )}
            </div>
            </>
        )}
      </div>

      {/* Footer / Selected Layer Actions */}
      {(selectedId || selectedIds.length > 0) && (
        <div className="p-2 border-t border-[#2a2a4a] bg-[#151528]">
          <div className="flex items-center gap-1">
             <button
              onClick={() => {
                if (selectedIds.length > 0) {
                  selectedIds.forEach(id => removeComponent(id));
                } else if (selectedId) {
                  removeComponent(selectedId);
                }
              }}
              className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Trash2 size={12} /> Delete
            </button>
            <button
              onClick={() => {
                if (selectedId) duplicateComponent(selectedId);
              }}
              className="flex-1 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Copy size={12} /> Duplicate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
