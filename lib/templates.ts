import { ComponentData } from '@/store/editorStore';

export const templates: { name: string; description: string; components: ComponentData[] }[] = [
  {
    name: "Blank Canvas",
    description: "Start from scratch with an empty canvas.",
    components: []
  },
  {
    name: "Simple Landing Page",
    description: "A standard landing page with hero section and features.",
    components: [
      {
        id: 'hero-bg',
        type: 'container',
        name: 'Hero Section',
        styles: { x: 0, y: 0, width: 1440, height: 600, backgroundColor: '#111827', zIndex: 0 },
        visible: true,
      },
      {
        id: 'hero-title',
        type: 'text',
        name: 'Hero Title',
        content: 'Build Your Dream Website',
        styles: { x: 370, y: 200, width: 700, height: 80, fontSize: 64, fontWeight: 'bold', textColor: '#ffffff', textAlign: 'center', zIndex: 1 },
        visible: true,
      },
      {
        id: 'hero-sub',
        type: 'text',
        name: 'Hero Subtitle',
        content: 'Drag, drop, and customize to perfection.',
        styles: { x: 420, y: 300, width: 600, height: 40, fontSize: 24, textColor: '#9ca3af', textAlign: 'center', zIndex: 1 },
        visible: true,
      },
      {
        id: 'hero-btn',
        type: 'button',
        name: 'CTA Button',
        content: 'Get Started',
        styles: { x: 645, y: 380, width: 150, height: 50, backgroundColor: '#7c3aed', textColor: '#ffffff', borderRadius: 8, zIndex: 1 },
        visible: true,
      }
    ]
  },
  {
    name: "Portfolio",
    description: "Showcase your work with this clean layout.",
    components: [
       {
        id: 'nav-bg',
        type: 'container',
        name: 'Navigation',
        styles: { x: 0, y: 0, width: 1440, height: 80, backgroundColor: '#ffffff', zIndex: 10, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        visible: true,
       },
       {
        id: 'logo',
        type: 'text',
        name: 'Logo',
        content: 'PORTFOLIO',
        styles: { x: 40, y: 25, width: 200, height: 30, fontSize: 24, fontWeight: 'bold', textColor: '#000000', zIndex: 11 },
        visible: true,
       },
       {
        id: 'header',
        type: 'text',
        name: 'Header',
        content: 'My Recent Work',
        styles: { x: 100, y: 150, width: 500, height: 60, fontSize: 48, fontWeight: 'bold', textColor: '#1f2937', zIndex: 1 },
        visible: true,
       },
       {
        id: 'card-1',
        type: 'container',
        name: 'Project Card 1',
        styles: { x: 100, y: 250, width: 380, height: 300, backgroundColor: '#f3f4f6', borderRadius: 12, zIndex: 1 },
        visible: true,
       },
       {
        id: 'card-2',
        type: 'container',
        name: 'Project Card 2',
        styles: { x: 520, y: 250, width: 380, height: 300, backgroundColor: '#f3f4f6', borderRadius: 12, zIndex: 1 },
        visible: true,
       },
       {
        id: 'card-3',
        type: 'container',
        name: 'Project Card 3',
        styles: { x: 940, y: 250, width: 380, height: 300, backgroundColor: '#f3f4f6', borderRadius: 12, zIndex: 1 },
        visible: true,
       }
    ]
  }
];
