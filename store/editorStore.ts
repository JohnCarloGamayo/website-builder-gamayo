'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ComponentData {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'shape' | 'icon' | 'video' | 'input' | 'divider';
  name: string;
  content?: string;
  src?: string;
  placeholder?: string;
  styles: {
    x: number;
    y: number;
    width: number;
    height: number;
    backgroundColor?: string;
    backgroundImage?: string;
    textColor?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline' | 'line-through';
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    padding?: number;
    opacity?: number;
    zIndex?: number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    lineHeight?: number;
    letterSpacing?: number;
    boxShadow?: string;
    rotation?: number;
  };
  animation?: {
    type: string; // e.g., 'fade-in-up', 'zoom-in', 'slide-in-left'
    duration: number; // in seconds
    delay: number; // in seconds
    infinite: boolean;
  };
  parentId?: string; // For grouping
  locked?: boolean;
  visible?: boolean;
  linkToPageId?: string; // For buttons to link to other pages
}

export interface Page {
  id: string;
  name: string; // e.g., "Home", "About"
  slug: string; // "home", "about"
  components: ComponentData[];
  canvasHeight: number;
}

interface EditorState {
  pages: Page[];
  currentPageId: string;

  components: ComponentData[]; // Active page components
  selectedId: string | null;
  selectedIds: string[]; // For multi-selection
  hoveredId: string | null;
  zoom: number;
  showGrid: boolean;
  snapToGrid: boolean;
  canvasWidth: number;
  canvasHeight: number;
  baseCanvasWidth: number; // Original design width (1440px)
  previewMode: 'desktop' | 'tablet' | 'mobile';
  history: ComponentData[][];
  historyIndex: number;
  
  // Page Actions
  addPage: (name: string) => void;
  switchPage: (pageId: string) => void;
  deletePage: (pageId: string) => void;
  updatePageName: (pageId: string, name: string) => void;
  
  // Actions
  addComponent: (component: ComponentData) => void;
  setComponents: (components: ComponentData[]) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  updateComponentStyles: (id: string, styles: Partial<ComponentData['styles']>) => void;
  removeComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  selectComponent: (id: string | null, multi?: boolean) => void;
  selectAllComponents: () => void;
  hoverComponent: (id: string | null) => void;
  moveComponent: (id: string, x: number, y: number) => void;
  resizeComponent: (id: string, width: number, height: number) => void;
  reorderComponent: (id: string, direction: 'up' | 'down') => void;
  groupSelected: () => void;
  ungroupSelected: () => void;
  
  setZoom: (zoom: number) => void;
  setCanvasSize: (width: number, height: number) => void;
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  getScaleFactor: () => number;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  
  exportDesign: () => string;
  importDesign: (json: string) => void;

  resetToDefault: () => void;
}

const defaultComponents: ComponentData[] = [];
const defaultPages: Page[] = [
  { id: 'home', name: 'Home', slug: 'home', components: [], canvasHeight: 1200 }
];

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      pages: defaultPages,
      currentPageId: 'home',
      components: defaultComponents,
      selectedId: null,
      selectedIds: [],
      hoveredId: null,
      zoom: 100,
      showGrid: true,
      snapToGrid: false,
      canvasWidth: 1440, // Default to standard desktop
      canvasHeight: 1200,
      baseCanvasWidth: 1440, // Original design width
      previewMode: 'desktop',
      history: [defaultComponents],
      historyIndex: 0,
      
      setComponents: (components) => {
        // Sync to current page
        const { pages, currentPageId } = get();
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components } : p);
        
        set({ components, pages: updatedPages, history: [components], historyIndex: 0 });
      },
      
      addPage: (name) => {
         const { pages, components, canvasHeight, currentPageId } = get();
         // Save current state first (just in case)
         const savedPages = pages.map(p => p.id === currentPageId ? { ...p, components, canvasHeight } : p);
         
         const newPageId = name.toLowerCase().replace(/\s+/g, '-');
         const newPage: Page = {
             id: newPageId,
             name: name,
             slug: newPageId,
             components: [],
             canvasHeight: 1200
         };
         
         const newPages = [...savedPages, newPage];
         
         set({
             pages: newPages,
             currentPageId: newPage.id,
             components: [],
             canvasHeight: 1200,
             history: [[]],
             historyIndex: 0,
             selectedId: null
         });
      },

      switchPage: (pageId) => {
          const { pages, components, canvasHeight, currentPageId } = get();
          // Save current state
          const savedPages = pages.map(p => p.id === currentPageId ? { ...p, components, canvasHeight } : p);
          
          const targetPage = savedPages.find(p => p.id === pageId);
          if (!targetPage) return;

          set({
              pages: savedPages,
              currentPageId: pageId,
              components: targetPage.components,
              canvasHeight: targetPage.canvasHeight,
              history: [targetPage.components],
              historyIndex: 0,
              selectedId: null
          });
      },

      deletePage: (pageId) => {
          const { pages } = get();
          if (pages.length <= 1) {
              alert("Cannot delete the last page.");
              return;
          }
          const newPages = pages.filter(p => p.id !== pageId);
          // If we deleted the current page, switch to the first one
          if (get().currentPageId === pageId) {
              const firstPage = newPages[0];
              set({
                  pages: newPages,
                  currentPageId: firstPage.id,
                  components: firstPage.components,
                  canvasHeight: firstPage.canvasHeight,
                  history: [firstPage.components],
                  historyIndex: 0,
                  selectedId: null
              });
          } else {
              set({ pages: newPages });
          }
      },
      
      updatePageName: (pageId, name) => {
          const { pages } = get();
          set({
              pages: pages.map(p => p.id === pageId ? { ...p, name, slug: name.toLowerCase().replace(/\s+/g, '-') } : p)
          });
      },

      addComponent: (component) => {
        const { components, history, historyIndex, pages, currentPageId } = get();
        const newComponents = [...components, component];
        const newHistory = [...history.slice(0, historyIndex + 1), newComponents];
        
        // Sync
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);

        set({
          components: newComponents,
          pages: updatedPages,
          history: newHistory,
          historyIndex: newHistory.length - 1,
          selectedId: component.id,
        });
      },
      
      updateComponent: (id, updates) => {
        const { components, pages, currentPageId } = get();
        const newComponents = components.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        );
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);
        set({ components: newComponents, pages: updatedPages });
        get().saveHistory();
      },

      updateComponentStyles: (id, styles) => {
        const { components, pages, currentPageId } = get();
        const newComponents = components.map((c) =>
          c.id === id ? { ...c, styles: { ...c.styles, ...styles } } : c
        );
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);
        set({ components: newComponents, pages: updatedPages });
        // NOTE: We don't save history here on every drag/resize frame, 
        // rely on explicit saveHistory calls from DragStop/ResizeStop
      },

      removeComponent: (id) => {
        const { components, selectedId, pages, currentPageId } = get();
        const newComponents = components.filter((c) => c.id !== id);
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);
        
        set({ 
          components: newComponents,
          pages: updatedPages,
          selectedId: selectedId === id ? null : selectedId
        });
        get().saveHistory();
      },
      
      duplicateComponent: (id) => {
         const { components } = get();
         const comp = components.find(c => c.id === id);
         if (comp) {
             const newComp = {
                 ...comp,
                 id: `${comp.type}-${Date.now()}`,
                 name: `${comp.name} Copy`,
                 styles: {
                     ...comp.styles,
                     x: comp.styles.x + 20,
                     y: comp.styles.y + 20
                 }
             };
             get().addComponent(newComp);
         }
      },

      selectComponent: (id, multi = false) => {
         const { selectedIds, selectedId } = get();
         
         if (multi && id) {
             // Multi-selection logic
             const isSelected = selectedIds.includes(id);
             let newSelectedIds = [];
             
             if (isSelected) {
                 newSelectedIds = selectedIds.filter(i => i !== id);
             } else {
                 newSelectedIds = [...selectedIds, id];
             }
             
             // If unselecting the primary one, make the last one primary
             const newPrimary = id === selectedId && isSelected 
                 ? (newSelectedIds.length > 0 ? newSelectedIds[newSelectedIds.length - 1] : null) 
                 : (isSelected ? selectedId : id);

             set({ selectedIds: newSelectedIds, selectedId: newPrimary });
         } else {
             // Single selection logic
             set({ selectedId: id, selectedIds: id ? [id] : [] });
         }
      },

      selectAllComponents: () => {
         const { components } = get();
         const allIds = components.filter(c => c.visible !== false).map(c => c.id);
         if (allIds.length > 0) {
             set({ selectedIds: allIds, selectedId: allIds[0] });
         }
      },

      hoverComponent: (id) => set({ hoveredId: id }),
      
      moveComponent: (id, x, y) => {
        const { components, pages, currentPageId } = get();
        const newComponents = components.map((c) =>
          c.id === id ? { ...c, styles: { ...c.styles, x, y } } : c
        );
        // Optimize: Don't sync to pages on every move frame? Or maybe yes for simplicity?
        // Let's sync because we rely on pages being truthful.
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);
        
        set({
          components: newComponents,
          pages: updatedPages
        });
      },

      resizeComponent: (id, width, height) => {
        const { components, pages, currentPageId } = get();
        const newComponents = components.map((c) =>
          c.id === id ? { ...c, styles: { ...c.styles, width, height } } : c
        );
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);

        set({
          components: newComponents,
          pages: updatedPages
        });
      },
      
      reorderComponent: (id, direction) => {
           const { components, pages, currentPageId } = get();
           const index = components.findIndex(c => c.id === id);
           if (index === -1) return;
           
           const newComponents = [...components];
           if (direction === 'up' && index < newComponents.length - 1) {
               [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
           } else if (direction === 'down' && index > 0) {
               [newComponents[index], newComponents[index - 1]] = [newComponents[index - 1], newComponents[index]];
           }
           const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);
           set({ components: newComponents, pages: updatedPages });
           get().saveHistory();
      },

      groupSelected: () => {
        const { components, selectedIds, pages, currentPageId } = get();
        if (selectedIds.length < 2) return;

        const componentsToGroup = components.filter(c => selectedIds.includes(c.id));
        if (componentsToGroup.length === 0) return;

        const minX = Math.min(...componentsToGroup.map(c => c.styles.x));
        const minY = Math.min(...componentsToGroup.map(c => c.styles.y));
        const maxX = Math.max(...componentsToGroup.map(c => c.styles.x + c.styles.width));
        const maxY = Math.max(...componentsToGroup.map(c => c.styles.y + c.styles.height));
        
        const width = maxX - minX;
        const height = maxY - minY;

        const groupId = `group-${Date.now()}`;
        const groupComponent: ComponentData = {
            id: groupId,
            type: 'container',
            name: 'Group',
            styles: {
                x: minX,
                y: minY,
                width,
                height,
                backgroundColor: 'transparent',
                zIndex: Math.max(...componentsToGroup.map(c => c.styles.zIndex || 0)) + 1
            },
            visible: true,
            locked: false
        };
        
        const updatedComponents = components.map(c => {
           if (selectedIds.includes(c.id)) {
               return {
                   ...c,
                   parentId: groupId,
                   styles: {
                       ...c.styles,
                       x: c.styles.x - minX,
                       y: c.styles.y - minY
                   }
               };
           }
           return c;
        });
        
        const finalComponents = [...updatedComponents, groupComponent];
        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: finalComponents } : p);
        
        set({
            components: finalComponents,
            pages: updatedPages,
            selectedIds: [groupId],
            selectedId: groupId
        });
      },

      ungroupSelected: () => {
        const { components, selectedId, selectedIds, pages, currentPageId } = get();
        let newComponents = [...components];
        const idsToUngroup = selectedIds.length > 0 ? selectedIds : (selectedId ? [selectedId] : []);
        
        idsToUngroup.forEach(id => {
             const groupComp = newComponents.find(c => c.id === id);
             if (!groupComp) return;
            
             const children = newComponents.filter(c => c.parentId === id);
             if (children.length === 0) return;
             
             newComponents = newComponents.map(c => {
                 if (c.parentId === id) {
                     return {
                         ...c,
                         parentId: undefined,
                         styles: {
                             ...c.styles,
                             x: c.styles.x + groupComp.styles.x,
                             y: c.styles.y + groupComp.styles.y
                         }
                     };
                 }
                 return c;
             });
             
             newComponents = newComponents.filter(c => c.id !== id);
        });

        const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, components: newComponents } : p);
        
        set({
            components: newComponents,
            pages: updatedPages,
            selectedId: null,
            selectedIds: []
        });
      },

      setZoom: (zoom) => set({ zoom }),
      toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
      toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          set({
            historyIndex: historyIndex - 1,
            components: history[historyIndex - 1],
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          set({
            historyIndex: historyIndex + 1,
            components: history[historyIndex + 1],
          });
        }
      },

      saveHistory: () => {
        const { components, history, historyIndex } = get();
        // If current state is same as last history entry, don't save
        if (JSON.stringify(components) === JSON.stringify(history[historyIndex])) return;
        
        const newHistory = [...history.slice(0, historyIndex + 1), components];
        set({
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },
      
      
      exportDesign: () => {
        const { pages, canvasWidth } = get();
        // Ensure even the current work is in the page object (it is synced on every update, so it should be fine)
        return JSON.stringify({ pages, canvasWidth }, null, 2);
      },

      importDesign: (json) => {
        try {
          const data = JSON.parse(json);
          
          // Handle legacy format (single page) or new format (multi-page)
          if (Array.isArray(data.pages) && data.pages.length > 0) {
              set({
                  pages: data.pages,
                  currentPageId: data.pages[0].id,
                  components: data.pages[0].components,
                  canvasWidth: data.canvasWidth || 1440,
                  canvasHeight: data.pages[0].canvasHeight || 1200,
                  history: [data.pages[0].components],
                  historyIndex: 0
              });
          } else if (Array.isArray(data.components)) {
             // Legacy fallback
             const homePage: Page = {
                 id: 'home', name: 'Home', slug: 'home', components: data.components, canvasHeight: data.canvasHeight || 1200
             };
             set({ 
               pages: [homePage],
               currentPageId: 'home',
               components: data.components,
               canvasWidth: data.canvasWidth || 1440,
               canvasHeight: data.canvasHeight || 1200,
               history: [data.components],
               historyIndex: 0
             });
          }
        } catch (e) {
          console.error("Failed to import design", e);
          alert("Invalid design file");
        }
      },

      setCanvasSize: (width, height) => {
          const { pages, currentPageId } = get();
          const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, canvasHeight: height } : p);
          set({ canvasWidth: width, canvasHeight: height, pages: updatedPages });
      },

      setPreviewMode: (mode) => {
          const widths = { desktop: 1440, tablet: 768, mobile: 375 };
          const width = widths[mode];
          const { pages, currentPageId } = get();
          const updatedPages = pages.map(p => p.id === currentPageId ? { ...p, canvasHeight: get().canvasHeight } : p);
          set({ previewMode: mode, canvasWidth: width, pages: updatedPages });
      },

      getScaleFactor: () => {
          const { canvasWidth, baseCanvasWidth } = get();
          return canvasWidth / baseCanvasWidth;
      },

      resetToDefault: () => set({ pages: defaultPages, currentPageId: 'home', components: [], history: [[]], historyIndex: 0, previewMode: 'desktop', canvasWidth: 1440 }),
    }),
    {
      name: 'website-builder',
      partialize: (state) => ({ 
          // Persist everything
          pages: state.pages,
          currentPageId: state.currentPageId,
          components: state.components,
          canvasWidth: state.canvasWidth < 300 ? 1440 : state.canvasWidth, // Migration fix for bad widths
          canvasHeight: state.canvasHeight,
          previewMode: state.previewMode || 'desktop'
      }),
    }
  )
);
