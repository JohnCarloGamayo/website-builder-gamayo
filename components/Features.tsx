'use client';

import { ArrowRight, MousePointer2, Smartphone, Layers, Layout, Zap, Eye, Code } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: MousePointer2,
      title: 'Drag & Drop Editor',
      description:
        'Intuitively place elements exactly where you want them. Our smart grid system ensures pixel-perfect alignment effortlessly.',
      gradient: 'from-purple-500 to-fuchsia-500',
      color: 'purple',
    },
    {
      icon: Layers,
      title: 'Multi-Page Architecture',
      description:
        'Build complex websites with ease. Manage pages, create navigation flows, and organize your site structure visually.',
      gradient: 'from-blue-500 to-cyan-500',
      color: 'blue',
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      description:
        'Your designs automatically adapt to any screen size. Preview and tweak layouts for mobile, tablet, and desktop views instantly.',
      gradient: 'from-pink-500 to-rose-500',
      color: 'pink',
    },
    {
      icon: Layout,
      title: 'Rich Component Library',
      description:
        'Access a vast library of pre-built headers, hero sections, features, standard layouts, and more to speed up your design process.',
      gradient: 'from-emerald-500 to-teal-500',
      color: 'emerald',
    },
    {
      icon: Code,
      title: 'Zero Coding Required',
      description:
        'Focus on creativity, not logic. We handle the HTML, CSS, and JS generation in the background while you design.',
      gradient: 'from-violet-500 to-purple-500',
      color: 'violet',
    },
    {
      icon: Eye,
      title: 'Real-Time Preview',
      description:
        'See your changes instantly as you make them. Switch to preview mode to experience your site exactly as your visitors will.',
      gradient: 'from-orange-500 to-amber-500',
      color: 'orange',
    },
  ];

  return (
    <section id="features" className="py-32 px-6 relative bg-[#030014] overflow-hidden">
      {/* Ultra-Modern Gradient Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(120,40,200,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_60%,rgba(59,130,246,0.12),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(236,72,153,0.1),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Advanced Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 rounded-full blur-[130px] animate-pulse opacity-70"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/15 to-cyan-600/15 rounded-full blur-[130px] animate-pulse opacity-60" style={{ animationDelay: '1.2s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Section Header */}
        <div className="mb-24 text-center animate-fade-in-up">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">
            <span className="inline-block bg-gradient-to-b from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)] mb-2">
              Powerful Features.
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_4px_50px_rgba(168,85,247,0.6)]">
              Limitless Possibilities.
            </span>
          </h2>
          <p className="text-gray-300/95 text-xl sm:text-2xl mb-8 max-w-4xl mx-auto font-light leading-relaxed tracking-wide">
            Everything you need to build professional, high-performance websites without the technical headache.
          </p>
        </div>

        {/* Premium Features Grid with Advanced Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {/* Premium Glassmorphic Card */}
                <div className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 overflow-hidden group-hover:border-white/25 group-hover:bg-white/[0.12] transition-all duration-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] group-hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.7),0_0_60px_-10px_rgba(168,85,247,0.3)] group-hover:-translate-y-3 group-hover:scale-[1.02]">
                  
                  {/* Dynamic Animated Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700 blur-2xl`}></div>

                  {/* Enhanced Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                  <div className="relative z-10">
                    {/* Premium Icon Container with Dynamic Colors */}
                    <div className={`mb-8 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-[1.2rem] flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-[0_0_60px_rgba(168,85,247,0.3),0_0_0_1px_rgba(255,255,255,0.2)_inset] border border-white/20 relative overflow-hidden`}>
                      <div className={`absolute inset-0 rounded-[1.2rem] bg-gradient-to-br ${feature.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity`}></div>
                      <Icon size={32} className="relative text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
                    </div>
                    
                    {/* Enhanced Title with Better Typography */}
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-white via-white/95 to-white/90 bg-clip-text text-transparent mb-5 group-hover:scale-105 transition-transform duration-500 leading-tight">
                      {feature.title}
                    </h3>
                    
                    {/* Enhanced Description */}
                    <p className="text-gray-400/90 group-hover:text-gray-300/95 leading-relaxed text-base mb-8 font-light transition-colors tracking-wide">
                      {feature.description}
                    </p>
                    
                    {/* Premium Learn More Link with Dynamic Colors */}
                    <div className={`flex items-center gap-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent font-bold opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500`}>
                      <span>Learn more</span>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" style={{ color: 'inherit' }} />
                    </div>
                  </div>

                  {/* Enhanced Corner Accent with Dynamic Colors */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-bl-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl`}></div>
                  
                  {/* Bottom Border Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-[2rem]`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
