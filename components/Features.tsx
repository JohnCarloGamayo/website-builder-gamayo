'use client';

import { ArrowRight, MousePointer2, Smartphone, Layers, Layout, Zap, Eye, Code } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: MousePointer2,
      title: 'Drag & Drop Editor',
      description:
        'Intuitively place elements exactly where you want them. Our smart grid system ensures pixel-perfect alignment effortlessly.',
    },
    {
      icon: Layers,
      title: 'Multi-Page Architecture',
      description:
        'Build complex websites with ease. Manage pages, create navigation flows, and organize your site structure visually.',
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      description:
        'Your designs automatically adapt to any screen size. Preview and tweak layouts for mobile, tablet, and desktop views instantly.',
    },
    {
      icon: Layout,
      title: 'Rich Component Library',
      description:
        'Access a vast library of pre-built headers, hero sections, features, standard layouts, and more to speed up your design process.',
    },
    {
      icon: Code,
      title: 'Zero Coding Required',
      description:
        'Focus on creativity, not logic. We handle the HTML, CSS, and JS generation in the background while you design.',
    },
    {
      icon: Eye,
      title: 'Real-Time Preview',
      description:
        'See your changes instantly as you make them. Switch to preview mode to experience your site exactly as your visitors will.',
    },
  ];

  return (
    <section id="features" className="py-20 px-6 relative bg-gradient-to-b from-[#050510] via-[#0d0d1a] to-[#050510]">
      {/* Background Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Powerful Features.</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">Limitless Possibilities.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-3xl mx-auto font-light">
            Everything you need to build professional, high-performance websites without the technical headache.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative bg-[#1a1a2e]/50 border border-gray-800 rounded-2xl p-8 overflow-hidden group hover:border-purple-500/50 transition-all duration-300 hover:bg-[#1a1a2e]/80 animate-fade-in-up backdrop-blur-sm hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300 group-hover:scale-110 shadow-inner ring-1 ring-purple-500/20">
                    <Icon size={28} className="text-purple-400 group-hover:text-purple-300" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm mb-6 font-light">{feature.description}</p>
                  
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center text-purple-400 text-sm font-medium gap-1">
                      Learn more <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
