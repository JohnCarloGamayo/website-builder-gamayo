'use client';

import { 
  MousePointer2, Type, Image, Square, Circle, 
  Video, FormInput, Minus, Hand, LayoutTemplate
} from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';

export default function FloatingToolbar() {
  const { addComponent, selectComponent } = useEditorStore();

  const tools = [
    // Basic Shapes & Layouts
    { 
        icon: <MousePointer2 size={18} />, 
        label: 'Select', 
        action: () => selectComponent(null),
        active: true // Default mode
    },
    { 
        icon: <LayoutTemplate size={18} />, 
        label: 'Container', 
        type: 'container',
        action: () => addComponent({
            id: `container-${Date.now()}`,
            type: 'container',
            name: 'Container',
            styles: {
                x: 100, y: 100, width: 300, height: 200,
                backgroundColor: '#ffffff',
                borderRadius: 4,
                opacity: 1,
            }
        })    
    },
    {
        icon: <Type size={18} />,
        label: 'Text',
        type: 'text',
         action: () => addComponent({
            id: `text-${Date.now()}`,
            type: 'text',
            name: 'Text Layer',
            content: 'Type something...',
            styles: {
                x: 100, y: 100, width: 200, height: 50,
                textColor: '#000000',
                fontSize: 16,
                fontWeight: 'normal',
                opacity: 1,
            }
        })
    },
    // Shapes
    {
        icon: <Square size={18} />,
        label: 'Rectangle',
        type: 'shape',
        action: () => addComponent({
            id: `rect-${Date.now()}`,
            type: 'shape',
            name: 'Rectangle',
            styles: {
                x: 150, y: 150, width: 100, height: 100,
                backgroundColor: '#3b82f6',
                borderRadius: 0,
                opacity: 1,
            }
        })
    },
    {
        icon: <Circle size={18} />,
        label: 'Circle',
        type: 'shape',
        action: () => addComponent({
            id: `circle-${Date.now()}`,
            type: 'shape',
            name: 'Circle',
            styles: {
                x: 150, y: 150, width: 100, height: 100,
                backgroundColor: '#ef4444',
                borderRadius: 100,
                opacity: 1,
            }
        })
    },
    // Media
    {
        icon: <Image size={18} />,
        label: 'Image',
        type: 'image',
        action: () => addComponent({
            id: `image-${Date.now()}`,
            type: 'image',
            name: 'Image',
            src: 'https://placehold.co/400x300',
            styles: {
                x: 200, y: 200, width: 300, height: 200,
                opacity: 1,
                borderRadius: 8
            }
        })
    },
    {
        icon: <Video size={18} />,
        label: 'Video',
        type: 'video',
        action: () => addComponent({
            id: `video-${Date.now()}`,
            type: 'video',
            name: 'Video',
            styles: {
                x: 200, y: 200, width: 320, height: 180,
                backgroundColor: '#000000',
                opacity: 1,
            }
        })
    },
    // Form
    {
        icon: <FormInput size={18} />,
        label: 'Input',
        type: 'input',
        action: () => addComponent({
            id: `input-${Date.now()}`,
            type: 'input',
            name: 'Input Field',
            placeholder: 'Enter text...',
            styles: {
                x: 100, y: 300, width: 250, height: 40,
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
                borderWidth: 1,
                borderRadius: 4,
                padding: 8,
                textColor: '#000000',
                fontSize: 14,
                opacity: 1,
            }
        })
    },
    {
        icon: <MousePointer2 size={18} className="rotate-90" />, // Using MousePointer as Button icon proxy
        label: 'Button',
        type: 'button',
        action: () => addComponent({
            id: `btn-${Date.now()}`,
            type: 'button',
            name: 'Button',
            content: 'Click Me',
            styles: {
                x: 100, y: 360, width: 120, height: 40,
                backgroundColor: '#8b5cf6', // Violet
                textColor: '#ffffff',
                borderRadius: 6,
                textAlign: 'center',
                fontWeight: 'bold',
                opacity: 1,
            }
        })
    },
    {
        icon: <Minus size={18} />,
        label: 'Divider',
        type: 'divider',
        action: () => addComponent({
            id: `div-${Date.now()}`,
            type: 'divider',
            name: 'Divider',
            styles: {
                x: 50, y: 400, width: 400, height: 2,
                backgroundColor: '#333333',
                opacity: 1,
            }
        })
    }
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1e1e1e] border border-gray-700 rounded-2xl shadow-2xl flex items-center px-2 py-1.5 gap-1 z-50">
      {tools.map((tool, index) => (
        <button
          key={index}
          onClick={tool.action}
          className="group relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
        >
          {tool.icon}
          {/* Tooltip */}
          <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {tool.label}
          </span>
        </button>
      ))}
    </div>
  );
}
