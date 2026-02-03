'use client';

import { useEditorStore, ComponentData } from '@/store/editorStore';
import { 
  Type, Square, Image as ImageIcon, MousePointer2, 
  Circle, Video, FormInput, Minus, ChevronRight, Layout
} from 'lucide-react';
import { useState } from 'react';

type ComponentType = ComponentData['type'];

interface ToolGroup {
    name: string;
    items: {
        type: ComponentType;
        icon: any;
        label: string;
        defaultStyles?: Partial<ComponentData['styles']>;
        defaultContent?: string;
    }[];
}

const toolGroups: ToolGroup[] = [
    {
        name: 'Basic',
        items: [
            { type: 'container', icon: Square, label: 'Container', defaultStyles: { width: 300, height: 300, backgroundColor: '#ffffff' } },
            { type: 'text', icon: Type, label: 'Text', defaultContent: 'Add your text here' },
            { type: 'button', icon: MousePointer2, label: 'Button' },
            { type: 'image', icon: ImageIcon, label: 'Image' },
        ]
    },
    {
        name: 'Media',
        items: [
            { type: 'video', icon: Video, label: 'Video', defaultStyles: { width: 320, height: 180, backgroundColor: '#000000' } },
            { type: 'icon', icon: Circle, label: 'Icon', defaultStyles: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#22ccdd' } },
        ]
    },
    {
        name: 'Forms',
        items: [
            { type: 'input', icon: FormInput, label: 'Input', defaultContent: '', defaultStyles: { width: 250, height: 40, borderStyle: 'solid', borderWidth: 1, borderColor: '#cccccc', borderRadius: 4, padding: 8, backgroundColor: '#ffffff', textColor: '#000000' } },
        ]
    },
    {
        name: 'Shapes',
        items: [
            { type: 'shape', icon: Circle, label: 'Circle', defaultStyles: { borderRadius: 9999, width: 100, height: 100, backgroundColor: '#3344cc' } },
            { type: 'divider', icon: Minus, label: 'Divider', defaultStyles: { height: 2, width: 300, backgroundColor: '#000000' } },
        ]
    }
];

export default function ComponentsToolbar() {
  const { addComponent, components } = useEditorStore();
  const [activeGroup, setActiveGroup] = useState<string | null>('Basic');

  const addNewComponent = (item: typeof toolGroups[0]['items'][0]) => {
    const id = `${item.type}-${Date.now()}`;
    const baseY = components.length > 0 
      ? Math.max(...components.map(c => c.styles.y + c.styles.height)) + 20
      : 50;

    const newComponent: ComponentData = {
      id,
      type: item.type,
      name: `${item.label} ${components.filter(c => c.type === item.type).length + 1}`,
      visible: true,
      styles: {
        x: 50,
        y: Math.min(baseY, 400),
        width: item.type === 'text' ? 300 : 150,
        height: item.type === 'text' ? 50 : 50,
        backgroundColor: 'transparent',
        textColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        borderRadius: 0,
        zIndex: components.length + 10,
        opacity: 1,
        ...item.defaultStyles
      },
      content: item.defaultContent || (item.type === 'button' ? 'Button' : undefined),
    };

    addComponent(newComponent);
  };

  return (
    <div className="w-64 bg-[#1a1a2e] border-r border-gray-800 flex flex-col h-full overflow-hidden select-none">
        <div className="p-4 border-b border-gray-800 bg-[#151525]">
            <h2 className="text-gray-200 font-semibold text-sm uppercase tracking-wider">Elements</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {toolGroups.map(group => (
                <div key={group.name} className="overflow-hidden">
                    <button 
                        onClick={() => setActiveGroup(activeGroup === group.name ? null : group.name)}
                        className="w-full flex items-center justify-between p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors text-sm font-medium"
                    >
                        {group.name}
                        <ChevronRight size={14} className={`transition-transform duration-200 ${activeGroup === group.name ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {activeGroup === group.name && (
                        <div className="grid grid-cols-2 gap-2 p-2">
                             {group.items.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => addNewComponent(item)}
                                    className="flex flex-col items-center justify-center gap-2 p-3 bg-[#2a2a3e] hover:bg-purple-600/20 hover:border-purple-500/50 border border-gray-700 rounded-lg text-gray-400 hover:text-purple-400 transition-all group"
                                >
                                    <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}
