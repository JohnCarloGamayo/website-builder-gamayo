'use client';

import { useEditorStore, ComponentData } from '@/store/editorStore';
import { 
  Type, Square, Image as ImageIcon, MousePointer2, 
  Circle, Video, FormInput, Minus, ChevronRight, Layout,
  Heading1, Heading2, AlignLeft, Link2, CreditCard, Tag,
  Volume2, Code, CheckSquare, Circle as RadioIcon, List,
  Grid2X2, Columns, Box, Menu as MenuIcon, Navigation,
  AlignJustify, Table, ChevronDown, PanelTop, Layers,
  Loader, AlertCircle, MessageSquare, Star, User, Quote,
  MoreHorizontal, Sparkles, BarChart3, TrendingUp, Award, Zap,
  Clock, Megaphone, DollarSign, ArrowRight, Activity,
  LayoutGrid, Maximize2, ToggleLeft, Repeat
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
        defaultProps?: Partial<ComponentData>;
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
            { type: 'spacer', icon: Maximize2, label: 'Spacer', defaultStyles: { width: 300, height: 40, backgroundColor: 'transparent' } },
            { type: 'divider', icon: Minus, label: 'Divider', defaultStyles: { height: 2, width: 300, backgroundColor: '#e5e7eb' } },
        ]
    },
    {
        name: 'Typography',
        items: [
            { type: 'heading', icon: Heading1, label: 'Heading', defaultContent: 'Main Heading', defaultStyles: { fontSize: 32, fontWeight: 'bold', width: 400, height: 50 } },
            { type: 'paragraph', icon: AlignLeft, label: 'Paragraph', defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', defaultStyles: { fontSize: 16, width: 400, height: 80, lineHeight: 1.5 } },
            { type: 'link', icon: Link2, label: 'Link', defaultContent: 'Click here', defaultProps: { href: '#' }, defaultStyles: { textDecoration: 'underline', textColor: '#3b82f6', fontSize: 16 } },
            { type: 'quote', icon: Quote, label: 'Quote', defaultContent: '"This is a blockquote"', defaultStyles: { fontSize: 18, fontStyle: 'italic', width: 400, height: 80, borderWidth: 2, borderColor: '#666666', padding: 16 } },
        ]
    },
    {
        name: 'Layout',
        items: [
            { type: 'section', icon: Box, label: 'Section', defaultStyles: { width: 800, height: 400, backgroundColor: '#f3f4f6', padding: 20 } },
            { type: 'row', icon: Columns, label: 'Row', defaultStyles: { width: 800, height: 100, backgroundColor: 'transparent' } },
            { type: 'column', icon: Layout, label: 'Column', defaultStyles: { width: 200, height: 400, backgroundColor: 'transparent' } },
            { type: 'grid', icon: Grid2X2, label: 'Grid', defaultStyles: { width: 600, height: 400, backgroundColor: 'transparent' } },
            { type: 'flex', icon: LayoutGrid, label: 'Flex Box', defaultStyles: { width: 600, height: 300, backgroundColor: 'transparent' } },
            { type: 'card', icon: CreditCard, label: 'Card', defaultStyles: { width: 300, height: 200, backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: 16 } },
            { type: 'sidebar', icon: PanelTop, label: 'Sidebar', defaultStyles: { width: 280, height: 600, backgroundColor: '#1f2937', padding: 16 } },
        ]
    },
    {
        name: 'Media',
        items: [
            { type: 'video', icon: Video, label: 'Video', defaultStyles: { width: 640, height: 360, backgroundColor: '#000000' } },
            { type: 'audio', icon: Volume2, label: 'Audio', defaultStyles: { width: 300, height: 40, backgroundColor: '#f3f4f6' } },
            { type: 'embed', icon: Code, label: 'Embed', defaultContent: '<iframe src="https://www.example.com"></iframe>', defaultStyles: { width: 640, height: 480 } },
            { type: 'icon', icon: Circle, label: 'Icon', defaultProps: { iconName: 'Heart' }, defaultStyles: { width: 80, height: 80, backgroundColor: 'transparent', textColor: '#f43f5e' } },
        ]
    },
    {
        name: 'Forms',
        items: [
            { type: 'input', icon: FormInput, label: 'Input', defaultContent: '', defaultStyles: { width: 300, height: 40, borderStyle: 'solid', borderWidth: 1, borderColor: '#cccccc', borderRadius: 4, padding: 8, backgroundColor: '#ffffff', textColor: '#000000' } },
            { type: 'textarea', icon: AlignJustify, label: 'Textarea', defaultContent: '', defaultStyles: { width: 300, height: 100, borderStyle: 'solid', borderWidth: 1, borderColor: '#cccccc', borderRadius: 4, padding: 8, backgroundColor: '#ffffff', textColor: '#000000' } },
            { type: 'checkbox', icon: CheckSquare, label: 'Checkbox', defaultProps: { checked: false }, defaultStyles: { width: 20, height: 20, borderStyle: 'solid', borderWidth: 1, borderColor: '#cccccc' } },
            { type: 'radio', icon: RadioIcon, label: 'Radio', defaultProps: { checked: false }, defaultStyles: { width: 20, height: 20, borderRadius: 10, borderStyle: 'solid', borderWidth: 1, borderColor: '#cccccc' } },
            { type: 'select', icon: ChevronDown, label: 'Select', defaultProps: { options: ['Option 1', 'Option 2', 'Option 3'] }, defaultStyles: { width: 200, height: 40, borderStyle: 'solid', borderWidth: 1, borderColor: '#cccccc', borderRadius: 4, padding: 8, backgroundColor: '#ffffff' } },
            { type: 'switch', icon: ToggleLeft, label: 'Switch', defaultProps: { checked: false }, defaultStyles: { width: 44, height: 24, borderRadius: 12, backgroundColor: '#d1d5db' } },
        ]
    },
    {
        name: 'Navigation',
        items: [
            { type: 'navbar', icon: MenuIcon, label: 'Navbar', defaultStyles: { width: 1200, height: 60, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
            { type: 'menu', icon: List, label: 'Menu', defaultStyles: { width: 200, height: 300, backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } },
            { type: 'breadcrumb', icon: Navigation, label: 'Breadcrumb', defaultContent: 'Home / Products / Item', defaultStyles: { width: 400, height: 30, fontSize: 14 } },
            { type: 'pagination', icon: MoreHorizontal, label: 'Pagination', defaultStyles: { width: 300, height: 40, backgroundColor: 'transparent' } },
            { type: 'stepper', icon: ArrowRight, label: 'Stepper', defaultContent: 'Step 1 → Step 2 → Step 3', defaultStyles: { width: 500, height: 60, fontSize: 14 } },
            { type: 'footer', icon: Layout, label: 'Footer', defaultStyles: { width: 1200, height: 200, backgroundColor: '#1f2937', textColor: '#ffffff', padding: 20 } },
        ]
    },
    {
        name: 'Components',
        items: [
            { type: 'badge', icon: Tag, label: 'Badge', defaultContent: 'New', defaultStyles: { fontSize: 12, fontWeight: 'bold', backgroundColor: '#3b82f6', textColor: '#ffffff', borderRadius: 12, padding: 4, width: 60, height: 24 } },
            { type: 'tag', icon: Tag, label: 'Tag', defaultContent: 'Tag', defaultStyles: { fontSize: 14, backgroundColor: '#e5e7eb', textColor: '#374151', borderRadius: 4, padding: 6, width: 80, height: 30 } },
            { type: 'chip', icon: Circle, label: 'Chip', defaultContent: 'Chip', defaultStyles: { fontSize: 12, backgroundColor: '#ddd6fe', textColor: '#5b21b6', borderRadius: 16, padding: 8, width: 80, height: 32 } },
            { type: 'alert', icon: AlertCircle, label: 'Alert', defaultContent: 'This is an alert message', defaultStyles: { width: 500, height: 60, backgroundColor: '#fef3c7', textColor: '#92400e', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#fbbf24' } },
            { type: 'tooltip', icon: MessageSquare, label: 'Tooltip', defaultContent: 'Tooltip text', defaultStyles: { fontSize: 14, backgroundColor: '#1f2937', textColor: '#ffffff', borderRadius: 6, padding: 8, width: 150, height: 40 } },
            { type: 'avatar', icon: User, label: 'Avatar', defaultStyles: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#d1d5db' } },
            { type: 'rating', icon: Star, label: 'Rating', defaultContent: '★★★★☆', defaultStyles: { fontSize: 24, textColor: '#fbbf24', width: 120, height: 30 } },
            { type: 'spinner', icon: Loader, label: 'Spinner', defaultStyles: { width: 40, height: 40, borderRadius: 20, borderWidth: 4, borderColor: '#3b82f6' } },
            { type: 'skeleton', icon: Square, label: 'Skeleton', defaultStyles: { width: 300, height: 20, backgroundColor: '#e5e7eb', borderRadius: 4 } },
        ]
    },
    {
        name: 'Data Display',
        items: [
            { type: 'list', icon: List, label: 'List', defaultContent: '• Item 1\n• Item 2\n• Item 3', defaultStyles: { width: 300, height: 100, fontSize: 16, lineHeight: 1.8 } },
            { type: 'table', icon: Table, label: 'Table', defaultStyles: { width: 600, height: 300, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb' } },
            { type: 'accordion', icon: Layers, label: 'Accordion', defaultContent: 'Accordion Section', defaultStyles: { width: 500, height: 50, backgroundColor: '#f3f4f6', borderRadius: 8, padding: 12 } },
            { type: 'tabs', icon: PanelTop, label: 'Tabs', defaultStyles: { width: 600, height: 300, backgroundColor: '#ffffff', borderRadius: 8 } },
            { type: 'timeline', icon: Clock, label: 'Timeline', defaultContent: '2024 - Event 1', defaultStyles: { width: 400, height: 200, backgroundColor: 'transparent' } },
            { type: 'progress', icon: Activity, label: 'Progress', defaultProps: { value: 70 }, defaultStyles: { width: 300, height: 20, backgroundColor: '#e5e7eb', borderRadius: 10 } },
            { type: 'slider', icon: MoreHorizontal, label: 'Slider', defaultProps: { value: 50 }, defaultStyles: { width: 300, height: 8, backgroundColor: '#e5e7eb', borderRadius: 4 } },
            { type: 'stats', icon: BarChart3, label: 'Stats', defaultContent: '1.2K', defaultStyles: { width: 150, height: 100, backgroundColor: '#ffffff', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' } },
            { type: 'metric', icon: TrendingUp, label: 'Metric', defaultContent: '+24%', defaultStyles: { fontSize: 32, fontWeight: 'bold', textColor: '#10b981', width: 120, height: 60 } },
        ]
    },
    {
        name: 'Special Cards',
        items: [
            { type: 'pricing-card', icon: DollarSign, label: 'Pricing', defaultContent: '$99/mo', defaultStyles: { width: 280, height: 400, backgroundColor: '#ffffff', borderRadius: 12, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } },
            { type: 'feature-card', icon: Sparkles, label: 'Feature', defaultContent: 'Feature Title', defaultStyles: { width: 300, height: 200, backgroundColor: '#f8fafc', borderRadius: 8, padding: 20, borderWidth: 1, borderColor: '#e2e8f0' } },
            { type: 'testimonial', icon: Quote, label: 'Testimonial', defaultContent: '"Amazing product!"', defaultStyles: { width: 350, height: 180, backgroundColor: '#ffffff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' } },
            { type: 'cta-button', icon: Zap, label: 'CTA Button', defaultContent: 'Get Started →', defaultStyles: { width: 200, height: 56, backgroundColor: '#6366f1', textColor: '#ffffff', borderRadius: 8, fontSize: 18, fontWeight: 'bold' } },
            { type: 'gradient-box', icon: Sparkles, label: 'Gradient Box', defaultStyles: { width: 300, height: 200, backgroundColor: '#a855f7', borderRadius: 16, boxShadow: '0 8px 24px rgba(168,85,247,0.4)' } },
            { type: 'glow-card', icon: Sparkles, label: 'Glow Card', defaultStyles: { width: 280, height: 180, backgroundColor: '#1e293b', borderRadius: 12, boxShadow: '0 0 40px rgba(99,102,241,0.5)' } },
        ]
    },
    {
        name: 'Media & Gallery',
        items: [
            { type: 'image-gallery', icon: ImageIcon, label: 'Gallery', defaultStyles: { width: 600, height: 400, backgroundColor: '#f3f4f6', borderRadius: 8 } },
            { type: 'carousel', icon: Repeat, label: 'Carousel', defaultStyles: { width: 800, height: 400, backgroundColor: '#000000', borderRadius: 8 } },
            { type: 'banner', icon: Megaphone, label: 'Banner', defaultContent: 'Special Offer!', defaultStyles: { width: 1200, height: 120, backgroundColor: '#fbbf24', textColor: '#000000', fontSize: 24, fontWeight: 'bold' } },
            { type: 'announcement', icon: Megaphone, label: 'Announcement', defaultContent: 'New Update Available', defaultStyles: { width: 600, height: 50, backgroundColor: '#3b82f6', textColor: '#ffffff', borderRadius: 8, padding: 12 } },
        ]
    },
    {
        name: 'Shapes',
        items: [
            { type: 'shape', icon: Circle, label: 'Circle', defaultStyles: { borderRadius: 9999, width: 100, height: 100, backgroundColor: '#6366f1' } },
            { type: 'shape', icon: Square, label: 'Rectangle', defaultStyles: { width: 200, height: 100, backgroundColor: '#8b5cf6' } },
            { type: 'shape', icon: Star, label: 'Star Shape', defaultStyles: { width: 120, height: 120, backgroundColor: '#f59e0b', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' } },
            { type: 'shape', icon: Circle, label: 'Triangle', defaultStyles: { width: 0, height: 0, backgroundColor: 'transparent', borderWidth: 60, borderColor: 'transparent transparent #10b981 transparent' } },
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
        width: item.type === 'text' || item.type === 'paragraph' || item.type === 'heading' ? 300 : 150,
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
      ...item.defaultProps
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
